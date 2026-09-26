import type { FinancialAccount } from '@/types';
import { accountsMock } from '@/mocks/accounts.mock';
import { delay } from '@/utils/delay';

const store: FinancialAccount[] = [...accountsMock];

export async function getAccounts(): Promise<FinancialAccount[]> {
  return delay([...store]);
}
