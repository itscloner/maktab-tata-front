import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import type { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import AppAvatar from "@/components/common/AppAvatar";
import StatusChip from "@/components/common/StatusChip";
import AppDataGrid from "@/components/tables/AppDataGrid";
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import { TableSkeleton } from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useAsyncData } from "@/hooks/useAsyncData";
import {
  deleteUser,
  getUsers,
  createUser,
  updateUser,
} from "@/api/mock/user.service";
import { formatPersianDate } from "@/utils/date";
import { formatNumber } from "@/utils/currency";
import { useToastStore } from "@/stores/toastStore";
import { usePermission } from "@/permissions/permission.hooks";
import { SUPER_ADMIN_ROLE } from "@/permissions/permission.types";
import { allPermissionIds } from "@/mocks/permissions.mock";
import type { PermissionUser } from "@/permissions/permission.types";
import UserFormDialog from "./UserFormDialog";
import type { UserFormValues } from "./userSchema";

export default function UsersListPage() {
  const navigate = useNavigate();
  const { data: rows, loading, error, reload } = useAsyncData(getUsers);
  const [deleteTarget, setDeleteTarget] = useState<PermissionUser | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<PermissionUser | null>(null);
  const showToast = useToastStore((s) => s.show);

  const canEdit = usePermission("users.edit");
  const canDelete = usePermission("users.delete");
  const canManagePermissions = usePermission("users.permissions");
  const canCreate = usePermission("users.create");

  const columns: GridColDef<PermissionUser>[] = [
    {
      field: "fullName",
      headerName: "نام و نام خانوادگی",
      flex: 1.2,
      minWidth: 190,
      renderCell: (params) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          sx={{ height: "100%" }}
        >
          <AppAvatar
            name={params.row.fullName}
            color={params.row.avatarColor}
            size={30}
          />
          <span>{params.row.fullName}</span>
        </Stack>
      ),
    },
    { field: "username", headerName: "نام کاربری", width: 150 },
    { field: "mobile", headerName: "موبایل", width: 130 },
    {
      field: "role",
      headerName: "نقش",
      width: 140,
      renderCell: (params) =>
        params.value === SUPER_ADMIN_ROLE ? (
          <Chip
            size="small"
            icon={
              <AdminPanelSettingsRoundedIcon
                sx={{ fontSize: "16px !important" }}
              />
            }
            label={params.value as string}
            color="primary"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label={params.value as string}
            variant="outlined"
          />
        ),
    },
    {
      field: "permissions",
      headerName: "تعداد دسترسی‌ها",
      width: 140,
      renderCell: (params) =>
        params.row.role === SUPER_ADMIN_ROLE ? (
          <Typography variant="body2" fontWeight={700} color="primary.main">
            همه ({formatNumber(allPermissionIds.length)})
          </Typography>
        ) : (
          <Typography variant="body2" fontWeight={700}>
            {formatNumber((params.value as string[]).length)}
          </Typography>
        ),
    },
    {
      field: "isActive",
      headerName: "وضعیت",
      width: 110,
      renderCell: (params) => (
        <StatusChip label={params.value ? "فعال" : "غیرفعال"} />
      ),
    },
    {
      field: "lastLoginAt",
      headerName: "آخرین ورود",
      width: 140,
      valueFormatter: (value) =>
        value ? formatPersianDate(value as string) : "—",
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={0.5}
          onClick={(e) => e.stopPropagation()}
        >
          <Tooltip title="مشاهده">
            <IconButton
              size="small"
              onClick={() => navigate(`/users/${params.row.id}`)}
            >
              <VisibilityRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {canEdit && (
            <Tooltip title="ویرایش">
              <IconButton
                size="small"
                onClick={() => setEditTarget(params.row)}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {canManagePermissions && (
            <Tooltip title="مدیریت دسترسی‌ها">
              <IconButton
                size="small"
                color="primary"
                onClick={() => navigate(`/users/${params.row.id}/permissions`)}
              >
                <AdminPanelSettingsRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          {canDelete && (
            <Tooltip title="حذف">
              <IconButton
                size="small"
                color="error"
                onClick={() => setDeleteTarget(params.row)}
              >
                <DeleteRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      ),
    },
  ];

  const handleCreate = async (values: UserFormValues) => {
    await createUser(values);
    setFormOpen(false);
    showToast("کاربر با موفقیت ثبت شد.");
    reload();
  };

  const handleUpdate = async (values: UserFormValues) => {
    if (!editTarget) return;
    await updateUser(editTarget.id, values);
    setEditTarget(null);
    showToast("اطلاعات کاربر بروزرسانی شد.");
    reload();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteUser(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    showToast("کاربر حذف شد.", "info");
    reload();
  };

  if (loading) return <TableSkeleton rows={8} />;
  if (error) return <ErrorState onRetry={reload} />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="کاربران"
        description="مدیریت کاربران و دسترسی‌های آن‌ها به بخش‌های سامانه"
        actions={
          canCreate ? (
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => setFormOpen(true)}
            >
              افزودن کاربر
            </Button>
          ) : undefined
        }
      />
      <AppDataGrid
        rows={rows ?? []}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={(params) => navigate(`/users/${params.id}`)}
        emptyTitle="کاربری ثبت نشده است."
      />
      <UserFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
      />
      <UserFormDialog
        open={!!editTarget}
        onClose={() => setEditTarget(null)}
        onSubmit={handleUpdate}
        initialValues={editTarget ?? undefined}
      />
      <ConfirmDialog
        open={!!deleteTarget}
        title="حذف کاربر"
        description={`آیا از حذف «${deleteTarget?.fullName}» مطمئن هستید؟`}
        confirmLabel="حذف"
        danger
        loading={deleting}
        onConfirm={handleDelete}
        onClose={() => setDeleteTarget(null)}
      />
    </Stack>
  );
}
