import type { AidApplication, ApprovalDecision } from '@/types';
import { requestsMock } from '@/mocks/requests.mock';
import { delay } from '@/utils/delay';
import { generateId } from '@/utils/id';

const store: AidApplication[] = [...requestsMock];

export type RequestInput = Pick<
  AidApplication,
  | 'requestDate'
  | 'nationalId'
  | 'firstName'
  | 'lastName'
  | 'gender'
  | 'custodyType'
  | 'nationality'
  | 'religion'
  | 'province'
  | 'city'
  | 'district'
  | 'address'
  | 'mobile'
  | 'phone'
  | 'aidType'
  | 'requestDescription'
  | 'referrer'
>;

export interface ApprovalInput {
  approvalDate: string;
  decision: ApprovalDecision;
  reason: string;
  description?: string;
}

export async function getRequests(): Promise<AidApplication[]> {
  return delay([...store]);
}

export async function getRequestById(id: string): Promise<AidApplication | undefined> {
  return delay(store.find((r) => r.id === id));
}

export async function createRequest(input: RequestInput): Promise<AidApplication> {
  const now = new Date().toISOString();
  const record: AidApplication = {
    ...input,
    id: generateId('request'),
    requestNumber: `REQ-${Math.floor(10000 + Math.random() * 89999)}`,
    status: 'در انتظار بررسی',
    createdAt: now,
    updatedAt: now,
  };
  store.unshift(record);
  return delay(record);
}

// ثبت نتیجه بررسی (تایید/رد) — قلب صفحه «جزئیات درخواست»
export async function reviewRequest(id: string, input: ApprovalInput): Promise<AidApplication | undefined> {
  const index = store.findIndex((r) => r.id === id);
  if (index === -1) return delay(undefined);
  store[index] = {
    ...store[index],
    status: input.decision === 'تایید' ? 'تایید شده' : 'رد شده',
    approval: input,
    updatedAt: new Date().toISOString(),
  };
  return delay(store[index]);
}
