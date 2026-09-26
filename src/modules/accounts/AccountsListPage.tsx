import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { alpha } from "@mui/material/styles";
import PageHeader from "@/components/common/PageHeader";
import PageLoader from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useAsyncData } from "@/hooks/useAsyncData";
import { getAccounts } from "@/api/mock/account.service";
import { formatCurrency, formatNumber } from "@/utils/currency";

export default function AccountsListPage() {
  const { data: accounts, loading, error, reload } = useAsyncData(getAccounts);
  if (loading) return <PageLoader />;
  if (error) return <ErrorState onRetry={reload} />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="حساب‌های مالی"
        description="مدیریت حساب‌های بانکی، کارت‌ها و صندوق‌های نقدی"
      />
      <Grid container spacing={2.5}>
        {(accounts ?? []).map((a) => (
          <Grid item xs={12} sm={6} md={4} key={a.id}>
            <Paper variant="outlined" sx={{ p: 2.5, height: "100%" }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                sx={{ mb: 1.5 }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: (t) => alpha(t.palette.secondary.main, 0.16),
                    color: "secondary.dark",
                  }}
                >
                  <AccountBalanceRoundedIcon />
                </Box>
                <Stack sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle1" noWrap>
                    {a.title}
                  </Typography>
                  <Chip
                    size="small"
                    label={a.type}
                    sx={{ width: "fit-content" }}
                  />
                </Stack>
              </Stack>
              <Typography variant="h3" sx={{ mb: 1 }}>
                {formatCurrency(a.balance)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {a.number}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Stack direction="row" justifyContent="space-between">
                <Stack>
                  <Typography variant="caption" color="text.secondary">
                    ورودی
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="success.main"
                  >
                    {formatCurrency(a.totalIn, false)}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="caption" color="text.secondary">
                    خروجی
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="error.main"
                  >
                    {formatCurrency(a.totalOut, false)}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography variant="caption" color="text.secondary">
                    تراکنش‌ها
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {formatNumber(a.transactionsCount)}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
