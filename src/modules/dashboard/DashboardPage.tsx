import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import PageLoader from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getDashboardData } from '@/services/mock/dashboard.service';
import { formatCompactCurrency, formatNumber } from '@/utils/currency';
import DonationsAreaChart from './DonationsAreaChart';
import ExpensesBarChart from './ExpensesBarChart';
import DonationTypesDonut from './DonationTypesDonut';
import ProjectsProgressList from './ProjectsProgressList';
import RecentTransactionsTable from './RecentTransactionsTable';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { data, loading, error, reload } = useAsyncData(getDashboardData);

  if (loading) return <PageLoader />;
  if (error || !data) return <ErrorState onRetry={reload} />;

  const { stats } = data;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="داشبورد"
        description="نمای کلی وضعیت مالی و عملکرد خیریه مکتب طه"
        actions={
          <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => navigate('/donations/create')}>
            ثبت کمک جدید
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard label="مجموع کمک‌های دریافتی" value={formatCompactCurrency(stats.totalDonations)} icon={<PaidRoundedIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard
            label="مجموع هزینه‌ها"
            value={formatCompactCurrency(stats.totalExpenses)}
            icon={<ReceiptLongRoundedIcon />}
            accent="#C68F2C"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard
            label="موجودی"
            value={formatCompactCurrency(stats.balance)}
            icon={<AccountBalanceWalletRoundedIcon />}
            accent="#2E6E8E"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard label="تعداد خیرین" value={formatNumber(stats.donorsCount)} icon={<VolunteerActivismRoundedIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard
            label="تعداد مددجویان"
            value={formatNumber(stats.beneficiariesCount)}
            icon={<GroupsRoundedIcon />}
            accent="#2E6E8E"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <StatCard
            label="پروژه‌های فعال"
            value={formatNumber(stats.activeProjectsCount)}
            icon={<FlagRoundedIcon />}
            accent="#C68F2C"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={7}>
          <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              روند کمک‌های دریافتی
            </Typography>
            <DonationsAreaChart data={data.donationsMonthly} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              انواع کمک‌ها
            </Typography>
            <DonationTypesDonut data={data.donationTypes} />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              روند هزینه‌ها
            </Typography>
            <ExpensesBarChart data={data.expensesMonthly} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              پیشرفت پروژه‌ها
            </Typography>
            <ProjectsProgressList data={data.projectsProgress} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper variant="outlined">
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5, pb: 1.5 }}>
              <Typography variant="h5">آخرین تراکنش‌ها</Typography>
              <Button size="small" onClick={() => navigate('/donations')}>
                مشاهده همه
              </Button>
            </Stack>
            <RecentTransactionsTable rows={data.recentTransactions} />
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
