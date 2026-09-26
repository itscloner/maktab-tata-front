import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AppDialog from "@/components/dialogs/AppDialog";
import AppTextField from "@/components/forms/AppTextField";
import {
  userAccountSchema,
  type UserAccountFormValues,
} from "./userAccountSchema";
import {
  useCreateUserMutation,
  useUpdateUserMutation,
} from "@/api/users/_hook";
import { useToastStore } from "@/stores/toastStore";
import type { User } from "@/types/user.types";

interface UserAccountFormDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues?: User; // اگر داده شود یعنی حالت ویرایش است
}

const emptyValues: UserAccountFormValues = {
  firstName: "",
  lastName: "",
  userName: "",
  mobile: "",
  email: "",
};

export default function UserAccountFormDialog({
  open,
  onClose,
  initialValues,
}: UserAccountFormDialogProps) {
  const showToast = useToastStore((s) => s.show);
  const createMutation = useCreateUserMutation();
  const updateMutation = useUpdateUserMutation();
  const isEdit = !!initialValues;
  const pending = createMutation.isPending || updateMutation.isPending;
  const apiError = createMutation.error || updateMutation.error;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UserAccountFormValues>({
    resolver: zodResolver(userAccountSchema),
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (open) {
      reset(initialValues ? { ...emptyValues, ...initialValues } : emptyValues);
      createMutation.reset();
      updateMutation.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialValues]);

  const submit = handleSubmit(async (values) => {
    if (isEdit && initialValues) {
      await updateMutation.mutateAsync({ id: initialValues.id, data: values });
      showToast("اطلاعات کاربر با موفقیت به‌روزرسانی شد.");
    } else {
      await createMutation.mutateAsync(values);
      showToast("کاربر با موفقیت ایجاد شد.");
    }
    onClose();
  });

  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={isEdit ? "ویرایش کاربر" : "افزودن کاربر جدید"}
      actions={
        <>
          <Button onClick={onClose} color="inherit">
            انصراف
          </Button>
          <Button
            onClick={submit}
            variant="contained"
            disabled={isSubmitting || pending}
          >
            {isSubmitting || pending ? "در حال ذخیره..." : "ذخیره"}
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 0.5 }}>
        {apiError && (
          <Grid item xs={12}>
            <Alert severity="error">
              ثبت اطلاعات با خطا مواجه شد. لطفاً دوباره تلاش کنید.
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <AppTextField name="firstName" control={control} label="نام" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField
            name="lastName"
            control={control}
            label="نام خانوادگی"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField name="userName" control={control} label="نام کاربری" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextField
            name="mobile"
            control={control}
            label="موبایل"
            placeholder="09xxxxxxxxx"
          />
        </Grid>
        <Grid item xs={12}>
          <AppTextField
            name="email"
            control={control}
            label="ایمیل"
            type="email"
          />
        </Grid>
      </Grid>
    </AppDialog>
  );
}
