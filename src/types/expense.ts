import type { ID, Timestamped } from './common';

export type ExpenseCategory =
  | 'کمک به مددجویان'
  | 'درمان'
  | 'آموزش'
  | 'مواد غذایی'
  | 'اجاره'
  | 'حقوق'
  | 'حمل‌ونقل'
  | 'تجهیزات'
  | 'سایر';

export type ExpenseStatus = 'تایید شده' | 'در انتظار تایید' | 'رد شده';

export interface Expense extends Timestamped {
  id: ID;
  documentNumber: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  projectId: ID | null;
  projectName: string | null;
  status: ExpenseStatus;
}
