import type { ID, Timestamped } from './common';

export type BeneficiaryCaseStatus = 'فعال' | 'غیرفعال' | 'در انتظار بررسی' | 'مختومه';
export type EconomicStatus = 'بحرانی' | 'ضعیف' | 'متوسط' | 'نیازمند بررسی مجدد';

export interface FamilyMember {
  id: ID;
  name: string;
  relation: string;
  age: number;
}

export interface BeneficiaryDocument {
  id: ID;
  title: string;
  uploadedAt: string;
}

export interface AidRequest {
  id: ID;
  title: string;
  amount: number;
  date: string;
  status: 'در انتظار' | 'تایید شده' | 'رد شده';
}

export interface SupportRecord {
  id: ID;
  title: string;
  amount: number;
  date: string;
  type: string;
}

export interface CaseHistoryItem {
  id: ID;
  date: string;
  title: string;
  description: string;
}

export interface Beneficiary extends Timestamped {
  id: ID;
  firstName: string;
  lastName: string;
  nationalId: string;
  mobile: string;
  address: string;
  city: string;
  avatarColor: string;
  familyMembersCount: number;
  economicStatus: EconomicStatus;
  caseStatus: BeneficiaryCaseStatus;
  lastSupportDate: string | null;
  familyMembers: FamilyMember[];
  documents: BeneficiaryDocument[];
  aidRequests: AidRequest[];
  supportRecords: SupportRecord[];
  caseHistory: CaseHistoryItem[];
}
