import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import PageHeader from '@/components/common/PageHeader';
import PageLoader from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getDashboardData } from '@/services/mock/dashboard.service';
import { getDonors } from '@/services/mock/donor.service';
import { getBeneficiaries } from '@/services/mock/beneficiary.service';
import { getProjects } from '@/services/mock/project.service';
import { formatCurrency } from '@/utils/currency';
import { useToastStore } from '@/stores/toastStore';

function ReportRow({ label, value }: { label: string; value: string }) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 1.1 }}>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body2" fontWeight={700}>{value}</Typography>
    </Stack>
  );
}

export default function ReportsPage() {
  const { data: dashboard, loading, error, reload } = useAsyncData(getDashboardData);
  const { data: donors } = useAsyncData(getDonors);
  const { data: beneficiaries } = useAsyncData(getBeneficiaries);
  const { data: projects } = useAsyncData(getProjects);
  const [projectFilter, setProjectFilter] = useState('all');
  const showToast = useToastStore((s) => s.show);

  if (loading) return <PageLoader />;
  if (error || !dashboard) return <ErrorState onRetry={reload} />;

  const topDonor = [...(donors ?? [])].sort((a, b) => b.totalDonationsAmount - a.totalDonationsAmount)[0];

  return (
    <Stack spacing={3}>
      <PageHeader
        title="گزارش‌ها"
        description="گزارش‌های مالی، خیرین، مددجویان و پروژه‌ها"
        actions={
          <Button
            variant="contained"
            startIcon={<DownloadRoundedIcon />}
            onClick={() => showToast('گزارش (نمونه) دانلود شد.', 'info')}
          >
            خروجی گزارش
          </Button>
        }
      />

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <TextField size="small" type="date" label="از تاریخ" InputLabelProps={{ shrink: true }} sx={{ width: 170 }} />
          <TextField size="small" type="date" label="تا تاریخ" InputLabelProps={{ shrink: true }} sx={{ width: 170 }} />
          <TextField
            size="small"
            select
            label="پروژه"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            sx={{ width: 200 }}
          >
            <MenuItem value="all">همه پروژه‌ها</MenuItem>
            {(projects ?? []).map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.title}</MenuItem>
            ))}
          </TextField>
          <TextField size="small" select label="نوع کمک" defaultValue="all" sx={{ width: 160 }}>
            <MenuItem value="all">همه انواع</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>گزارش مالی</Typography>
            <ReportRow label="درآمد" value={formatCurrency(dashboard.stats.totalDonations)} />
            <ReportRow label="هزینه" value={formatCurrency(dashboard.stats.totalExpenses)} />
            <ReportRow label="موجودی" value={formatCurrency(dashboard.stats.balance)} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>گزارش خیرین</Typography>
            <ReportRow label="تعداد خیرین" value={String(donors?.length ?? 0)} />
            <ReportRow label="بیشترین خیر" value={topDonor ? `${topDonor.firstName} ${topDonor.lastName}` : '—'} />
            <ReportRow label="بیشترین مبلغ کمک" value={topDonor ? formatCurrency(topDonor.totalDonationsAmount) : '—'} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>گزارش مددجویان</Typography>
            <ReportRow label="تعداد مددجویان" value={String(beneficiaries?.length ?? 0)} />
            <ReportRow
              label="میزان حمایت (نمونه)"
              value={formatCurrency((beneficiaries ?? []).reduce((sum, b) => sum + b.supportRecords.reduce((s, r) => s + r.amount, 0), 0))}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>گزارش پروژه‌ها</Typography>
            <ReportRow label="بودجه کل" value={formatCurrency((projects ?? []).reduce((s, p) => s + p.budget, 0))} />
            <ReportRow label="کمک دریافت‌شده" value={formatCurrency((projects ?? []).reduce((s, p) => s + p.raisedAmount, 0))} />
            <ReportRow label="هزینه‌شده" value={formatCurrency((projects ?? []).reduce((s, p) => s + p.spentAmount, 0))} />
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
