import type { ID, Timestamped } from './common';

export type ProjectStatus = 'فعال' | 'تکمیل‌شده' | 'متوقف‌شده' | 'در حال برنامه‌ریزی';

export interface Project extends Timestamped {
  id: ID;
  title: string;
  description: string;
  budget: number;
  raisedAmount: number;
  spentAmount: number;
  startDate: string;
  endDate: string;
  status: ProjectStatus;
}
