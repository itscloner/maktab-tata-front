import type { ID, Timestamped } from "./common";

export type RequestGender = "مرد" | "زن";
export type CustodyType =
  | "دارای سرپرست"
  | "بدون سرپرست"
  | "زن سرپرست خانوار"
  | "سالمند بی‌سرپرست";
export type RequestNationality = "ایرانی" | "افغان" | "عراقی" | "سایر";
export type Religion = "اسلام" | "مسیحیت" | "کلیمی" | "زرتشتی" | "سایر";
export type AidType =
  | "نقدی"
  | "درمانی"
  | "تحصیلی"
  | "جهیزیه"
  | "مسکن"
  | "اطعام"
  | "سایر";

export type RequestStatus = "در انتظار بررسی" | "تایید شده" | "رد شده";
export type ApprovalDecision = "تایید" | "رد";

export interface RequestApproval {
  approvalDate: string; // ISO
  decision: ApprovalDecision;
  reason: string; // علت تایید یا رد
  description?: string;
}

export interface AidApplication extends Timestamped {
  id: ID;
  requestNumber: string;
  requestDate: string; // ISO

  // اطلاعات مددجو
  nationalId: string;
  firstName: string;
  lastName: string;
  gender: RequestGender;
  custodyType: CustodyType;
  nationality: RequestNationality;
  religion: Religion;

  // اطلاعات تماس
  province: string;
  city: string;
  district: string; // محدوده
  address: string;
  mobile: string;
  phone?: string;

  // اطلاعات درخواست
  aidType: AidType;
  requestDescription: string; // شرح درخواست
  referrer: string; // معرف

  status: RequestStatus;

  // نتیجه بررسی — تا قبل از تایید/رد وجود ندارد
  approval?: RequestApproval;
}
