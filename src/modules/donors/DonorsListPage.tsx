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
import { createDonor, deleteDonor, getDonors, updateDonor } from '@/services/mock/donor.service';
import { formatCurrency } from '@/utils/currency';
import { formatPersianDate } from '@/utils/date';
import { useToastStore } from '@/stores/toastStore';
import { usePermission } from '@/permissions/permission.hooks';
import DonorFormDialog from './DonorFormDialog';
import type { DonorFormValues } from './donorSchema';
import type { Donor } from '@/types';

export default function DonorsListPage() {
  const navigate = useNavigate();
  const { data: donors, loading, error, reload } = useAsyncData(getDonors);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Donor | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Donor | null>(null);
  const [deleting, setDeleting] = useState(false);
  const showToast = useToastStore((s) => s.show);
  const canCreate = usePermission('donors.create');
  const canEdit = usePermission('donors.edit');
  const canDelete = usePermission('donors.delete');

  const filtered = useMemo(() => {
    if (!donors) return [];
    const q = search.trim();
    if (!q) return donors;
    return donors.filter(
      (d) =>
        `${d.firstName} ${d.lastName}`.includes(q) ||
        d.nationalId.includes(q) ||
        d.mobile.includes(q),
    );
  }, [donors, search]);

  const columns: GridColDef<Donor>[] = [
    {
      field: 'firstName',
      headerName: 'نام',
      flex: 1.3,
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
    { field: 'donationsCount', headerName: 'تعداد کمک', width: 110, type: 'number' },
    {
      field: 'totalDonationsAmount',
      headerName: 'مجموع کمک',
      width: 160,
      valueFormatter: (value) => formatCurrency(value as number),
    },
    {
      field: 'lastDonationDate',
      headerName: 'آخرین کمک',
      width: 130,
      valueFormatter: (value) => (value ? formatPersianDate(value as string) : '—'),
    },
    {
      field: 'status',
      headerName: 'وضعیت',
      width: 110,
      renderCell: (params) => <StatusChip label={params.value as string} />,
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
            <IconButton size="small" onClick={() => navigate(`/donors/${params.row.id}`)}>
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

  const handleCreate = async (values: DonorFormValues) => {
    await createDonor(values);
    setFormOpen(false);
    showToast('خیر با موفقیت ثبت شد.');
    reload();
  };

  const handleUpdate = async (values: DonorFormValues) => {
    if (!editTarget) return;
    await updateDonor(editTarget.id, values);
    setEditTarget(null);
    showToast('اطلاعات خیر بروزرسانی شد.');
    reload();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteDonor(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    showToast('خیر با موفقیت حذف شد.', 'info');
    reload();
  };

  if (loading) return <TableSkeleton rows={8} />;
  if (error) return <ErrorState onRetry={reload} />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="خیرین"
        description="مدیریت اطلاعات و تاریخچه کمک‌های خیرین"
        actions={
          canCreate ? (
            <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setFormOpen(true)}>
              افزودن خیر
            </Button>
          ) : undefined
        }
      />
      <Stack direction="row" justifyContent="flex-end">
        <SearchInput value={search} onChange={setSearch} placeholder="جستجوی نام، کد ملی یا موبایل..." width={320} />
      </Stack>
      <AppDataGrid
        rows={filtered}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(params) => navigate(`/donors/${params.id}`)}
        emptyTitle="هنوز هیچ خیری ثبت نشده است."
        emptyDescription="با کلیک روی «افزودن خیر» اولین خیر را ثبت کنید."
      />
      <DonorFormDialog open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleCreate} />
      <DonorFormDialog
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleUpdate}
        initialValues={editTarget ?? undefined}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف خیر"
        description={`آیا از حذف «${deleteTarget?.firstName} ${deleteTarget?.lastName}» مطمئن هستید؟ این عملیات قابل بازگشت نیست.`}
        confirmLabel="حذف"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </Stack>
  );
}
