import { useMemo, useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import type { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import SearchInput from "@/components/common/SearchInput";
import AppDataGrid from "@/components/tables/AppDataGrid";
import { TableSkeleton } from "@/components/common/LoadingState";
import ErrorState from "@/components/common/ErrorState";
import { formatPersianDate } from "@/utils/date";
import { usePermission } from "@/permissions/permission.hooks";
import { useFecthRequests } from "@/api/request/_hook";
/* -------------------------------------------------------------------------- */ /* Types */ /* -------------------------------------------------------------------------- */ export interface RequestItem {
  requestNumber: string;
  requestDate: string;
  requestDescription: string;
  requestTypeId: number;
  clientFirstName: string;
  clientLastName: string;
  houseHeadStatusId: number;
  gender: string;
  refererId: number;
  nationaltyId: number;
  provinceId: number;
  cityId: number;
  address: string;
  mobileNumber: string;
  homeNumber: string;
  areaId: number;
  religonId: number;
}
/* -------------------------------------------------------------------------- */ /* Constants */ /* -------------------------------------------------------------------------- */ const GENDER_LABELS: Record<
  string,
  string
> = { مرد: "مرد", زن: "زن" };
const HOUSE_HEAD_STATUS: Record<number, string> = {
  1: "دارای سرپرست",
  2: "بدون سرپرست",
  3: "زن سرپرست خانوار",
  4: "سالمند بی‌سرپرست",
};
const REQUEST_TYPE_LABELS: Record<number, string> = {
  1: "نقدی",
  2: "درمانی",
  3: "تحصیلی",
  4: "جهیزیه",
  5: "مسکن",
  6: "اطعام",
  7: "سایر",
};
const PROVINCE_LABELS: Record<number, string> = {
  1: "تهران",
  2: "خراسان رضوی",
  3: "اصفهان",
  4: "فارس",
  5: "آذربایجان شرقی",
  6: "خوزستان",
  7: "البرز",
};
/* -------------------------------------------------------------------------- */ /* Helper Functions */ /* -------------------------------------------------------------------------- */ const getFullName =
  (request: RequestItem) => {
    return `${request.clientFirstName ?? ""} ${request.clientLastName ?? ""}`.trim();
  };
const getRequestType = (id: number) => {
  return REQUEST_TYPE_LABELS[id] ?? `نوع ${id}`;
};
const getHouseHeadStatus = (id: number) => {
  return HOUSE_HEAD_STATUS[id] ?? `شناسه ${id}`;
};
const getProvince = (id: number) => {
  return PROVINCE_LABELS[id] ?? `استان ${id}`;
};
/* -------------------------------------------------------------------------- */ /* Component */ /* -------------------------------------------------------------------------- */ export default function RequestsListPage() {
  const navigate = useNavigate();
  const fetchTools = useFecthRequests();
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [requestTypeFilter, setRequestTypeFilter] = useState("all");
  const canCreate = usePermission("requests.create");
  /* * API response: * * { * data: [...] * } * * بنابراین اطلاعات اصلی جدول از data می‌آید. */ const rows =
    useMemo<RequestItem[]>(() => {
      return (fetchTools.data?.data ?? []) as RequestItem[];
    }, [fetchTools.data?.data]);
  /* ------------------------------------------------------------------------ */ /* Filter */ /* ------------------------------------------------------------------------ */ const filteredRows =
    useMemo(() => {
      const normalizedSearch = search.trim().toLowerCase();
      return rows.filter((request) => {
        const fullName = getFullName(request);
        const matchesSearch =
          !normalizedSearch ||
          fullName.toLowerCase().includes(normalizedSearch) ||
          request.requestNumber
            ?.toString()
            .toLowerCase()
            .includes(normalizedSearch) ||
          request.mobileNumber?.toString().includes(normalizedSearch) ||
          request.homeNumber?.toString().includes(normalizedSearch) ||
          request.address?.toLowerCase().includes(normalizedSearch);
        const matchesGender =
          genderFilter === "all" || request.gender === genderFilter;
        const matchesRequestType =
          requestTypeFilter === "all" ||
          request.requestTypeId?.toString() === requestTypeFilter;
        return matchesSearch && matchesGender && matchesRequestType;
      });
    }, [rows, search, genderFilter, requestTypeFilter]);
  /* ------------------------------------------------------------------------ */ /* Columns */ /* ------------------------------------------------------------------------ */ const columns: GridColDef<RequestItem>[] =
    [
      {
        field: "requestNumber",
        headerName: "شماره درخواست",
        width: 155,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Typography
            variant="body2"
            fontWeight={700}
            sx={{ direction: "ltr", fontFamily: "monospace" }}
          >
            {" "}
            {params.row.requestNumber || "-"}{" "}
          </Typography>
        ),
      },
      {
        field: "clientName",
        headerName: "مددجو",
        flex: 1,
        minWidth: 190,
        sortable: false,
        renderCell: (params) => {
          const fullName = getFullName(params.row);
          return (
            <Stack justifyContent="center" sx={{ height: "100%", minWidth: 0 }}>
              {" "}
              <Typography variant="body2" fontWeight={700} noWrap>
                {" "}
                {fullName || "بدون نام"}{" "}
              </Typography>{" "}
              {/* <Typography
                variant="caption"
                color="text.secondary"
                noWrap
                sx={{ direction: "ltr", textAlign: "right" }}
              >
                {" "}
                {params.row.mobileNumber || "شماره ثبت نشده"}{" "}
              </Typography>{" "} */}
            </Stack>
          );
        },
      },
      {
        field: "requestDate",
        headerName: "تاریخ درخواست",
        width: 140,
        renderCell: (params) => (
          <Typography variant="body2">
            {" "}
            {params.row.requestDate
              ? formatPersianDate(params.row.requestDate)
              : "-"}{" "}
          </Typography>
        ),
      },
      {
        field: "requestTypeId",
        headerName: "نوع درخواست",
        width: 135,
        renderCell: (params) => (
          <Chip
            size="small"
            label={getRequestType(params.row.requestTypeId)}
            variant="outlined"
            sx={{ borderRadius: 1.5 }}
          />
        ),
      },
      {
        field: "houseHeadStatusId",
        headerName: "وضعیت سرپرستی",
        width: 160,
        renderCell: (params) => (
          <Typography variant="body2" noWrap>
            {" "}
            {getHouseHeadStatus(params.row.houseHeadStatusId)}{" "}
          </Typography>
        ),
      },
      {
        field: "gender",
        headerName: "جنسیت",
        width: 95,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Chip
            size="small"
            label={GENDER_LABELS[params.row.gender] ?? params.row.gender ?? "-"}
            sx={{ borderRadius: 1.5 }}
          />
        ),
      },
      {
        field: "location",
        headerName: "محل سکونت",
        flex: 0.8,
        minWidth: 150,
        sortable: false,
        renderCell: (params) => (
          <Stack justifyContent="center" sx={{ height: "100%", minWidth: 0 }}>
            {" "}
            <Typography variant="body2" noWrap>
              {" "}
              {getProvince(params.row.provinceId)}{" "}
            </Typography>{" "}
            <Typography variant="caption" color="text.secondary" noWrap>
              {" "}
              شهر: {params.row.cityId ?? "-"}{" "}
            </Typography>{" "}
          </Stack>
        ),
      },
      {
        field: "mobileNumber",
        headerName: "شماره همراه",
        width: 145,
        renderCell: (params) => (
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {" "}
            <PhoneOutlinedIcon
              sx={{ fontSize: 17, color: "text.secondary" }}
            />{" "}
            <Typography
              variant="body2"
              sx={{ direction: "ltr", fontFamily: "monospace" }}
            >
              {" "}
              {params.row.mobileNumber || "-"}{" "}
            </Typography>{" "}
          </Stack>
        ),
      },
      {
        field: "actions",
        headerName: "عملیات",
        width: 90,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        // renderCell: (params) => (
        //   <Tooltip title="مشاهده درخواست">
        //     {" "}
        //     <IconButton
        //       size="small"
        //       onClick={(event) => {
        //         event.stopPropagation();
        //         navigate(`/requests/${params.row.requestNumber}`);
        //       }}
        //       sx={{
        //         border: "1px solid",
        //         borderColor: "divider",
        //         borderRadius: 1.5,
        //         "&:hover": { backgroundColor: "action.hover" },
        //       }}
        //     >
        //       {" "}
        //       <VisibilityRoundedIcon fontSize="small" />{" "}
        //     </IconButton>{" "}
        //   </Tooltip>
        // ),
      },
    ];
  /* ------------------------------------------------------------------------ */ /* Loading */ /* ------------------------------------------------------------------------ */ if (
    fetchTools.isPending
  ) {
    return <TableSkeleton rows={8} />;
  }
  /* ------------------------------------------------------------------------ */ /* Error */ /* ------------------------------------------------------------------------ */ if (
    fetchTools.isError
  ) {
    return <ErrorState onRetry={() => fetchTools.refetch()} />;
  }
  /* ------------------------------------------------------------------------ */ /* View */ /* ------------------------------------------------------------------------ */ return (
    <Stack spacing={3}>
      {" "}
      {/* ------------------------------------------------------------------ */}{" "}
      {/* Header */}{" "}
      {/* ------------------------------------------------------------------ */}{" "}
      <PageHeader
        title="درخواست‌ها"
        description="مدیریت و بررسی درخواست‌های مددجویان"
        actions={
          canCreate ? (
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => navigate("/requests/create")}
              sx={{ borderRadius: 2, px: 2.5 }}
            >
              {" "}
              ثبت درخواست جدید{" "}
            </Button>
          ) : undefined
        }
      />{" "}
      {/* ------------------------------------------------------------------ */}{" "}
      {/* Filters */}{" "}
      {/* ------------------------------------------------------------------ */}{" "}
      <Paper variant="outlined" sx={{ borderRadius: 3, p: 2 }}>
        {" "}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1.5}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="space-between"
        >
          {" "}
          {/* Search */}{" "}
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="جستجوی نام، شماره درخواست، موبایل یا آدرس..."
            width={380}
          />{" "}
          {/* Filters */}{" "}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            {" "}
            <TextField
              select
              size="small"
              label="جنسیت"
              value={genderFilter}
              onChange={(event) => setGenderFilter(event.target.value)}
              sx={{ minWidth: 150 }}
            >
              {" "}
              <MenuItem value="all"> همه </MenuItem>{" "}
              <MenuItem value="مرد"> مرد </MenuItem>{" "}
              <MenuItem value="زن"> زن </MenuItem>{" "}
            </TextField>{" "}
            <TextField
              select
              size="small"
              label="نوع درخواست"
              value={requestTypeFilter}
              onChange={(event) => setRequestTypeFilter(event.target.value)}
              sx={{ minWidth: 170 }}
            >
              {" "}
              <MenuItem value="all"> همه درخواست‌ها </MenuItem>{" "}
              {Object.entries(REQUEST_TYPE_LABELS).map(([id, label]) => (
                <MenuItem key={id} value={id}>
                  {" "}
                  {label}{" "}
                </MenuItem>
              ))}{" "}
            </TextField>{" "}
          </Stack>{" "}
        </Stack>{" "}
      </Paper>{" "}
      {/* ------------------------------------------------------------------ */}{" "}
      {/* Table */}{" "}
      {/* ------------------------------------------------------------------ */}{" "}
      <AppDataGrid
        rows={filteredRows}
        columns={columns}
        /* * چون id نداریم و requestNumber unique است، * DataGrid از requestNumber به عنوان key استفاده می‌کند. */ getRowId={(
          row,
        ) => row.requestNumber}
        /* * کلیک روی هر ردیف */ onRowClick={(params) =>
          navigate(`/requests/${params.row.requestNumber}`)
        }
        emptyTitle="هنوز هیچ درخواستی ثبت نشده است."
        emptyDescription="با کلیک روی «ثبت درخواست جدید» اولین درخواست را ثبت کنید."
      />{" "}
    </Stack>
  );
}
