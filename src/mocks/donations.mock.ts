import type { Donation, DonationType } from '@/types';
import { donorsMock } from './donors.mock';
import { projectsMock } from './projects.mock';
import { fundsMock } from './funds.mock';
import { createRng, isoDaysAgo, pick, randomInt } from './seed';

const rng = createRng(606);

const donationTypes: DonationType[] = [
  'نقدی',
  'کارت‌به‌کارت',
  'درگاه',
  'واریز بانکی',
  'غیرنقدی',
  'صدقه',
  'زکات',
  'نذر',
];

export const donationsMock: Donation[] = Array.from({ length: 120 }, (_, i) => {
  const donor = pick(rng, donorsMock);
  const hasProject = rng() > 0.25;
  const project = hasProject ? pick(rng, projectsMock) : null;
  const fund = pick(rng, fundsMock);
  const status: Donation['status'] = rng() > 0.08 ? 'موفق' : rng() > 0.5 ? 'در انتظار' : 'ناموفق';
  return {
    id: `donation_${i + 1}`,
    transactionNumber: `TRX-${(140000 + i).toString()}`,
    donorId: donor.id,
    donorName: `${donor.firstName} ${donor.lastName}`,
    amount: randomInt(rng, 2, 120) * 250_000,
    type: pick(rng, donationTypes),
    date: isoDaysAgo(randomInt(rng, 0, 365)),
    projectId: project?.id ?? null,
    projectName: project?.title ?? null,
    fundId: fund.id,
    fundName: fund.name,
    status,
    description: rng() > 0.7 ? 'کمک مردمی نقدی جهت پروژه‌های در حال اجرا' : undefined,
    createdAt: isoDaysAgo(randomInt(rng, 0, 365)),
    updatedAt: isoDaysAgo(randomInt(rng, 0, 10)),
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
