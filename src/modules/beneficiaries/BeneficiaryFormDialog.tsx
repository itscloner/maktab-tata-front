import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppDialog from '@/components/dialogs/AppDialog';
import AppTextField from '@/components/forms/AppTextField';
import AppSelect from '@/components/forms/AppSelect';
import { beneficiarySchema, type BeneficiaryFormValues } from './beneficiarySchema';
import type { Beneficiary } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: BeneficiaryFormValues) => Promise<void> | void;
  initialValues?: Beneficiary;
}

const emptyValues: BeneficiaryFormValues = {
  firstName: '',
  lastName: '',
  nationalId: '',
  mobile: '',
  address: '',
  city: '',
  economicStatus: 'متوسط',
  caseStatus: 'در انتظار بررسی',
};

export default function BeneficiaryFormDialog({ open, onClose, onSubmit, initialValues }: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<BeneficiaryFormValues>({ resolver: zodResolver(beneficiarySchema), defaultValues: emptyValues });

  useEffect(() => {
    if (open) reset(initialValues ? { ...emptyValues, ...initialValues } : emptyValues);
  }, [open, initialValues, reset]);

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={initialValues ? 'ویرایش مددجو' : 'افزودن مددجوی جدید'}
      actions={
        <>
          <Button onClick={onClose} color="inherit">انصراف</Button>
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
          <AppTextField name="mobile" control={control} label="موبایل" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField name="city" control={control} label="شهر" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppSelect
            name="economicStatus"
            control={control}
            label="وضعیت اقتصادی"
            options={['بحرانی', 'ضعیف', 'متوسط', 'نیازمند بررسی مجدد'].map((v) => ({ label: v, value: v }))}
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextField name="address" control={control} label="آدرس" multiline rows={2} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppSelect
            name="caseStatus"
            control={control}
            label="وضعیت پرونده"
            options={['فعال', 'غیرفعال', 'در انتظار بررسی', 'مختومه'].map((v) => ({ label: v, value: v }))}
          />
        </Grid>
      </Grid>
    </AppDialog>
  );
}
