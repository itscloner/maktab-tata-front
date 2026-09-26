import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppDialog from '@/components/dialogs/AppDialog';
import AppTextField from '@/components/forms/AppTextField';
import AppSelect from '@/components/forms/AppSelect';
import { donorSchema, type DonorFormValues } from './donorSchema';
import type { Donor } from '@/types';

interface DonorFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: DonorFormValues) => Promise<void> | void;
  initialValues?: Donor;
}

const emptyValues: DonorFormValues = {
  firstName: '',
  lastName: '',
  nationalId: '',
  mobile: '',
  phone: '',
  address: '',
  city: '',
  status: 'فعال',
  notes: '',
};

export default function DonorFormDialog({ open, onClose, onSubmit, initialValues }: DonorFormDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<DonorFormValues>({ resolver: zodResolver(donorSchema), defaultValues: emptyValues });

  useEffect(() => {
    if (open) {
      reset(initialValues ? { ...emptyValues, ...initialValues } : emptyValues);
    }
  }, [open, initialValues, reset]);

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={initialValues ? 'ویرایش خیر' : 'افزودن خیر جدید'}
      maxWidth="sm"
      actions={
        <>
          <Button onClick={onClose} color="inherit">
            انصراف
          </Button>
          <Button onClick={submit} variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'در حال ذخیره...' : 'ذخیره'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 0.5 }}>
        <Grid item xs={12} sm={6}>
          <AppTextField name="firstName" control={control} label="نام" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField name="lastName" control={control} label="نام خانوادگی" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField name="nationalId" control={control} label="کد ملی" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField name="mobile" control={control} label="موبایل" placeholder="09xxxxxxxxx" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField name="phone" control={control} label="تلفن (اختیاری)" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField name="city" control={control} label="شهر" />
        </Grid>
        <Grid item xs={12}>
          <AppTextField name="address" control={control} label="آدرس" multiline rows={2} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppSelect
            name="status"
            control={control}
            label="وضعیت"
            options={[
              { label: 'فعال', value: 'فعال' },
              { label: 'غیرفعال', value: 'غیرفعال' },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextField name="notes" control={control} label="یادداشت (اختیاری)" multiline rows={2} />
        </Grid>
      </Grid>
    </AppDialog>
  );
}
