import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import { alpha } from '@mui/material/styles';
import PageHeader from '@/components/common/PageHeader';
import PageLoader from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getFunds } from '@/services/mock/fund.service';
import { formatCurrency, formatNumber } from '@/utils/currency';

export default function FundsListPage() {
  const { data: funds, loading, error, reload } = useAsyncData(getFunds);
  if (loading) return <PageLoader />;
  if (error) return <ErrorState onRetry={reload} />;

  return (
    <Stack spacing={3}>
      <PageHeader title="صندوق‌ها" description="مدیریت موجودی و گردش مالی صندوق‌های خیریه" />
      <Grid container spacing={2.5}>
        {(funds ?? []).map((f) => (
          <Grid item xs={12} sm={6} md={4} key={f.id}>
            <Paper variant="outlined" sx={{ p: 2.5, height: '100%' }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                <Box sx={{ width: 40, height: 40, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: (t) => alpha(t.palette.primary.main, 0.12), color: 'primary.main' }}>
                  <SavingsRoundedIcon />
                </Box>
                <Stack>
                  <Typography variant="subtitle1">{f.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{f.description}</Typography>
                </Stack>
              </Stack>
              <Typography variant="h3" sx={{ mb: 2 }}>{formatCurrency(f.balance)}</Typography>
              <Divider sx={{ mb: 1.5 }} />
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                  <Typography variant="caption" color="text.secondary">ورودی</Typography>
                  <Typography variant="body2" fontWeight={700} color="success.main">{formatCurrency(f.totalIn, false)}</Typography>
                </Stack>
                <Stack>
                  <Typography variant="caption" color="text.secondary">خروجی</Typography>
                  <Typography variant="body2" fontWeight={700} color="error.main">{formatCurrency(f.totalOut, false)}</Typography>
                </Stack>
                <Stack>
                  <Typography variant="caption" color="text.secondary">تعداد تراکنش</Typography>
                  <Typography variant="body2" fontWeight={700}>{formatNumber(f.transactionsCount)}</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
