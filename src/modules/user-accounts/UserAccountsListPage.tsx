import { useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import type { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import SearchInput from '@/components/common/SearchInput';
import AppAvatar from '@/components/common/AppAvatar';
import AppDataGrid from '@/components/tables/AppDataGrid';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { TableSkeleton } from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { formatPersianDate } from '@/utils/date';
import { useToastStore } from '@/stores/toastStore';
import { useUsersListQuery, useDeleteUserMutation } from '@/Services/users/_hook';
import UserAccountFormDialog from './UserAccountFormDialog';
import type { User } from '@/Types/user.types';

export default function UserAccountsListPage() {
  const navigate = useNavigate();
  const { data: rows, isLoading, isError, refetch } = useUsersListQuery();
  const deleteMutation = useDeleteUserMutation();
  const showToast = useToastStore((s) => s.show);

  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const q = search.trim();
    if (!q) return rows;
    return rows.filter(
      (u) =>
        `${u.firstName} ${u.lastName}`.includes(q) ||
        u.userName.includes(q) ||
        u.mobile.includes(q) ||
        u.email.includes(q),
    );
  }, [rows, search]);

  const columns: GridColDef<User>[] = [
    {
      field: 'firstName',
      headerName: 'نام و نام خانوادگی',
      flex: 1.1,
      minWidth: 180,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1.25} sx={{ height: '100%' }}>
          <AppAvatar name={`${params.row.firstName} ${params.row.lastName}`} size={30} />
          <span>{params.row.firstName} {params.row.lastName}</span>
        </Stack>
      ),
    },
    { field: 'mobile', headerName: 'موبایل', width: 130 },
    { field: 'email', headerName: 'ایمیل', flex: 1, minWidth: 170 },
    { field: 'userName', headerName: 'نام کاربری', width: 140 },
    {
      field: 'lastEntry',
      headerName: 'آخرین ورود',
      width: 140,
      valueFormatter: (value) => (value ? formatPersianDate(value as string) : '—'),
    },
    {
      field: 'actions',
      headerName: 'عملیات',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5} onClick={(e) => e.stopPropagation()}>
          <Tooltip title="مشاهده">
            <IconButton size="small" onClick={() => navigate(`/user-accounts/${params.row.id}`)}>
              <VisibilityRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="ویرایش">
            <IconButton size="small" onClick={() => setEditTarget(params.row)}>
              <EditRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="حذف">
            <IconButton size="small" color="error" onClick={() => setDeleteTarget(params.row)}>
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      showToast('کاربر حذف شد.', 'info');
      setDeleteTarget(null);
    } catch {
      showToast('حذف کاربر با خطا مواجه شد.', 'error');
    }
  };

  if (isLoading) return <TableSkeleton rows={8} />;
  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="کاربران"
        description="مدیریت اطلاعات پایه کاربران سامانه (متصل به API واقعی)"
        actions={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setFormOpen(true)}>
            افزودن کاربر
          </Button>
        }
      />
      <Stack direction="row" justifyContent="flex-end">
        <SearchInput value={search} onChange={setSearch} placeholder="جستجوی نام، موبایل، ایمیل یا نام کاربری..." width={320} />
      </Stack>
      <AppDataGrid
        rows={filtered}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(params) => navigate(`/user-accounts/${params.id}`)}
        emptyTitle="هنوز هیچ کاربری ثبت نشده است."
        emptyDescription="با کلیک روی «افزودن کاربر» اولین کاربر را ثبت کنید."
      />
      <UserAccountFormDialog open={formOpen} onClose={() => setFormOpen(false)} />
      <UserAccountFormDialog
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        initialValues={editTarget ?? undefined}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف کاربر"
        description={`آیا از حذف «${deleteTarget?.firstName} ${deleteTarget?.lastName}» مطمئن هستید؟`}
        confirmLabel="حذف"
        danger
        loading={deleteMutation.isPending}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </Stack>
  );
}
