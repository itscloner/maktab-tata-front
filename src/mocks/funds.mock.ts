import type { Fund } from '@/types';
import { createRng, isoDaysAgo, randomInt } from './seed';

const rng = createRng(404);

const fundDefs = [
  { name: 'صندوق عمومی', description: 'وجوه عمومی و متفرقه خیریه' },
  { name: 'صندوق درمان', description: 'مختص هزینه‌های درمانی بیماران' },
  { name: 'صندوق ایتام', description: 'حمایت از کودکان بی‌سرپرست' },
  { name: 'صندوق آموزش', description: 'کمک‌های تحصیلی و آموزشی' },
  { name: 'صندوق صدقات', description: 'صدقات مردمی روزانه' },
  { name: 'صندوق نذورات', description: 'نذورات و کمک‌های موردی' },
];

export const fundsMock: Fund[] = fundDefs.map((f, i) => {
  const totalIn = randomInt(rng, 200, 1800) * 1_000_000;
  const totalOut = Math.round(totalIn * (0.4 + rng() * 0.4));
  return {
    id: `fund_${i + 1}`,
    name: f.name,
    description: f.description,
    balance: totalIn - totalOut,
    totalIn,
    totalOut,
    transactionsCount: randomInt(rng, 40, 600),
    createdAt: isoDaysAgo(randomInt(rng, 200, 900)),
    updatedAt: isoDaysAgo(randomInt(rng, 0, 10)),
  };
});
