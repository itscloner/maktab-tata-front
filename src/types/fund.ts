import type { ID, Timestamped } from './common';

export interface Fund extends Timestamped {
  id: ID;
  name: string;
  description: string;
  balance: number;
  totalIn: number;
  totalOut: number;
  transactionsCount: number;
}
