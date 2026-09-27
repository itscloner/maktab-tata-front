import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/common/PageHeader";
import AppSelect from "@/components/forms/AppSelect";
import AppDatePicker from "@/components/forms/AppDatePicker";
import AppTextField from "@/components/forms/AppTextField";

import { useToastStore } from "@/stores/toastStore";

import { requestSchema, type RequestFormValues } from "./requestSchema";

import { useCreateRequestQuery } from "@/api/request/_hook";

import {
  useAreaListQuery,
  useHouseHeadStatusListQuery,
  useNationalityListQuery,
  useProvinceListQuery,
  useReligonListQuery,
  useRequestTypeListQuery,
} from "@/api/base/_hooks";

/* =========================================================
   Static Options
========================================================= */

const GENDERS = [
  {
    value: "مرد",
    label: "مرد",
  },
  {
    value: "زن",
    label: "زن",
  },
];

const CUSTODY_TYPES = [
  {
    value: 1,
    label: "دارای سرپرست",
  },
  {
    value: 2,
    label: "بدون سرپرست",
  },
  {
    value: 3,
    label: "زن سرپرست خانوار",
  },
  {
    value: 4,
    label: "سالمند بی‌سرپرست",
  },
];

const REQUEST_TYPES = [
  {
    value: 1,
    label: "نقدی",
  },
  {
    value: 2,
    label: "درمانی",
  },
  {
    value: 3,
    label: "تحصیلی",
  },
  {
    value: 4,
    label: "جهیزیه",
  },
  {
    value: 5,
    label: "مسکن",
  },
  {
    value: 6,
    label: "اطعام",
  },
  {
    value: 7,
    label: "سایر",
  },
];

const REFERERS = [
  {
    value: 1,
    label: "مراجعه حضوری",
  },
  {
    value: 2,
    label: "معرف",
  },
  {
    value: 3,
    label: "نهاد حمایتی",
  },
  {
    value: 4,
    label: "سایر",
  },
];

const CITIES = [
  {
    value: 1,
    label: "تهران",
  },
  {
    value: 2,
    label: "مشهد",
  },
  {
    value: 3,
    label: "اصفهان",
  },
  {
    value: 4,
    label: "شیراز",
  },
  {
    value: 5,
    label: "تبریز",
  },
  {
    value: 6,
    label: "اهواز",
  },
  {
    value: 7,
    label: "کرج",
  },
];

const AREAS = [
  {
    value: 1,
    label: "منطقه ۱",
  },
  {
    value: 2,
    label: "منطقه ۲",
  },
  {
    value: 3,
    label: "منطقه ۳",
  },
  {
    value: 4,
    label: "منطقه ۴",
  },
  {
    value: 5,
    label: "منطقه ۵",
  },
  {
    value: 6,
    label: "منطقه ۶",
  },
  {
    value: 7,
    label: "منطقه ۷",
  },
  {
    value: 8,
    label: "منطقه ۸",
  },
  {
    value: 9,
    label: "منطقه ۹",
  },
  {
    value: 10,
    label: "منطقه ۱۰",
  },
];

/* =========================================================
   Helpers
========================================================= */

const toOptions = (items?: { id: number; title: string }[] | null) =>
  (items ?? []).map((item) => ({
    value: item.id,
    label: item.title,
  }));

/* =========================================================
   Form Section
========================================================= */

function FormSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 3 },
          py: 2,

          display: "flex",
          alignItems: "center",

          gap: 1.5,

          backgroundColor: "grey.50",

          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,

            borderRadius: 2,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: "primary.50",
            color: "primary.main",

            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{
              lineHeight: 1.6,
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.2,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          p: {
            xs: 2,
            md: 3,
          },
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

/* =========================================================
   Page
========================================================= */

export default function RequestCreatePage() {
  const navigate = useNavigate();

  const showToast = useToastStore((state) => state.show);

  const createTools = useCreateRequestQuery();

  const provinceTools = useProvinceListQuery();
  const religonTools = useReligonListQuery();
  const nationalityTools = useNationalityListQuery();
  const areaTools = useAreaListQuery();
  const requestTypeTools = useRequestTypeListQuery();
  const houseHeadStatusTools = useHouseHeadStatusListQuery();

  /* =======================================================
     Dynamic Options
  ======================================================= */

  const provinceOptions = useMemo(
    () => toOptions(provinceTools.data?.data),
    [provinceTools.data?.data],
  );

  const nationalityOptions = useMemo(
    () => toOptions(nationalityTools.data?.data),
    [nationalityTools.data?.data],
  );

  const religionOptions = useMemo(
    () => toOptions(religonTools.data?.data),
    [religonTools.data?.data],
  );
  const areaOptions = useMemo(
    () => toOptions(areaTools.data?.data),
    [religonTools.data?.data],
  );
  const requestTypeOptions = useMemo(
    () => toOptions(requestTypeTools.data?.data),
    [religonTools.data?.data],
  );
  const houseHeadStatusOptions = useMemo(
    () => toOptions(houseHeadStatusTools.data?.data),
    [religonTools.data?.data],
  );

  /* =======================================================
     React Hook Form
  ======================================================= */

  const {
    control,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),

    defaultValues: {
      requestDate: new Date().toISOString(),

      requestDescription: "",

      requestTypeId: 1,

      clientFirstName: "",

      clientLastName: "",

      houseHeadStatusId: 1,

      gender: "مرد",

      refererId: 1,

      nationaltyId: 1,

      provinceId: 1,

      cityId: 1,

      address: "",

      mobileNumber: "",

      homeNumber: "",

      areaId: 1,

      religonId: 1,
    },
  });

  /* =======================================================
     Submit
  ======================================================= */

  const onSubmit = async (values: RequestFormValues) => {
    const payload: RequestFormValues = {
      requestDate: values.requestDate,

      requestDescription: values.requestDescription.trim(),

      requestTypeId: values.requestTypeId,

      clientFirstName: values.clientFirstName.trim(),

      clientLastName: values.clientLastName.trim(),

      houseHeadStatusId: values.houseHeadStatusId,

      gender: values.gender,

      refererId: values.refererId,

      nationaltyId: values.nationaltyId,

      provinceId: values.provinceId,

      cityId: values.cityId,

      address: values.address.trim(),

      mobileNumber: values.mobileNumber.trim(),

      homeNumber: values.homeNumber?.trim() || "",

      areaId: values.areaId,

      religonId: values.religonId,
    };

    console.log("CREATE REQUEST PAYLOAD:", payload);

    createTools.mutate(payload, {
      onSuccess: (response) => {
        console.log("CREATE REQUEST RESPONSE:", response);

        if (response?.isSuccedded) {
          showToast(response.message || "درخواست با موفقیت ثبت شد");

          navigate("/requests");
        }
      },

      onError: (error) => {
        console.error("CREATE REQUEST ERROR:", error);

        showToast("ثبت درخواست با خطا مواجه شد");
      },
    });
  };

  const isLoading = isSubmitting || createTools.isPending;

  /* =======================================================
     JSX
  ======================================================= */

  return (
    <Stack
      spacing={3}
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      {/* ===================================================
          Header
      =================================================== */}

      <PageHeader
        title="ثبت درخواست جدید"
        breadcrumbs={[
          {
            label: "درخواست‌ها",
            path: "/requests",
          },
          {
            label: "ثبت درخواست جدید",
          },
        ]}
        actions={
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate("/requests")}
            sx={{
              borderRadius: 2,
              px: 2,
            }}
          >
            بازگشت
          </Button>
        }
      />

      {/* ===================================================
          Intro
      =================================================== */}

      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,

          p: {
            xs: 2,
            md: 2.5,
          },

          background:
            "linear-gradient(135deg, rgba(25,118,210,0.06), rgba(25,118,210,0.015))",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              اطلاعات درخواست مددجو
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
              }}
            >
              اطلاعات مددجو، راه‌های ارتباطی و جزئیات درخواست را وارد کنید.
            </Typography>
          </Box>

          <Chip
            label="فرم جدید"
            color="primary"
            variant="outlined"
            sx={{
              borderRadius: 2,
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          />
        </Stack>
      </Paper>

      {/* ===================================================
          Form
      =================================================== */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          {/* =================================================
              Client Information
          ================================================= */}

          <FormSection
            icon={<PersonOutlineRoundedIcon />}
            title="اطلاعات مددجو"
            description="اطلاعات هویتی و مشخصات اصلی مددجو"
          >
            <Grid container spacing={2.5}>
              {/* First Name */}

              <Grid item xs={12} sm={6} md={4}>
                <AppTextField
                  name="clientFirstName"
                  control={control}
                  label="نام"
                  placeholder="نام مددجو"
                />
              </Grid>

              {/* Last Name */}

              <Grid item xs={12} sm={6} md={4}>
                <AppTextField
                  name="clientLastName"
                  control={control}
                  label="نام خانوادگی"
                  placeholder="نام خانوادگی مددجو"
                />
              </Grid>

              {/* Gender */}

              <Grid item xs={12} sm={6} md={4}>
                <AppSelect
                  name="gender"
                  control={control}
                  label="جنسیت"
                  options={GENDERS}
                />
              </Grid>

              {/* Custody */}

              <Grid item xs={12} sm={6} md={4}>
                <AppSelect
                  name="houseHeadStatusId"
                  control={control}
                  label="نوع سرپرستی"
                  options={houseHeadStatusOptions}
                />
              </Grid>

              {/* Nationality */}

              <Grid item xs={12} sm={6} md={4}>
                <AppSelect
                  name="nationaltyId"
                  control={control}
                  label="ملیت"
                  options={nationalityOptions}
                  disabled={nationalityTools.isLoading}
                />
              </Grid>

              {/* Religion */}

              <Grid item xs={12} sm={6} md={4}>
                <AppSelect
                  name="religonId"
                  control={control}
                  label="دین"
                  options={religionOptions}
                  disabled={religonTools.isLoading}
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* =================================================
              Contact Information
          ================================================= */}

          <FormSection
            icon={<LocationOnOutlinedIcon />}
            title="اطلاعات تماس و محل سکونت"
            description="اطلاعات محل زندگی و راه‌های ارتباطی مددجو"
          >
            <Grid container spacing={2.5}>
              {/* Province */}

              <Grid item xs={12} sm={6} md={4}>
                <AppSelect
                  name="provinceId"
                  control={control}
                  label="استان"
                  options={provinceOptions}
                  disabled={provinceTools.isLoading}
                />
              </Grid>

              {/* City */}

              <Grid item xs={12} sm={6} md={4}>
                <AppSelect
                  name="cityId"
                  control={control}
                  label="شهر"
                  options={provinceOptions}
                />
              </Grid>

              {/* Area */}

              <Grid item xs={12} sm={6} md={4}>
                <AppSelect
                  name="areaId"
                  control={control}
                  label="منطقه / محدوده"
                  options={areaOptions || []}
                />
              </Grid>

              {/* Mobile */}

              <Grid item xs={12} sm={6} md={4}>
                <AppTextField
                  name="mobileNumber"
                  control={control}
                  label="شماره همراه"
                  placeholder="09xxxxxxxxx"
                  inputProps={{
                    maxLength: 11,
                    inputMode: "numeric",
                  }}
                />
              </Grid>

              {/* Home Number */}

              <Grid item xs={12} sm={6} md={4}>
                <AppTextField
                  name="homeNumber"
                  control={control}
                  label="تلفن ثابت"
                  placeholder="شماره تلفن ثابت"
                  inputProps={{
                    inputMode: "numeric",
                  }}
                />
              </Grid>

              {/* Address */}

              <Grid item xs={12}>
                <AppTextField
                  name="address"
                  control={control}
                  label="آدرس"
                  placeholder="آدرس کامل محل سکونت"
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* =================================================
              Request Information
          ================================================= */}

          <FormSection
            icon={<VolunteerActivismOutlinedIcon />}
            title="اطلاعات درخواست"
            description="جزئیات مربوط به درخواست کمک"
          >
            <Grid container spacing={2.5}>
              {/* Request Date */}

              <Grid item xs={12} sm={6} md={4}>
                <AppDatePicker
                  name="requestDate"
                  control={control}
                  label="تاریخ درخواست"
                />
              </Grid>

              {/* Request Type */}

              <Grid item xs={12} sm={6} md={4}>
                <AppSelect
                  name="requestTypeId"
                  control={control}
                  label="نوع درخواست"
                  options={requestTypeOptions}
                />
              </Grid>

              {/* Referer */}

              <Grid item xs={12} sm={6} md={4}>
                <AppSelect
                  name="refererId"
                  control={control}
                  label="معرف"
                  options={REFERERS}
                />
              </Grid>

              {/* Description */}

              <Grid item xs={12}>
                <AppTextField
                  name="requestDescription"
                  control={control}
                  label="شرح درخواست"
                  placeholder="شرح کامل درخواست مددجو را وارد کنید..."
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* =================================================
              Actions
          ================================================= */}

          <Paper
            variant="outlined"
            sx={{
              position: "sticky",
              bottom: 16,
              zIndex: 10,

              borderRadius: 3,

              p: 1.5,

              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",

              backdropFilter: "blur(8px)",

              backgroundColor: "rgba(255,255,255,0.94)",
            }}
          >
            <Stack
              direction={{
                xs: "column-reverse",
                sm: "row",
              }}
              justifyContent="flex-start"
              spacing={1.5}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={<SaveOutlinedIcon />}
                sx={{
                  minWidth: 150,
                  borderRadius: 2,
                  py: 1.2,
                  fontWeight: 700,
                }}
              >
                {isLoading ? "در حال ثبت..." : "ثبت درخواست"}
              </Button>

              <Button
                type="button"
                color="inherit"
                variant="outlined"
                disabled={isLoading}
                onClick={() => navigate("/requests")}
                sx={{
                  minWidth: 110,
                  borderRadius: 2,
                  py: 1.2,
                }}
              >
                انصراف
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </form>
    </Stack>
  );
}
