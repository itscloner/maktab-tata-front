import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppDialog from '@/components/dialogs/AppDialog';
import AppTextField from '@/components/forms/AppTextField';
import AppSelect from '@/components/forms/AppSelect';
import AppDatePicker from '@/components/forms/AppDatePicker';
import { approvalSchema, type ApprovalFormValues } from './approvalSchema';

interface RequestApprovalDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: ApprovalFormValues) => Promise<void> | void;
}

const emptyValues: ApprovalFormValues = {
  approvalDate: new Date().toISOString(),
  decision: 'تایید',
  reason: '',
  description: '',
};

export default function RequestApprovalDialog({ open, onClose, onSubmit }: RequestApprovalDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ApprovalFormValues>({ resolver: zodResolver(approvalSchema), defaultValues: emptyValues });

  useEffect(() => {
    if (open) reset(emptyValues);
  }, [open, reset]);

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title="بررسی درخواست"
      actions={
        <>
          <Button onClick={onClose} color="inherit">
            انصراف
          </Button>
          <Button onClick={submit} variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'در حال ثبت...' : 'ثبت نتیجه بررسی'}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 0.5 }}>
        <Grid item xs={12} sm={6}>
          <AppDatePicker name="approvalDate" control={control} label="تاریخ تایید" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppSelect
            name="decision"
            control={control}
            label="وضعیت درخواست"
            options={[
              { label: 'تایید', value: 'تایید' },
              { label: 'رد', value: 'رد' },
            ]}
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextField name="reason" control={control} label="علت تایید یا رد" multiline rows={2} />
        </Grid>
        <Grid item xs={12}>
          <AppTextField name="description" control={control} label="توضیحات (اختیاری)" multiline rows={2} />
        </Grid>
      </Grid>
    </AppDialog>
  );
}
