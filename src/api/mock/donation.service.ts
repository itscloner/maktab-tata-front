import type { Donation } from '@/types';
import { donationsMock } from '@/mocks/donations.mock';
import { donorsMock } from '@/mocks/donors.mock';
import { delay } from '@/utils/delay';
import { generateId } from '@/utils/id';

const store: Donation[] = [...donationsMock];

export type DonationInput = Pick<
  Donation,
  'donorId' | 'amount' | 'type' | 'date' | 'projectId' | 'projectName' | 'fundId' | 'fundName' | 'description'
>;

export async function getDonations(): Promise<Donation[]> {
  return delay([...store]);
}

export async function getDonationById(id: string): Promise<Donation | undefined> {
  return delay(store.find((d) => d.id === id));
}

export async function createDonation(input: DonationInput): Promise<Donation> {
  const now = new Date().toISOString();
  const donor = donorsMock.find((d) => d.id === input.donorId);
  const donation: Donation = {
    ...input,
    id: generateId('donation'),
    transactionNumber: `TRX-${Math.floor(100000 + Math.random() * 899999)}`,
    donorName: donor ? `${donor.firstName} ${donor.lastName}` : 'نامشخص',
    status: 'موفق',
    createdAt: now,
    updatedAt: now,
  };
  store.unshift(donation);
  return delay(donation);
}

export async function deleteDonation(id: string): Promise<boolean> {
  const index = store.findIndex((d) => d.id === id);
  if (index === -1) return delay(false);
  store.splice(index, 1);
  return delay(true);
}
