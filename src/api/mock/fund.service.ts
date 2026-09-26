import type { Fund } from '@/types';
import { fundsMock } from '@/mocks/funds.mock';
import { delay } from '@/utils/delay';

const store: Fund[] = [...fundsMock];

export async function getFunds(): Promise<Fund[]> {
  return delay([...store]);
}
