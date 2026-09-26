import type { Project } from '@/types';
import { createRng, isoDaysAgo, randomInt } from './seed';

const rng = createRng(303);

const projectDefs: Array<{ title: string; description: string; status: Project['status'] }> = [
  { title: 'درمان بیماران نیازمند', description: 'تامین هزینه‌های درمانی و جراحی بیماران بی‌بضاعت', status: 'فعال' },
  { title: 'کمک تحصیلی دانش‌آموزان', description: 'تهیه لوازم‌التحریر و پرداخت شهریه دانش‌آموزان کم‌بضاعت', status: 'فعال' },
  { title: 'اطعام و بسته‌های غذایی', description: 'توزیع بسته‌های غذایی ماهانه میان خانواده‌های نیازمند', status: 'فعال' },
  { title: 'جهیزیه عروس‌های نیازمند', description: 'تهیه جهیزیه اولیه برای زوج‌های جوان کم‌بضاعت', status: 'فعال' },
  { title: 'بازسازی مسکن محرومین', description: 'بازسازی و تعمیر منازل خانواده‌های آسیب‌دیده', status: 'در حال برنامه‌ریزی' },
  { title: 'کمک به ایتام', description: 'حمایت مستمر ماهانه از کودکان بی‌سرپرست', status: 'فعال' },
];

const progressMap = [78, 62, 91, 45, 12, 70];

export const projectsMock: Project[] = projectDefs.map((p, i) => {
  const budget = randomInt(rng, 400, 3000) * 1_000_000;
  const raisedAmount = Math.round((budget * progressMap[i]) / 100);
  const spentAmount = Math.round(raisedAmount * (0.5 + rng() * 0.4));
  return {
    id: `project_${i + 1}`,
    title: p.title,
    description: p.description,
    budget,
    raisedAmount,
    spentAmount,
    startDate: isoDaysAgo(randomInt(rng, 60, 400)),
    endDate: isoDaysAgo(-randomInt(rng, 30, 300)),
    status: p.status,
    createdAt: isoDaysAgo(randomInt(rng, 60, 400)),
    updatedAt: isoDaysAgo(randomInt(rng, 0, 20)),
  };
});
