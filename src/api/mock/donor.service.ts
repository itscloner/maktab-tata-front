import type { Donor } from '@/types';
import { donorsMock } from '@/mocks/donors.mock';
import { delay } from '@/utils/delay';
import { generateId } from '@/utils/id';

// این آرایه به عنوان «پایگاه‌داده در حافظه» عمل می‌کند.
// در آینده، تمام متدهای این فایل با فراخوانی API واقعی جایگزین می‌شوند
// بدون آنکه امضای توابع (return type) برای UI تغییر کند.
const store: Donor[] = [...donorsMock];

export type DonorInput = Pick<
  Donor,
  'firstName' | 'lastName' | 'nationalId' | 'mobile' | 'phone' | 'address' | 'city' | 'status' | 'notes'
>;

export async function getDonors(): Promise<Donor[]> {
  return delay([...store]);
}

export async function getDonorById(id: string): Promise<Donor | undefined> {
  return delay(store.find((d) => d.id === id));
}

export async function createDonor(input: DonorInput): Promise<Donor> {
  const now = new Date().toISOString();
  const donor: Donor = {
    ...input,
    id: generateId('donor'),
    avatarColor: '#0F6E5C',
    totalDonationsAmount: 0,
    donationsCount: 0,
    lastDonationDate: null,
    createdAt: now,
    updatedAt: now,
  };
  store.unshift(donor);
  return delay(donor);
}

export async function updateDonor(id: string, input: Partial<DonorInput>): Promise<Donor | undefined> {
  const index = store.findIndex((d) => d.id === id);
  if (index === -1) return delay(undefined);
  store[index] = { ...store[index], ...input, updatedAt: new Date().toISOString() };
  return delay(store[index]);
}

export async function deleteDonor(id: string): Promise<boolean> {
  const index = store.findIndex((d) => d.id === id);
  if (index === -1) return delay(false);
  store.splice(index, 1);
  return delay(true);
}
