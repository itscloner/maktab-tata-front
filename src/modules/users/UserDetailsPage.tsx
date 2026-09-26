import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import PageHeader from "@/components/common/PageHeader";
import AppAvatar from "@/components/common/AppAvatar";
import StatusChip from "@/components/common/StatusChip";
import PageLoader from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useAsyncData } from "@/hooks/useAsyncData";
import { getUserById, updateUser } from "@/api/mock/user.service";
import { formatPersianDate } from "@/utils/date";
import { formatNumber } from "@/utils/currency";
import { useToastStore } from "@/stores/toastStore";
import { usePermission } from "@/permissions/permission.hooks";
import { SUPER_ADMIN_ROLE } from "@/permissions/permission.types";
import { allPermissionIds } from "@/mocks/permissions.mock";
import UserFormDialog from "./UserFormDialog";
import type { UserFormValues } from "./userSchema";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 1 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={600}>
        {value || "—"}
      </Typography>
    </Stack>
  );
}

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.show);
  const {
    data: user,
    loading,
    error,
    reload,
  } = useAsyncData(() => getUserById(id!), [id]);
  const [editOpen, setEditOpen] = useState(false);

  const canEdit = usePermission("users.edit");
  const canManagePermissions = usePermission("users.permissions");

  const handleUpdate = async (values: UserFormValues) => {
    if (!user) return;
    await updateUser(user.id, values);
    setEditOpen(false);
    showToast("اطلاعات کاربر بروزرسانی شد.");
    reload();
  };

  if (loading) return <PageLoader />;
  if (error || !user)
    return <ErrorState onRetry={reload} title="کاربر مورد نظر یافت نشد." />;

  const isSuperAdmin = user.role === SUPER_ADMIN_ROLE;

  return (
    <Stack spacing={3} sx={{ maxWidth: 560 }}>
      <PageHeader
        title={user.fullName}
        breadcrumbs={[
          { label: "کاربران", path: "/users" },
          { label: user.fullName },
        ]}
        actions={
          <Button
            variant="outlined"
            startIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate("/users")}
          >
            بازگشت به لیست
          </Button>
        }
      />

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <AppAvatar name={user.fullName} color={user.avatarColor} size={64} />
          <Typography variant="h5">{user.fullName}</Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip size="small" label={user.role} />
            <StatusChip label={user.isActive ? "فعال" : "غیرفعال"} />
          </Stack>
        </Stack>
        <Divider sx={{ mb: 1 }} />
        <InfoRow label="نام کاربری" value={`@${user.username}`} />
        <InfoRow label="موبایل" value={user.mobile} />
        <InfoRow label="ایمیل" value={user.email} />
        <InfoRow
          label="تعداد دسترسی‌ها"
          value={
            isSuperAdmin
              ? `همه (${formatNumber(allPermissionIds.length)})`
              : formatNumber(user.permissions.length)
          }
        />
        <InfoRow
          label="آخرین ورود"
          value={
            user.lastLoginAt
              ? formatPersianDate(user.lastLoginAt, true)
              : "هنوز وارد نشده"
          }
        />
        <InfoRow
          label="تاریخ ایجاد"
          value={formatPersianDate(user.createdAt)}
        />

        <Divider sx={{ my: 1.5 }} />
        <Stack direction="row" spacing={1.5}>
          {canEdit && (
            <Button
              variant="contained"
              startIcon={<EditRoundedIcon />}
              onClick={() => setEditOpen(true)}
              fullWidth
            >
              ویرایش اطلاعات
            </Button>
          )}
          {canManagePermissions && !isSuperAdmin && (
            <Button
              variant="outlined"
              startIcon={<AdminPanelSettingsRoundedIcon />}
              onClick={() => navigate(`/users/${user.id}/permissions`)}
              fullWidth
            >
              مدیریت دسترسی‌ها
            </Button>
          )}
        </Stack>
      </Paper>

      <UserFormDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleUpdate}
        initialValues={user}
      />
    </Stack>
  );
}
