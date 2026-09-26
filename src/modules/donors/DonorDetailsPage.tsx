import { useParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PageHeader from "@/components/common/PageHeader";
import AppAvatar from "@/components/common/AppAvatar";
import StatusChip from "@/components/common/StatusChip";
import EmptyState from "@/components/common/EmptyState";
import PageLoader from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useAsyncData } from "@/hooks/useAsyncData";
import { getDonorById } from "@/api/mock/donor.service";
import { getDonations } from "@/api/mock/donation.service";
import { formatCurrency } from "@/utils/currency";
import { formatPersianDate } from "@/utils/date";
import { useMemo } from "react";

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

export default function DonorDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: donor,
    loading,
    error,
    reload,
  } = useAsyncData(() => getDonorById(id!), [id]);
  const { data: donations } = useAsyncData(getDonations);

  const donorDonations = useMemo(
    () =>
      (donations ?? [])
        .filter((d) => d.donorId === id)
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
    [donations, id],
  );

  if (loading) return <PageLoader />;
  if (error || !donor)
    return <ErrorState onRetry={reload} title="خیر مورد نظر یافت نشد." />;

  const average = donor.donationsCount
    ? Math.round(donor.totalDonationsAmount / donor.donationsCount)
    : 0;

  return (
    <Stack spacing={3}>
      <PageHeader
        title={`${donor.firstName} ${donor.lastName}`}
        breadcrumbs={[
          { label: "خیرین", path: "/donors" },
          { label: `${donor.firstName} ${donor.lastName}` },
        ]}
        actions={
          <Button
            variant="outlined"
            startIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate("/donors")}
          >
            بازگشت به لیست
          </Button>
        }
      />

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <Stack spacing={2.5}>
            <Paper variant="outlined" sx={{ p: 2.5 }}>
              <Stack alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <AppAvatar
                  name={`${donor.firstName} ${donor.lastName}`}
                  color={donor.avatarColor}
                  size={64}
                />
                <Typography variant="h5">
                  {donor.firstName} {donor.lastName}
                </Typography>
                <StatusChip label={donor.status} />
              </Stack>
              <Divider sx={{ mb: 1 }} />
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                اطلاعات شخصی
              </Typography>
              <InfoRow label="کد ملی" value={donor.nationalId} />
              <InfoRow label="موبایل" value={donor.mobile} />
              <InfoRow label="تلفن" value={donor.phone ?? ""} />
              <InfoRow label="شهر" value={donor.city} />
              <InfoRow label="آدرس" value={donor.address ?? ""} />
            </Paper>

            <Paper variant="outlined" sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                خلاصه مالی
              </Typography>
              <InfoRow
                label="مجموع کمک"
                value={formatCurrency(donor.totalDonationsAmount)}
              />
              <InfoRow label="تعداد کمک" value={String(donor.donationsCount)} />
              <InfoRow label="میانگین کمک" value={formatCurrency(average)} />
              <InfoRow
                label="آخرین کمک"
                value={
                  donor.lastDonationDate
                    ? formatPersianDate(donor.lastDonationDate)
                    : "—"
                }
              />
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper variant="outlined">
            <Stack sx={{ p: 2.5, pb: 1.5 }}>
              <Typography variant="h5">تاریخچه کمک‌ها</Typography>
            </Stack>
            {donorDonations.length === 0 ? (
              <EmptyState title="کمکی برای این خیر ثبت نشده است." />
            ) : (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>شماره تراکنش</TableCell>
                    <TableCell>مبلغ</TableCell>
                    <TableCell>نوع</TableCell>
                    <TableCell>پروژه</TableCell>
                    <TableCell>تاریخ</TableCell>
                    <TableCell>وضعیت</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donorDonations.map((d) => (
                    <TableRow key={d.id} hover>
                      <TableCell>{d.transactionNumber}</TableCell>
                      <TableCell sx={{ fontVariantNumeric: "tabular-nums" }}>
                        {formatCurrency(d.amount)}
                      </TableCell>
                      <TableCell>{d.type}</TableCell>
                      <TableCell>{d.projectName ?? "—"}</TableCell>
                      <TableCell sx={{ fontVariantNumeric: "tabular-nums" }}>
                        {formatPersianDate(d.date)}
                      </TableCell>
                      <TableCell>
                        <StatusChip label={d.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Stack>
  );
}
