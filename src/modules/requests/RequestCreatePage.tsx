import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
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
const GENDERS = ["مرد", "زن"];
const CUSTODY_TYPES = [
  "دارای سرپرست",
  "بدون سرپرست",
  "زن سرپرست خانوار",
  "سالمند بی‌سرپرست",
];
const NATIONALITIES = ["ایرانی", "افغان", "عراقی", "سایر"];
const RELIGIONS = ["اسلام", "مسیحیت", "کلیمی", "زرتشتی", "سایر"];
const PROVINCES = [
  "تهران",
  "خراسان رضوی",
  "اصفهان",
  "فارس",
  "آذربایجان شرقی",
  "خوزستان",
  "البرز",
];
const AID_TYPES = [
  "نقدی",
  "درمانی",
  "تحصیلی",
  "جهیزیه",
  "مسکن",
  "اطعام",
  "سایر",
];
const toOptions = (values: string[]) =>
  values.map((value) => ({ label: value, value }));
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
      {" "}
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
        {" "}
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
          {" "}
          {icon}{" "}
        </Box>{" "}
        <Box>
          {" "}
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ lineHeight: 1.6 }}
          >
            {" "}
            {title}{" "}
          </Typography>{" "}
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.2 }}>
              {" "}
              {description}{" "}
            </Typography>
          )}{" "}
        </Box>{" "}
      </Box>{" "}
      <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>{" "}
    </Paper>
  );
}
export default function RequestCreatePage() {
  const navigate = useNavigate();
  const showToast = useToastStore((s) => s.show);
  const createTools = useCreateRequestQuery();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      requestDate: new Date().toISOString(),
      nationalId: "",
      firstName: "",
      lastName: "",
      gender: "مرد",
      custodyType: "دارای سرپرست",
      nationality: "ایرانی",
      religion: "اسلام",
      province: "",
      city: "",
      district: "",
      address: "",
      mobile: "",
      phone: "",
      aidType: "نقدی",
      requestDescription: "",
      referrer: "",
    },
  });
  const onSubmit = async (values: RequestFormValues) => {
    const formData = {
      requestDate: values.requestDate || "",
      requestDescription: values.requestDescription || "",
      requestTypeId: 1,
      clientFirstName: values.firstName || "",
      clientLastName: values.lastName || "",
      houseHeadStatusId: 1,
      gender: values.gender || "مرد",
      refererId: 1,
      nationaltyId: 1,
      provinceId: 1,
      cityId: 1,
      address: values.address || "",
      mobileNumber: values.mobile || "",
      homeNumber: values.phone || "",
      areaId: 1,
      religonId: 1,
    };
    createTools.mutate(formData, {
      onSuccess: (response) => {
        console.log(response);
        if (response.isSuccedded) {
          showToast(response.message);
          navigate("/requests");
        }
      },
    });
  };
  return (
    <Stack spacing={3} sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
      {" "}
      {/* Page Header */}{" "}
      <PageHeader
        title="ثبت درخواست جدید"
        breadcrumbs={[
          { label: "درخواست‌ها", path: "/requests" },
          { label: "ثبت درخواست جدید" },
        ]}
        actions={
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<ArrowForwardRoundedIcon />}
            onClick={() => navigate("/requests")}
            sx={{ borderRadius: 2, px: 2 }}
          >
            {" "}
            بازگشت{" "}
          </Button>
        }
      />{" "}
      {/* Intro */}{" "}
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 3,
          p: { xs: 2, md: 2.5 },
          background:
            "linear-gradient(135deg, rgba(25,118,210,0.06), rgba(25,118,210,0.015))",
        }}
      >
        {" "}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={2}
        >
          {" "}
          <Box>
            {" "}
            <Typography variant="h6" fontWeight={700}>
              {" "}
              اطلاعات درخواست مددجو{" "}
            </Typography>{" "}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {" "}
              اطلاعات مددجو، راه‌های ارتباطی و جزئیات درخواست را وارد کنید.{" "}
            </Typography>{" "}
          </Box>{" "}
          <Chip
            label="فرم جدید"
            color="primary"
            variant="outlined"
            sx={{ borderRadius: 2, display: { xs: "none", sm: "flex" } }}
          />{" "}
        </Stack>{" "}
      </Paper>{" "}
      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <Stack spacing={2.5}>
          {" "}
          {/* Client Information */}{" "}
          <FormSection
            icon={<PersonOutlineRoundedIcon />}
            title="اطلاعات مددجو"
            description="اطلاعات هویتی و مشخصات اصلی مددجو"
          >
            {" "}
            <Grid container spacing={2.5}>
              {" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppTextField
                  name="nationalId"
                  control={control}
                  label="کد ملی"
                  placeholder="کد ملی را وارد کنید"
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppTextField
                  name="firstName"
                  control={control}
                  label="نام"
                  placeholder="نام مددجو"
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppTextField
                  name="lastName"
                  control={control}
                  label="نام خانوادگی"
                  placeholder="نام خانوادگی مددجو"
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppSelect
                  name="gender"
                  control={control}
                  label="جنسیت"
                  options={toOptions(GENDERS)}
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppSelect
                  name="custodyType"
                  control={control}
                  label="نوع سرپرستی"
                  options={toOptions(CUSTODY_TYPES)}
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppSelect
                  name="nationality"
                  control={control}
                  label="ملیت"
                  options={toOptions(NATIONALITIES)}
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppSelect
                  name="religion"
                  control={control}
                  label="دین"
                  options={toOptions(RELIGIONS)}
                />{" "}
              </Grid>{" "}
            </Grid>{" "}
          </FormSection>{" "}
          {/* Contact Information */}{" "}
          <FormSection
            icon={<LocationOnOutlinedIcon />}
            title="اطلاعات تماس و محل سکونت"
            description="اطلاعات محل زندگی و راه‌های ارتباطی مددجو"
          >
            {" "}
            <Grid container spacing={2.5}>
              {" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppSelect
                  name="province"
                  control={control}
                  label="استان"
                  options={toOptions(PROVINCES)}
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppTextField
                  name="city"
                  control={control}
                  label="شهر"
                  placeholder="نام شهر"
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppTextField
                  name="district"
                  control={control}
                  label="محدوده / منطقه"
                  placeholder="منطقه یا محدوده"
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppTextField
                  name="mobile"
                  control={control}
                  label="شماره همراه"
                  placeholder="09xxxxxxxxx"
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppTextField
                  name="phone"
                  control={control}
                  label="تلفن ثابت"
                  placeholder="شماره تلفن ثابت"
                />{" "}
              </Grid>{" "}
              <Grid item xs={12}>
                {" "}
                <AppTextField
                  name="address"
                  control={control}
                  label="آدرس"
                  placeholder="آدرس کامل محل سکونت"
                  multiline
                  rows={3}
                />{" "}
              </Grid>{" "}
            </Grid>{" "}
          </FormSection>{" "}
          {/* Request Information */}{" "}
          <FormSection
            icon={<VolunteerActivismOutlinedIcon />}
            title="اطلاعات درخواست"
            description="جزئیات مربوط به درخواست کمک"
          >
            {" "}
            <Grid container spacing={2.5}>
              {" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppDatePicker
                  name="requestDate"
                  control={control}
                  label="تاریخ درخواست"
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppSelect
                  name="aidType"
                  control={control}
                  label="نوع کمک درخواستی"
                  options={toOptions(AID_TYPES)}
                />{" "}
              </Grid>{" "}
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                <AppTextField
                  name="referrer"
                  control={control}
                  label="معرف"
                  placeholder="نام معرف"
                />{" "}
              </Grid>{" "}
              <Grid item xs={12}>
                {" "}
                <AppTextField
                  name="requestDescription"
                  control={control}
                  label="شرح درخواست"
                  placeholder="شرح کامل درخواست مددجو را وارد کنید..."
                  multiline
                  rows={4}
                />{" "}
              </Grid>{" "}
            </Grid>{" "}
          </FormSection>{" "}
          {/* Actions */}{" "}
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
            {" "}
            <Stack
              direction={{ xs: "column-reverse", sm: "row" }}
              justifyContent="flex-start"
              spacing={1.5}
            >
              {" "}
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting || createTools.isPending}
                startIcon={<SaveOutlinedIcon />}
                sx={{
                  minWidth: 150,
                  borderRadius: 2,
                  py: 1.2,
                  fontWeight: 700,
                }}
              >
                {" "}
                {isSubmitting || createTools.isPending
                  ? "در حال ثبت..."
                  : "ثبت درخواست"}{" "}
              </Button>{" "}
              <Button
                type="button"
                color="inherit"
                variant="outlined"
                onClick={() => navigate("/requests")}
                sx={{ minWidth: 110, borderRadius: 2, py: 1.2 }}
              >
                {" "}
                انصراف{" "}
              </Button>{" "}
            </Stack>{" "}
          </Paper>{" "}
        </Stack>{" "}
      </form>{" "}
    </Stack>
  );
}
