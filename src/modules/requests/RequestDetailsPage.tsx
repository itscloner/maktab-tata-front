// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Stack from "@mui/material/Stack";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import Button from "@mui/material/Button";
// import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
// import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
// import PageHeader from "@/components/common/PageHeader";
// import StatusChip from "@/components/common/StatusChip";
// import PageLoader from "@/components/common/LoadingState";
// import ErrorState from "@/components/common/ErrorState";
// import { useAsyncData } from "@/hooks/useAsyncData";
// import { getRequestById, reviewRequest } from "@/api/mock/request.service";
// import { formatPersianDate } from "@/utils/date";
// import { useToastStore } from "@/stores/toastStore";
// import { usePermission } from "@/permissions/permission.hooks";
// import RequestApprovalDialog from "./RequestApprovalDialog";
// import type { ApprovalFormValues } from "./approvalSchema";

// function InfoRow({ label, value }: { label: string; value: string }) {
//   return (
//     <Stack direction="row" justifyContent="space-between" sx={{ py: 1 }}>
//       <Typography variant="body2" color="text.secondary">
//         {label}
//       </Typography>
//       <Typography variant="body2" fontWeight={600}>
//         {value || "—"}
//       </Typography>
//     </Stack>
//   );
// }

// export default function RequestDetailsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const showToast = useToastStore((s) => s.show);
//   const {
//     data: request,
//     loading,
//     error,
//     reload,
//   } = useAsyncData(() => getRequestById(id!), [id]);
//   const [approvalOpen, setApprovalOpen] = useState(false);
//   const canApprove = usePermission("requests.approve");

//   const handleReview = async (values: ApprovalFormValues) => {
//     if (!request) return;
//     await reviewRequest(request.id, values);
//     setApprovalOpen(false);
//     showToast(
//       values.decision === "تایید" ? "درخواست تایید شد." : "درخواست رد شد.",
//     );
//     reload();
//   };

//   if (loading) return <PageLoader />;
//   if (error || !request)
//     return <ErrorState onRetry={reload} title="درخواست مورد نظر یافت نشد." />;

//   const isPending = request.status === "در انتظار بررسی";

//   return (
//     <Stack spacing={3} sx={{ maxWidth: 880 }}>
//       <PageHeader
//         title={`درخواست ${request.requestNumber}`}
//         breadcrumbs={[
//           { label: "درخواست‌ها", path: "/requests" },
//           { label: request.requestNumber },
//         ]}
//         actions={
//           <Button
//             variant="outlined"
//             startIcon={<ArrowForwardRoundedIcon />}
//             onClick={() => navigate("/requests")}
//           >
//             بازگشت به لیست
//           </Button>
//         }
//       />

//       <Paper variant="outlined" sx={{ p: 2.5 }}>
//         <Stack
//           direction="row"
//           alignItems="center"
//           justifyContent="space-between"
//           flexWrap="wrap"
//           gap={2}
//         >
//           <Stack>
//             <Typography variant="h5">
//               {request.firstName} {request.lastName}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               تاریخ درخواست: {formatPersianDate(request.requestDate)}
//             </Typography>
//           </Stack>
//           <Stack direction="row" alignItems="center" spacing={1.5}>
//             <StatusChip label={request.status} />
//             {isPending && canApprove && (
//               <Button
//                 variant="contained"
//                 startIcon={<FactCheckRoundedIcon />}
//                 onClick={() => setApprovalOpen(true)}
//               >
//                 بررسی درخواست
//               </Button>
//             )}
//           </Stack>
//         </Stack>
//       </Paper>

//       <Grid container spacing={2.5}>
//         <Grid item xs={12} md={6}>
//           <Paper variant="outlined" sx={{ p: 2.5, height: "100%" }}>
//             <Typography
//               variant="subtitle2"
//               color="text.secondary"
//               sx={{ mb: 0.5 }}
//             >
//               اطلاعات مددجو
//             </Typography>
//             <InfoRow label="کد ملی" value={request.nationalId} />
//             <InfoRow label="جنسیت" value={request.gender} />
//             <InfoRow label="نوع سرپرستی" value={request.custodyType} />
//             <InfoRow label="ملیت" value={request.nationality} />
//             <InfoRow label="دین" value={request.religion} />
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <Paper variant="outlined" sx={{ p: 2.5, height: "100%" }}>
//             <Typography
//               variant="subtitle2"
//               color="text.secondary"
//               sx={{ mb: 0.5 }}
//             >
//               اطلاعات تماس
//             </Typography>
//             <InfoRow label="استان" value={request.province} />
//             <InfoRow label="شهر" value={request.city} />
//             <InfoRow label="محدوده" value={request.district} />
//             <InfoRow label="موبایل" value={request.mobile} />
//             <InfoRow label="تلفن" value={request.phone ?? ""} />
//             <InfoRow label="آدرس" value={request.address} />
//           </Paper>
//         </Grid>
//         <Grid item xs={12}>
//           <Paper variant="outlined" sx={{ p: 2.5 }}>
//             <Typography
//               variant="subtitle2"
//               color="text.secondary"
//               sx={{ mb: 0.5 }}
//             >
//               اطلاعات درخواست
//             </Typography>
//             <InfoRow label="نوع کمک درخواستی" value={request.aidType} />
//             <InfoRow label="معرف" value={request.referrer} />
//             <InfoRow label="شرح درخواست" value={request.description} />
//           </Paper>
//         </Grid>

//         {request.approval && (
//           <Grid item xs={12}>
//             <Paper variant="outlined" sx={{ p: 2.5 }}>
//               <Stack
//                 direction="row"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 sx={{ mb: 0.5 }}
//               >
//                 <Typography variant="subtitle2" color="text.secondary">
//                   نتیجه بررسی
//                 </Typography>
//                 <StatusChip label={request.status} />
//               </Stack>
//               <Divider sx={{ mb: 1 }} />
//               <InfoRow
//                 label="تاریخ تایید"
//                 value={formatPersianDate(request.approval.approvalDate)}
//               />
//               <InfoRow
//                 label="علت تایید یا رد"
//                 value={request.approval.reason}
//               />
//               {request.approval.description && (
//                 <InfoRow label="توضیحات" value={request.approval.description} />
//               )}
//             </Paper>
//           </Grid>
//         )}
//       </Grid>

//       <RequestApprovalDialog
//         open={approvalOpen}
//         onClose={() => setApprovalOpen(false)}
//         onSubmit={handleReview}
//       />
//     </Stack>
//   );
// }
const RequestDetailsPage = () => {
  return <div>RequestDetailsPage</div>;
};

export default RequestDetailsPage;
