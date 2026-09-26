import type { Beneficiary } from '@/types';
import { beneficiariesMock } from '@/mocks/beneficiaries.mock';
import { delay } from '@/utils/delay';
import { generateId } from '@/utils/id';

const store: Beneficiary[] = [...beneficiariesMock];

export type BeneficiaryInput = Pick<
  Beneficiary,
  'firstName' | 'lastName' | 'nationalId' | 'mobile' | 'address' | 'city' | 'economicStatus' | 'caseStatus'
>;

export async function getBeneficiaries(): Promise<Beneficiary[]> {
  return delay([...store]);
}

export async function getBeneficiaryById(id: string): Promise<Beneficiary | undefined> {
  return delay(store.find((b) => b.id === id));
}

export async function createBeneficiary(input: BeneficiaryInput): Promise<Beneficiary> {
  const now = new Date().toISOString();
  const beneficiary: Beneficiary = {
    ...input,
    id: generateId('beneficiary'),
    avatarColor: '#2E6E8E',
    familyMembersCount: 1,
    lastSupportDate: null,
    familyMembers: [],
    documents: [],
    aidRequests: [],
    supportRecords: [],
    caseHistory: [
      { id: generateId('ch'), date: now, title: 'تشکیل پرونده', description: 'پرونده مددجو ایجاد شد.' },
    ],
    createdAt: now,
    updatedAt: now,
  };
  store.unshift(beneficiary);
  return delay(beneficiary);
}

export async function updateBeneficiary(
  id: string,
  input: Partial<BeneficiaryInput>,
): Promise<Beneficiary | undefined> {
  const index = store.findIndex((b) => b.id === id);
  if (index === -1) return delay(undefined);
  store[index] = { ...store[index], ...input, updatedAt: new Date().toISOString() };
  return delay(store[index]);
}

export async function deleteBeneficiary(id: string): Promise<boolean> {
  const index = store.findIndex((b) => b.id === id);
  if (index === -1) return delay(false);
  store.splice(index, 1);
  return delay(true);
}
