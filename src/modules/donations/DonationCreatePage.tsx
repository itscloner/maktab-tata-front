import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import AppSelect from "@/components/forms/AppSelect";
import AppDatePicker from "@/components/forms/AppDatePicker";
import AppTextField from "@/components/forms/AppTextField";
import MoneyInput from "@/components/common/MoneyInput";
import { useAsyncData } from "@/hooks/useAsyncData";
import { getDonors } from "@/api/mock/donor.service";
import { getProjects } from "@/api/mock/project.service";
import { getFunds } from "@/api/mock/fund.service";
import { createDonation } from "@/api/mock/donation.service";
import { useToastStore } from "@/stores/toastStore";
import { donationSchema, type DonationFormValues } from "./donationSchema";

const TYPES = [
  "نقدی",
  "کارت‌به‌کارت",
  "درگاه",
  "واریز بانکی",
  "غیرنقدی",
  "صدقه",
  "زکات",
  "نذر",
];

export default function DonationCreatePage() {
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.show);
  const { data: donors } = useAsyncData(getDonors);
  const { data: projects } = useAsyncData(getProjects);
  const { data: funds } = useAsyncData(getFunds);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donorId: "",
      amount: 0,
      type: "نقدی",
      date: new Date().toISOString(),
      projectId: "",
      fundId: "",
      description: "",
    },
  });

  const onSubmit = async (values: DonationFormValues) => {
    const normalizedProjectId = values.projectId || null;
    const project = projects?.find((p) => p.id === normalizedProjectId);
    const fund = funds?.find((f) => f.id === values.fundId);
    await createDonation({
      ...values,
      projectId: normalizedProjectId,
      projectName: project?.title ?? null,
      fundId: values.fundId,
      fundName: fund?.name ?? "",
    });
    showToast("کمک با موفقیت ثبت شد.");
    navigate("/donations");
  };

  return (
    <Stack spacing={3} sx={{ maxWidth: 760 }}>
      <PageHeader
        title="ثبت کمک جدید"
        breadcrumbs={[
          { label: "کمک‌ها", path: "/donations" },
          { label: "ثبت کمک جدید" },
        ]}
        actions={
          <Button
            variant="outlined"
            startIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate("/donations")}
          >
            بازگشت
          </Button>
        }
      />
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="donorId"
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  options={donors ?? []}
                  getOptionLabel={(o) => `${o.firstName} ${o.lastName}`}
                  onChange={(_, value) => field.onChange(value?.id ?? "")}
                  value={donors?.find((d) => d.id === field.value) ?? null}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="خیر"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState }) => (
                <MoneyInput
                  label="مبلغ"
                  value={field.value}
                  onChange={field.onChange}
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelect
              name="type"
              control={control}
              label="نوع کمک"
              options={TYPES.map((t) => ({ label: t, value: t }))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppDatePicker name="date" control={control} label="تاریخ" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelect
              name="projectId"
              control={control}
              label="پروژه (اختیاری)"
              options={[
                { label: "بدون پروژه", value: "" },
                ...(projects ?? []).map((p) => ({
                  label: p.title,
                  value: p.id,
                })),
              ]}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppSelect
              name="fundId"
              control={control}
              label="صندوق"
              options={(funds ?? []).map((f) => ({
                label: f.name,
                value: f.id,
              }))}
            />
          </Grid>
          <Grid item xs={12}>
            <AppTextField
              name="description"
              control={control}
              label="توضیحات (اختیاری)"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
              <Button color="inherit" onClick={() => navigate("/donations")}>
                انصراف
              </Button>
              <Button
                variant="contained"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting ? "در حال ثبت..." : "ثبت کمک"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
}
