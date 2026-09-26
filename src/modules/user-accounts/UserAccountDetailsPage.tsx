import { useParams, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PageHeader from '@/components/common/PageHeader';
import AppAvatar from '@/components/common/AppAvatar';
import PageLoader from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { formatPersianDate } from '@/utils/date';
import { useUserByIdQuery } from '@/Services/users/_hook';
import { useState } from 'react';
import UserAccountFormDialog from './UserAccountFormDialog';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 1 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={600}>{value || '—'}</Typography>
    </Stack>
  );
}

export default function UserAccountDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = id ? Number(id) : undefined;
  const { data: user, isLoading, isError, refetch } = useUserByIdQuery(userId);
  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) return <PageLoader />;
  if (isError || !user) return <ErrorState onRetry={refetch} title="کاربر مورد نظر یافت نشد." />;

  return (
    <Stack spacing={3} sx={{ maxWidth: 560 }}>
      <PageHeader
        title={`${user.firstName} ${user.lastName}`}
        breadcrumbs={[{ label: 'کاربران', path: '/user-accounts' }, { label: `${user.firstName} ${user.lastName}` }]}
        actions={
          <Button variant="outlined" startIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate('/user-accounts')}>
            بازگشت به لیست
          </Button>
        }
      />

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <AppAvatar name={`${user.firstName} ${user.lastName}`} size={64} />
          <Typography variant="h5">{user.firstName} {user.lastName}</Typography>
        </Stack>
        <Divider sx={{ mb: 1 }} />
        <InfoRow label="نام کاربری" value={user.userName} />
        <InfoRow label="موبایل" value={user.mobile} />
        <InfoRow label="ایمیل" value={user.email} />
        <InfoRow label="آخرین ورود" value={user.lastEntry ? formatPersianDate(user.lastEntry, true) : 'هنوز وارد نشده'} />
        <Divider sx={{ my: 1.5 }} />
        <Button variant="contained" startIcon={<EditRoundedIcon />} onClick={() => setEditOpen(true)} fullWidth>
          ویرایش اطلاعات
        </Button>
      </Paper>

      <UserAccountFormDialog open={editOpen} onClose={() => setEditOpen(false)} initialValues={user} />
    </Stack>
  );
}
