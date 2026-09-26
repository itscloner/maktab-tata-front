import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { alpha } from '@mui/material/styles';
import PageHeader from '@/components/common/PageHeader';
import SearchInput from '@/components/common/SearchInput';
import AppAvatar from '@/components/common/AppAvatar';
import StatusChip from '@/components/common/StatusChip';
import PageLoader from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getUserById, updateUserPermissions } from '@/services/mock/user.service';
import { useToastStore } from '@/stores/toastStore';
import { permissionsMock, flattenPermissions } from '@/mocks/permissions.mock';
import { filterMenuBySearch, selectAllPermissions, toggleNodeSelection } from '@/permissions/permission.utils';
import { SUPER_ADMIN_ROLE } from '@/permissions/permission.types';
import type { PermissionMenu } from '@/permissions/permission.types';
import PermissionTreeNode from './PermissionTreeNode';

const TOTAL_PERMISSIONS = flattenPermissions().length;

export default function UserPermissionsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.show);
  const { data: user, loading, error, reload } = useAsyncData(() => getUserById(id!), [id]);

  const [savedSelected, setSavedSelected] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [leaveWarningOpen, setLeaveWarningOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const initial = new Set(user.permissions);
      setSavedSelected(initial);
      setSelected(initial);
    }
  }, [user]);

  const isSuperAdmin = user?.role === SUPER_ADMIN_ROLE;

  const dirty = useMemo(() => {
    if (selected.size !== savedSelected.size) return true;
    for (const permId of selected) if (!savedSelected.has(permId)) return true;
    return false;
  }, [selected, savedSelected]);

  // هشدار هنگام بستن/رفرش تب در صورت وجود تغییرات ذخیره‌نشده
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  const visibleTree: PermissionMenu[] = useMemo(() => filterMenuBySearch(permissionsMock, search), [search]);

  const allChecked = selected.size === TOTAL_PERMISSIONS;
  const allIndeterminate = selected.size > 0 && selected.size < TOTAL_PERMISSIONS;

  const handleToggleNode = (node: PermissionMenu, checked: boolean) => {
    setSelected((prev) => toggleNodeSelection(node, prev, checked));
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? selectAllPermissions(permissionsMock) : new Set());
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await updateUserPermissions(user.id, Array.from(selected));
    setSaving(false);
    setSavedSelected(new Set(selected));
    showToast('دسترسی‌های کاربر با موفقیت ذخیره شد.');
  };

  const handleReset = () => {
    setSelected(new Set(savedSelected));
  };

  const handleBack = () => {
    if (dirty) {
      setLeaveWarningOpen(true);
      return;
    }
    navigate('/users');
  };

  if (loading) return <PageLoader />;
  if (error || !user) return <ErrorState onRetry={reload} title="کاربر مورد نظر یافت نشد." />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="مدیریت دسترسی‌های کاربر"
        breadcrumbs={[{ label: 'کاربران', path: '/users' }, { label: 'دسترسی‌ها' }]}
        actions={
          <Button variant="outlined" startIcon={<ArrowForwardRoundedIcon />} onClick={handleBack}>
            بازگشت به لیست
          </Button>
        }
      />

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <AppAvatar name={user.fullName} color={user.avatarColor} size={56} />
          <Stack spacing={0.5} sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h5">{user.fullName}</Typography>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
              <Typography variant="body2" color="text.secondary">@{user.username}</Typography>
              <Chip size="small" label={user.role} />
              <StatusChip label={user.isActive ? 'فعال' : 'غیرفعال'} />
            </Stack>
          </Stack>
        </Stack>
      </Paper>

      {isSuperAdmin ? (
        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 1 }}>این کاربر مدیر سیستم است</Typography>
          <Typography variant="body2" color="text.secondary">
            کاربران با نقش «{SUPER_ADMIN_ROLE}» به‌صورت پیش‌فرض به تمام بخش‌های سامانه دسترسی کامل دارند و نیازی به تنظیم تک‌تک دسترسی‌ها نیست.
          </Typography>
        </Paper>
      ) : (
        <Paper variant="outlined">
          <Stack spacing={2} sx={{ p: 2.5, pb: 2 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} justifyContent="space-between">
              <SearchInput value={search} onChange={setSearch} placeholder="جستجوی دسترسی..." width={{ xs: '100%', sm: 300 }} />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allChecked}
                    indeterminate={allIndeterminate}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                }
                label="انتخاب همه"
              />
            </Stack>

            <Box>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                <Typography variant="body2" color="text.secondary">
                  دسترسی‌های انتخاب‌شده: <b>{selected.size}</b> از {TOTAL_PERMISSIONS}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.round((selected.size / TOTAL_PERMISSIONS) * 100)}٪
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(selected.size / TOTAL_PERMISSIONS) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: (t) => alpha(t.palette.primary.main, 0.12),
                  '& .MuiLinearProgress-bar': { borderRadius: 4 },
                }}
              />
            </Box>
          </Stack>

          <Divider />

          <Box sx={{ p: 2, maxHeight: 560, overflowY: 'auto' }}>
            {visibleTree.length === 0 ? (
              <Typography variant="body2" color="text.disabled" sx={{ py: 4, textAlign: 'center' }}>
                دسترسی‌ای با این عبارت یافت نشد.
              </Typography>
            ) : (
              visibleTree.map((node) => (
                <PermissionTreeNode
                  key={node.id}
                  node={node}
                  selected={selected}
                  onToggle={handleToggleNode}
                  forceExpanded={!!search.trim()}
                />
              ))
            )}
          </Box>

          <Divider />
          <Stack direction="row" justifyContent="flex-end" spacing={1.5} sx={{ p: 2.5 }}>
            <Button color="inherit" startIcon={<RestartAltRoundedIcon />} onClick={handleReset} disabled={!dirty}>
              بازنشانی
            </Button>
            <Button variant="contained" startIcon={<SaveRoundedIcon />} onClick={handleSave} disabled={saving || !dirty}>
              {saving ? 'در حال ذخیره...' : 'ذخیره دسترسی‌ها'}
            </Button>
          </Stack>
        </Paper>
      )}

      <ConfirmDialog
        open={leaveWarningOpen}
        title="تغییرات ذخیره‌نشده"
        description="دسترسی‌هایی که تغییر داده‌اید هنوز ذخیره نشده‌اند. آیا مطمئنید می‌خواهید این صفحه را ترک کنید؟"
        confirmLabel="خروج بدون ذخیره"
        danger
        onConfirm={() => navigate('/users')}
        onClose={() => setLeaveWarningOpen(false)}
      />
    </Stack>
  );
}
