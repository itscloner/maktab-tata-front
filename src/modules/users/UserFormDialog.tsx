import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Controller } from 'react-hook-form';
import AppDialog from '@/components/dialogs/AppDialog';
import AppTextField from '@/components/forms/AppTextField';
import AppSelect from '@/components/forms/AppSelect';
import { userSchema, type UserFormValues } from './userSchema';
import type { PermissionUser } from '@/permissions/permission.types';

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: UserFormValues) => Promise<void> | void;
  initialValues?: PermissionUser; // اگر داده شود یعنی حالت ویرایش است
}

const ROLE_OPTIONS = ['مدیر سیستم', 'مدیر خیریه', 'مسئول مالی', 'اپراتور', 'مشاهده‌گر'].map((r) => ({
  label: r,
  value: r,
}));

const emptyValues: UserFormValues = {
  fullName: '',
  username: '',
  email: '',
  mobile: '',
  role: 'اپراتور',
  isActive: true,
};

export default function UserFormDialog({ open, onClose, onSubmit, initialValues }: UserFormDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UserFormValues>({ resolver: zodResolver(userSchema), defaultValues: emptyValues });

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
      title={initialValues ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
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
          <AppTextField name="fullName" control={control} label="نام و نام خانوادگی" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField name="username" control={control} label="نام کاربری" disabled={!!initialValues} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField name="email" control={control} label="ایمیل" type="email" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField name="mobile" control={control} label="موبایل" placeholder="09xxxxxxxxx" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppSelect name="role" control={control} label="نقش" options={ROLE_OPTIONS} />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                label="کاربر فعال باشد"
              />
            )}
          />
        </Grid>
      </Grid>
    </AppDialog>
  );
}
