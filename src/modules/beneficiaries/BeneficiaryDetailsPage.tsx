import { useParams, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import PageHeader from "@/components/common/PageHeader";
import AppAvatar from "@/components/common/AppAvatar";
import StatusChip from "@/components/common/StatusChip";
import EmptyState from "@/components/common/EmptyState";
import PageLoader from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { useAsyncData } from "@/hooks/useAsyncData";
import { getBeneficiaryById } from "@/api/mock/beneficiary.service";
import { formatCurrency } from "@/utils/currency";
import { formatPersianDate, formatPersianDateLong } from "@/utils/date";

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

export default function BeneficiaryDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: b,
    loading,
    error,
    reload,
  } = useAsyncData(() => getBeneficiaryById(id!), [id]);

  if (loading) return <PageLoader />;
  if (error || !b)
    return <ErrorState onRetry={reload} title="پرونده مورد نظر یافت نشد." />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title={`${b.firstName} ${b.lastName}`}
        breadcrumbs={[
          { label: "مددجویان", path: "/beneficiaries" },
          { label: `${b.firstName} ${b.lastName}` },
        ]}
        actions={
          <Button
            variant="outlined"
            startIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate("/beneficiaries")}
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
                  name={`${b.firstName} ${b.lastName}`}
                  color={b.avatarColor}
                  size={64}
                />
                <Typography variant="h5">
                  {b.firstName} {b.lastName}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <StatusChip label={b.caseStatus} />
                  <Chip
                    size="small"
                    variant="outlined"
                    label={b.economicStatus}
                  />
                </Stack>
              </Stack>
              <Divider sx={{ mb: 1 }} />
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                اطلاعات فردی
              </Typography>
              <InfoRow label="کد ملی" value={b.nationalId} />
              <InfoRow label="موبایل" value={b.mobile} />
              <InfoRow label="شهر" value={b.city} />
              <InfoRow label="آدرس" value={b.address} />
            </Paper>

            <Paper variant="outlined" sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                اطلاعات خانوار ({b.familyMembersCount} نفر)
              </Typography>
              {b.familyMembers.length === 0 ? (
                <Typography
                  variant="body2"
                  color="text.disabled"
                  sx={{ py: 1 }}
                >
                  عضوی ثبت نشده است.
                </Typography>
              ) : (
                b.familyMembers.map((m) => (
                  <InfoRow
                    key={m.id}
                    label={m.relation}
                    value={`${m.name} (${m.age} سال)`}
                  />
                ))
              )}
            </Paper>

            <Paper variant="outlined" sx={{ p: 2.5 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                مدارک
              </Typography>
              {b.documents.length === 0 ? (
                <Typography variant="body2" color="text.disabled">
                  مدرکی بارگذاری نشده است.
                </Typography>
              ) : (
                <Stack spacing={1}>
                  {b.documents.map((d) => (
                    <Stack
                      key={d.id}
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <DescriptionRoundedIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {d.title}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {formatPersianDate(d.uploadedAt)}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Paper>
          </Stack>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={2.5}>
            <Paper variant="outlined">
              <Stack sx={{ p: 2.5, pb: 1.5 }}>
                <Typography variant="h5">درخواست‌های کمک</Typography>
              </Stack>
              {b.aidRequests.length === 0 ? (
                <EmptyState title="درخواستی ثبت نشده است." />
              ) : (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>عنوان</TableCell>
                      <TableCell>مبلغ</TableCell>
                      <TableCell>تاریخ</TableCell>
                      <TableCell>وضعیت</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {b.aidRequests.map((r) => (
                      <TableRow key={r.id} hover>
                        <TableCell>{r.title}</TableCell>
                        <TableCell sx={{ fontVariantNumeric: "tabular-nums" }}>
                          {formatCurrency(r.amount)}
                        </TableCell>
                        <TableCell sx={{ fontVariantNumeric: "tabular-nums" }}>
                          {formatPersianDate(r.date)}
                        </TableCell>
                        <TableCell>
                          <StatusChip label={r.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>

            <Paper variant="outlined">
              <Stack sx={{ p: 2.5, pb: 1.5 }}>
                <Typography variant="h5">حمایت‌های دریافت‌شده</Typography>
              </Stack>
              {b.supportRecords.length === 0 ? (
                <EmptyState title="حمایتی ثبت نشده است." />
              ) : (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>عنوان</TableCell>
                      <TableCell>مبلغ</TableCell>
                      <TableCell>نوع</TableCell>
                      <TableCell>تاریخ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {b.supportRecords.map((r) => (
                      <TableRow key={r.id} hover>
                        <TableCell>{r.title}</TableCell>
                        <TableCell sx={{ fontVariantNumeric: "tabular-nums" }}>
                          {formatCurrency(r.amount)}
                        </TableCell>
                        <TableCell>{r.type}</TableCell>
                        <TableCell sx={{ fontVariantNumeric: "tabular-nums" }}>
                          {formatPersianDate(r.date)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </Paper>

            <Paper variant="outlined" sx={{ p: 2.5 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                تاریخچه پرونده
              </Typography>
              {b.caseHistory.length === 0 ? (
                <EmptyState title="رویدادی ثبت نشده است." />
              ) : (
                <Timeline sx={{ p: 0, m: 0 }}>
                  {b.caseHistory.map((h, i) => (
                    <TimelineItem key={h.id}>
                      <TimelineOppositeContent
                        sx={{ flex: 0.28 }}
                        color="text.secondary"
                        variant="caption"
                      >
                        {formatPersianDateLong(h.date)}
                      </TimelineOppositeContent>
                      <TimelineSeparator>
                        <TimelineDot
                          color="primary"
                          variant={i === 0 ? "filled" : "outlined"}
                        />
                        {i < b.caseHistory.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="body2" fontWeight={600}>
                          {h.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {h.description}
                        </Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              )}
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
