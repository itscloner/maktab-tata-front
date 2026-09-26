import type { Beneficiary } from '@/types';
import {
  AVATAR_COLORS,
  CITIES,
  createRng,
  isoDaysAgo,
  pick,
  randomFullName,
  randomInt,
  randomMobile,
  randomNationalId,
} from './seed';

const rng = createRng(202);

const economicStatuses: Beneficiary['economicStatus'][] = ['بحرانی', 'ضعیف', 'متوسط', 'نیازمند بررسی مجدد'];
const caseStatuses: Beneficiary['caseStatus'][] = ['فعال', 'غیرفعال', 'در انتظار بررسی', 'مختومه'];
const relations = ['همسر', 'فرزند', 'مادر', 'پدر', 'خواهر', 'برادر'];

export const beneficiariesMock: Beneficiary[] = Array.from({ length: 30 }, (_, i) => {
  const { firstName, lastName } = randomFullName(rng);
  const familyMembersCount = randomInt(rng, 1, 6);
  const familyMembers = Array.from({ length: familyMembersCount }, (__, j) => ({
    id: `fm_${i}_${j}`,
    name: randomFullName(rng).firstName,
    relation: pick(rng, relations),
    age: randomInt(rng, 1, 70),
  }));

  const aidRequests = Array.from({ length: randomInt(rng, 0, 4) }, (__, j) => ({
    id: `ar_${i}_${j}`,
    title: pick(rng, ['هزینه درمان', 'کمک تحصیلی', 'اجاره منزل', 'خرید جهیزیه', 'هزینه دارو']),
    amount: randomInt(rng, 1, 20) * 500_000,
    date: isoDaysAgo(randomInt(rng, 5, 300)),
    status: pick(rng, ['در انتظار', 'تایید شده', 'رد شده'] as const),
  }));

  const supportRecords = Array.from({ length: randomInt(rng, 0, 6) }, (__, j) => ({
    id: `sr_${i}_${j}`,
    title: pick(rng, ['بسته معیشتی', 'کمک نقدی', 'پرداخت اجاره', 'هزینه درمان', 'لوازم‌التحریر']),
    amount: randomInt(rng, 1, 15) * 400_000,
    date: isoDaysAgo(randomInt(rng, 1, 400)),
    type: pick(rng, ['نقدی', 'غیرنقدی']),
  }));

  const caseHistory = Array.from({ length: randomInt(rng, 1, 4) }, (__, j) => ({
    id: `ch_${i}_${j}`,
    date: isoDaysAgo(randomInt(rng, 1, 500)),
    title: pick(rng, ['بازدید مددکار', 'بروزرسانی پرونده', 'بررسی مجدد وضعیت', 'تشکیل پرونده']),
    description: 'بازدید و بررسی وضعیت خانوار توسط مددکار اجتماعی خیریه انجام شد.',
  }));

  return {
    id: `beneficiary_${i + 1}`,
    firstName,
    lastName,
    nationalId: randomNationalId(rng),
    mobile: randomMobile(rng),
    address: `${pick(rng, CITIES)}، محله ${pick(rng, ['نارمک', 'یوسف‌آباد', 'پونک', 'تجریش', 'افسریه'])}`,
    city: pick(rng, CITIES),
    avatarColor: pick(rng, AVATAR_COLORS),
    familyMembersCount,
    economicStatus: pick(rng, economicStatuses),
    caseStatus: pick(rng, caseStatuses),
    lastSupportDate: supportRecords[0]?.date ?? null,
    familyMembers,
    documents: Array.from({ length: randomInt(rng, 0, 3) }, (__, j) => ({
      id: `doc_${i}_${j}`,
      title: pick(rng, ['کارت ملی', 'سند اجاره', 'مدرک درمانی', 'گواهی اشتغال']),
      uploadedAt: isoDaysAgo(randomInt(rng, 10, 200)),
    })),
    aidRequests,
    supportRecords,
    caseHistory,
    createdAt: isoDaysAgo(randomInt(rng, 30, 800)),
    updatedAt: isoDaysAgo(randomInt(rng, 0, 20)),
  };
});
