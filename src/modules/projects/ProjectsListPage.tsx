import { useState } from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Divider from "@mui/material/Divider";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { alpha } from "@mui/material/styles";
import PageHeader from "@/components/common/PageHeader";
import PageLoader from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";
import { useAsyncData } from "@/hooks/useAsyncData";
import { getProjects } from "@/api/mock/project.service";
import { formatCurrency } from "@/utils/currency";
import { formatPersianDate } from "@/utils/date";
import StatusChip from "@/components/common/StatusChip";
import { usePermission } from "@/permissions/permission.hooks";

export default function ProjectsListPage() {
  const { data: projects, loading, error, reload } = useAsyncData(getProjects);
  const [addOpen, setAddOpen] = useState(false);
  const canCreate = usePermission("projects.create");

  if (loading) return <PageLoader />;
  if (error) return <ErrorState onRetry={reload} />;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="پروژه‌ها"
        description="مدیریت پروژه‌های در حال اجرا و تکمیل‌شده خیریه"
        actions={
          canCreate ? (
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => setAddOpen(true)}
            >
              پروژه جدید
            </Button>
          ) : undefined
        }
      />
      {!projects || projects.length === 0 ? (
        <EmptyState title="هنوز پروژه‌ای تعریف نشده است." />
      ) : (
        <Grid container spacing={2.5}>
          {projects.map((p) => {
            const progress = Math.min(
              100,
              Math.round((p.raisedAmount / p.budget) * 100),
            );
            const remaining = p.budget - p.spentAmount;
            return (
              <Grid item xs={12} md={6} key={p.id}>
                <Paper variant="outlined" sx={{ p: 2.5, height: "100%" }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="h5">{p.title}</Typography>
                    <StatusChip label={p.status} />
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {p.description}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    sx={{ mb: 0.75 }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      پیشرفت جمع‌آوری
                    </Typography>
                    <Typography variant="caption" fontWeight={700}>
                      {progress}٪
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      mb: 2,
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.12),
                      "& .MuiLinearProgress-bar": { borderRadius: 4 },
                    }}
                  />
                  <Divider sx={{ mb: 1.5 }} />
                  <Grid container spacing={1.5}>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary">
                        بودجه
                      </Typography>
                      <Typography variant="body2" fontWeight={700}>
                        {formatCurrency(p.budget, false)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary">
                        جمع‌آوری‌شده
                      </Typography>
                      <Typography variant="body2" fontWeight={700}>
                        {formatCurrency(p.raisedAmount, false)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary">
                        هزینه‌شده
                      </Typography>
                      <Typography variant="body2" fontWeight={700}>
                        {formatCurrency(p.spentAmount, false)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Typography variant="caption" color="text.secondary">
                        مانده
                      </Typography>
                      <Typography variant="body2" fontWeight={700}>
                        {formatCurrency(remaining, false)}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Chip
                      size="small"
                      variant="outlined"
                      label={`شروع: ${formatPersianDate(p.startDate)}`}
                    />
                    <Chip
                      size="small"
                      variant="outlined"
                      label={`پایان: ${formatPersianDate(p.endDate)}`}
                    />
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Stack>
  );
}
