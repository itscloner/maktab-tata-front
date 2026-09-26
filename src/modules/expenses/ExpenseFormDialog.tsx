import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppDialog from '@/components/dialogs/AppDialog';
import AppTextField from '@/components/forms/AppTextField';
import AppSelect from '@/components/forms/AppSelect';
import AppDatePicker from '@/components/forms/AppDatePicker';
import MoneyInput from '@/components/common/MoneyInput';
import { expenseSchema, type ExpenseFormValues } from './expenseSchema';
import type { Project } from '@/types';

const CATEGORIES = ['کمک به مددجویان', 'درمان', 'آموزش', 'مواد غذایی', 'اجاره', 'حقوق', 'حمل‌ونقل', 'تجهیزات', 'سایر'];

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ExpenseFormValues) => Promise<void> | void;
  projects: Project[];
}

const emptyValues: ExpenseFormValues = {
  title: '',
  category: 'سایر',
  amount: 0,
  date: new Date().toISOString(),
  projectId: '',
};

export default function ExpenseFormDialog({ open, onClose, onSubmit, projects }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ExpenseFormValues>({ resolver: zodResolver(expenseSchema), defaultValues: emptyValues });

  useEffect(() => {
    if (open) reset(emptyValues);
  }, [open, reset]);

  const submit = handleSubmit(async (values) => {
    await onSubmit({ ...values, projectId: values.projectId || null });
  });

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="ثبت هزینه جدید"
      actions={
        <>
          <Button onClick={onClose} color="inherit">انصراف</Button>
          <Button onClick={submit} variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'در حال ذخیره...' : 'ثبت هزینه'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 0.5 }}>
        <Grid item xs={12}>
          <AppTextField name="title" control={control} label="عنوان هزینه" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppSelect name="category" control={control} label="دسته‌بندی" options={CATEGORIES.map((c) => ({ label: c, value: c }))} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => (
              <MoneyInput label="مبلغ" value={field.value} onChange={field.onChange} fullWidth error={!!fieldState.error} helperText={fieldState.error?.message} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppDatePicker name="date" control={control} label="تاریخ" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppSelect
            name="projectId"
            control={control}
            label="پروژه (اختیاری)"
            options={[{ label: 'بدون پروژه', value: '' }, ...projects.map((p) => ({ label: p.title, value: p.id }))]}
          />
        </Grid>
      </Grid>
    </AppDialog>
  );
}
