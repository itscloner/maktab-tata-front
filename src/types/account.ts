import type { ID, Timestamped } from './common';

export type AccountType = 'حساب بانکی' | 'کارت' | 'صندوق نقدی' | 'حساب آنلاین';

export interface FinancialAccount extends Timestamped {
  id: ID;
  title: string;
  type: AccountType;
  ownerName: string;
  number: string;
  balance: number;
  totalIn: number;
  totalOut: number;
  transactionsCount: number;
}
