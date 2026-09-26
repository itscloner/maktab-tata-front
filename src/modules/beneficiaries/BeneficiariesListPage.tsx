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
import StatusChip from '@/components/common/StatusChip';
import AppDataGrid from '@/components/tables/AppDataGrid';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { TableSkeleton } from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { createBeneficiary, deleteBeneficiary, getBeneficiaries, updateBeneficiary } from '@/services/mock/beneficiary.service';
import { formatPersianDate } from '@/utils/date';
import { useToastStore } from '@/stores/toastStore';
import { usePermission } from '@/permissions/permission.hooks';
import BeneficiaryFormDialog from './BeneficiaryFormDialog';
import type { BeneficiaryFormValues } from './beneficiarySchema';
import type { Beneficiary } from '@/types';

export default function BeneficiariesListPage() {
  const navigate = useNavigate();
  const { data: rows, loading, error, reload } = useAsyncData(getBeneficiaries);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Beneficiary | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Beneficiary | null>(null);
  const [deleting, setDeleting] = useState(false);
  const showToast = useToastStore((s) => s.show);
  const canCreate = usePermission('beneficiaries.create');
  const canEdit = usePermission('beneficiaries.edit');
  const canDelete = usePermission('beneficiaries.delete');

  const filtered = useMemo(() => {
    if (!rows) return [];
    const q = search.trim();
    if (!q) return rows;
    return rows.filter((b) => `${b.firstName} ${b.lastName}`.includes(q) || b.nationalId.includes(q) || b.mobile.includes(q));
  }, [rows, search]);

  const columns: GridColDef<Beneficiary>[] = [
    {
      field: 'firstName',
      headerName: 'نام',
      flex: 1.2,
      minWidth: 180,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1.25} sx={{ height: '100%' }}>
          <AppAvatar name={`${params.row.firstName} ${params.row.lastName}`} color={params.row.avatarColor} size={30} />
          <span>{params.row.firstName} {params.row.lastName}</span>
        </Stack>
      ),
    },
    { field: 'nationalId', headerName: 'کد ملی', width: 120 },
    { field: 'mobile', headerName: 'موبایل', width: 130 },
    { field: 'familyMembersCount', headerName: 'اعضای خانوار', width: 120, type: 'number' },
    { field: 'economicStatus', headerName: 'وضعیت اقتصادی', width: 150 },
    {
      field: 'caseStatus',
      headerName: 'وضعیت پرونده',
      width: 140,
      renderCell: (params) => <StatusChip label={params.value as string} />,
    },
    {
      field: 'lastSupportDate',
      headerName: 'آخرین حمایت',
      width: 130,
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
            <IconButton size="small" onClick={() => navigate(`/beneficiaries/${params.row.id}`)}>
              <VisibilityRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {canEdit && (
            <Tooltip title="ویرایش">
              <IconButton size="small" onClick={() => setEditTarget(params.row)}>
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {canDelete && (
            <Tooltip title="حذف">
              <IconButton size="small" color="error" onClick={() => setDeleteTarget(params.row)}>
                <DeleteRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      ),
    },
  ];

  const handleCreate = async (values: BeneficiaryFormValues) => {
    await createBeneficiary(values);
    setFormOpen(false);
    showToast('مددجو با موفقیت ثبت شد.');
    reload();
  };

  const handleUpdate = async (values: BeneficiaryFormValues) => {
    if (!editTarget) return;
    await updateBeneficiary(editTarget.id, values);
    setEditTarget(null);
    showToast('پرونده مددجو بروزرسانی شد.');
    reload();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteBeneficiary(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    showToast('پرونده مددجو حذف شد.', 'info');
    reload();
  };

  if (loading) return <TableSkeleton rows={8} />;
  if (error) return <ErrorState onRetry={reload} />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="مددجویان"
        description="مدیریت پرونده و وضعیت حمایتی مددجویان"
        actions={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setFormOpen(true)}>
            افزودن مددجو
          </Button>
        }
      />
      <Stack direction="row" justifyContent="flex-end">
        <SearchInput value={search} onChange={setSearch} placeholder="جستجوی نام، کد ملی یا موبایل..." width={320} />
      </Stack>
      <AppDataGrid
        rows={filtered}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(params) => navigate(`/beneficiaries/${params.id}`)}
        emptyTitle="هنوز هیچ مددجویی ثبت نشده است."
        emptyDescription="با کلیک روی «افزودن مددجو» اولین پرونده را ایجاد کنید."
      />
      <BeneficiaryFormDialog open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleCreate} />
      <BeneficiaryFormDialog
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleUpdate}
        initialValues={editTarget ?? undefined}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف پرونده مددجو"
        description={`آیا از حذف پرونده «${deleteTarget?.firstName} ${deleteTarget?.lastName}» مطمئن هستید؟`}
        confirmLabel="حذف"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </Stack>
  );
}
