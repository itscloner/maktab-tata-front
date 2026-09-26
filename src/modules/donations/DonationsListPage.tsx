import { useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import type { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import SearchInput from '@/components/common/SearchInput';
import StatusChip from '@/components/common/StatusChip';
import AppDataGrid from '@/components/tables/AppDataGrid';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { TableSkeleton } from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { deleteDonation, getDonations } from '@/services/mock/donation.service';
import { formatCurrency } from '@/utils/currency';
import { formatPersianDate } from '@/utils/date';
import { useToastStore } from '@/stores/toastStore';
import { usePermission } from '@/permissions/permission.hooks';
import type { Donation, DonationType } from '@/types';

const TYPES: DonationType[] = ['نقدی', 'کارت‌به‌کارت', 'درگاه', 'واریز بانکی', 'غیرنقدی', 'صدقه', 'زکات', 'نذر'];

export default function DonationsListPage() {
  const navigate = useNavigate();
  const { data: rows, loading, error, reload } = useAsyncData(getDonations);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<Donation | null>(null);
  const [deleting, setDeleting] = useState(false);
  const showToast = useToastStore((s) => s.show);
  const canCreate = usePermission('donations.create');
  const canDelete = usePermission('donations.delete');

  const filtered = useMemo(() => {
    if (!rows) return [];
    return rows.filter((d) => {
      const matchesSearch = !search || d.donorName.includes(search) || d.transactionNumber.includes(search);
      const matchesType = typeFilter === 'all' || d.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [rows, search, typeFilter]);

  const columns: GridColDef<Donation>[] = [
    { field: 'transactionNumber', headerName: 'شماره تراکنش', width: 130 },
    { field: 'donorName', headerName: 'خیر', flex: 1, minWidth: 150 },
    { field: 'amount', headerName: 'مبلغ', width: 150, valueFormatter: (value) => formatCurrency(value as number) },
    { field: 'type', headerName: 'نوع کمک', width: 120 },
    { field: 'date', headerName: 'تاریخ', width: 120, valueFormatter: (value) => formatPersianDate(value as string) },
    { field: 'projectName', headerName: 'پروژه', width: 170, valueFormatter: (value) => (value as string) ?? '—' },
    { field: 'status', headerName: 'وضعیت', width: 110, renderCell: (p) => <StatusChip label={p.value as string} /> },
    {
      field: 'actions',
      headerName: 'عملیات',
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        canDelete ? (
          <Tooltip title="حذف">
            <IconButton size="small" color="error" onClick={() => setDeleteTarget(params.row)}>
              <DeleteRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ) : null,
    },
  ];

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteDonation(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    showToast('کمک با موفقیت حذف شد.', 'info');
    reload();
  };

  if (loading) return <TableSkeleton rows={8} />;
  if (error) return <ErrorState onRetry={reload} />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="کمک‌ها"
        description="مدیریت کمک‌های دریافتی از خیرین"
        actions={
          canCreate ? (
            <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => navigate('/donations/create')}>
              ثبت کمک جدید
            </Button>
          ) : undefined
        }
      />
      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <TextField
          select
          size="small"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ width: 160 }}
        >
          <MenuItem value="all">همه انواع</MenuItem>
          {TYPES.map((t) => (
            <MenuItem key={t} value={t}>{t}</MenuItem>
          ))}
        </TextField>
        <SearchInput value={search} onChange={setSearch} placeholder="جستجوی خیر یا شماره تراکنش..." width={280} />
      </Stack>
      <AppDataGrid
        rows={filtered}
        columns={columns}
        getRowId={(row) => row.id}
        emptyTitle="هنوز هیچ کمکی ثبت نشده است."
        emptyDescription="با کلیک روی «ثبت کمک جدید» اولین کمک را ثبت کنید."
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف کمک"
        description={`آیا از حذف تراکنش «${deleteTarget?.transactionNumber}» مطمئن هستید؟`}
        confirmLabel="حذف"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </Stack>
  );
}
