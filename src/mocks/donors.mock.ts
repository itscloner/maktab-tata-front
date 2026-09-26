import type { Donor } from '@/types';
import { AVATAR_COLORS, CITIES, createRng, isoDaysAgo, pick, randomFullName, randomInt, randomMobile, randomNationalId } from './seed';

const rng = createRng(101);

export const donorsMock: Donor[] = Array.from({ length: 42 }, (_, i) => {
  const { firstName, lastName } = randomFullName(rng);
  const donationsCount = randomInt(rng, 1, 24);
  const totalDonationsAmount = donationsCount * randomInt(rng, 300_000, 9_000_000);
  const createdDaysAgo = randomInt(rng, 30, 900);
  return {
    id: `donor_${i + 1}`,
    firstName,
    lastName,
    nationalId: randomNationalId(rng),
    mobile: randomMobile(rng),
    phone: rng() > 0.5 ? `021${randomInt(rng, 10000000, 99999999)}` : undefined,
    address: `${pick(rng, CITIES)}، خیابان ${pick(rng, ['ولیعصر', 'انقلاب', 'آزادی', 'شریعتی', 'کریمخان'])}`,
    city: pick(rng, CITIES),
    avatarColor: pick(rng, AVATAR_COLORS),
    status: rng() > 0.12 ? 'فعال' : 'غیرفعال',
    totalDonationsAmount,
    donationsCount,
    lastDonationDate: isoDaysAgo(randomInt(rng, 1, 60)),
    createdAt: isoDaysAgo(createdDaysAgo),
    updatedAt: isoDaysAgo(randomInt(rng, 0, 30)),
  };
});
