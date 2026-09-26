import type { ID, Timestamped } from './common';

export type DonationType =
  | 'نقدی'
  | 'کارت‌به‌کارت'
  | 'درگاه'
  | 'واریز بانکی'
  | 'غیرنقدی'
  | 'صدقه'
  | 'زکات'
  | 'نذر';

export type DonationStatus = 'موفق' | 'در انتظار' | 'ناموفق';

export interface Donation extends Timestamped {
  id: ID;
  transactionNumber: string;
  donorId: ID;
  donorName: string;
  amount: number;
  type: DonationType;
  date: string;
  projectId: ID | null;
  projectName: string | null;
  fundId: ID;
  fundName: string;
  status: DonationStatus;
  description?: string;
}
