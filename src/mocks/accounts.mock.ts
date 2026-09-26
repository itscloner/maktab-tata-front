import type { FinancialAccount } from '@/types';
import { createRng, isoDaysAgo, randomInt } from './seed';

const rng = createRng(505);

const accountDefs: Array<{ title: string; type: FinancialAccount['type']; owner: string; number: string }> = [
  { title: 'حساب اصلی بانک ملی', type: 'حساب بانکی', owner: 'خیریه مکتب طه', number: '0123456789' },
  { title: 'کارت خیریه - بانک ملت', type: 'کارت', owner: 'خیریه مکتب طه', number: '6104-••••-1234' },
  { title: 'صندوق نقدی دفتر مرکزی', type: 'صندوق نقدی', owner: 'مسئول مالی', number: '—' },
  { title: 'درگاه پرداخت آنلاین', type: 'حساب آنلاین', owner: 'خیریه مکتب طه', number: 'PAY-2201' },
];

export const accountsMock: FinancialAccount[] = accountDefs.map((a, i) => {
  const totalIn = randomInt(rng, 300, 2200) * 1_000_000;
  const totalOut = Math.round(totalIn * (0.3 + rng() * 0.5));
  return {
    id: `account_${i + 1}`,
    title: a.title,
    type: a.type,
    ownerName: a.owner,
    number: a.number,
    balance: totalIn - totalOut,
    totalIn,
    totalOut,
    transactionsCount: randomInt(rng, 60, 800),
    createdAt: isoDaysAgo(randomInt(rng, 200, 900)),
    updatedAt: isoDaysAgo(randomInt(rng, 0, 10)),
  };
});
