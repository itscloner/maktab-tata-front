import { useMemo, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import type { GridColDef } from '@mui/x-data-grid';
import PageHeader from '@/components/common/PageHeader';
import SearchInput from '@/components/common/SearchInput';
import StatusChip from '@/components/common/StatusChip';
import AppDataGrid from '@/components/tables/AppDataGrid';
import ConfirmDialog from '@/components/dialogs/ConfirmDialog';
import { TableSkeleton } from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { createExpense, deleteExpense, getExpenses } from '@/services/mock/expense.service';
import { getProjects } from '@/services/mock/project.service';
import { formatCurrency } from '@/utils/currency';
import { formatPersianDate } from '@/utils/date';
import { useToastStore } from '@/stores/toastStore';
import { usePermission } from '@/permissions/permission.hooks';
import ExpenseFormDialog from './ExpenseFormDialog';
import type { ExpenseFormValues } from './expenseSchema';
import type { Expense } from '@/types';

export default function ExpensesListPage() {
  const { data: rows, loading, error, reload } = useAsyncData(getExpenses);
  const { data: projects } = useAsyncData(getProjects);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Expense | null>(null);
  const [deleting, setDeleting] = useState(false);
  const showToast = useToastStore((s) => s.show);
  const canCreate = usePermission('expenses.create');
  const canDelete = usePermission('expenses.delete');

  const filtered = useMemo(() => {
    if (!rows) return [];
    return rows.filter((e) => !search || e.title.includes(search) || e.documentNumber.includes(search));
  }, [rows, search]);

  const columns: GridColDef<Expense>[] = [
    { field: 'documentNumber', headerName: 'شماره سند', width: 120 },
    { field: 'title', headerName: 'عنوان', flex: 1, minWidth: 170 },
    { field: 'category', headerName: 'دسته‌بندی', width: 150 },
    { field: 'amount', headerName: 'مبلغ', width: 150, valueFormatter: (value) => formatCurrency(value as number) },
    { field: 'date', headerName: 'تاریخ', width: 120, valueFormatter: (value) => formatPersianDate(value as string) },
    { field: 'projectName', headerName: 'پروژه', width: 170, valueFormatter: (value) => (value as string) ?? '—' },
    { field: 'status', headerName: 'وضعیت', width: 130, renderCell: (p) => <StatusChip label={p.value as string} /> },
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

  const handleCreate = async (values: ExpenseFormValues) => {
    const project = projects?.find((p) => p.id === values.projectId);
    await createExpense({ ...values, projectName: project?.title ?? null });
    setFormOpen(false);
    showToast('هزینه با موفقیت ثبت شد.');
    reload();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteExpense(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    showToast('هزینه حذف شد.', 'info');
    reload();
  };

  if (loading) return <TableSkeleton rows={8} />;
  if (error) return <ErrorState onRetry={reload} />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="هزینه‌ها"
        description="ثبت و مدیریت هزینه‌های خیریه"
        actions={
          canCreate ? (
            <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => setFormOpen(true)}>
              ثبت هزینه جدید
            </Button>
          ) : undefined
        }
      />
      <Stack direction="row" justifyContent="flex-end">
        <SearchInput value={search} onChange={setSearch} placeholder="جستجوی عنوان یا شماره سند..." width={300} />
      </Stack>
      <AppDataGrid
        rows={filtered}
        columns={columns}
        getRowId={(row) => row.id}
        emptyTitle="هنوز هیچ هزینه‌ای ثبت نشده است."
        emptyDescription="با کلیک روی «ثبت هزینه جدید» اولین سند هزینه را ثبت کنید."
      />
      <ExpenseFormDialog open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleCreate} projects={projects ?? []} />
      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف هزینه"
        description={`آیا از حذف سند «${deleteTarget?.documentNumber}» مطمئن هستید؟`}
        confirmLabel="حذف"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </Stack>
  );
}
