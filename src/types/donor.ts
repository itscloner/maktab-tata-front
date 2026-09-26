import type { ID, Timestamped } from './common';

export type DonorStatus = 'فعال' | 'غیرفعال';

export interface Donor extends Timestamped {
  id: ID;
  firstName: string;
  lastName: string;
  nationalId: string;
  mobile: string;
  phone?: string;
  address?: string;
  city: string;
  avatarColor: string;
  status: DonorStatus;
  totalDonationsAmount: number;
  donationsCount: number;
  lastDonationDate: string | null;
  notes?: string;
}
