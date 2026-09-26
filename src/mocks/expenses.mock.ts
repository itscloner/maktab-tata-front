import type { Expense, ExpenseCategory } from '@/types';
import { projectsMock } from './projects.mock';
import { createRng, isoDaysAgo, pick, randomInt } from './seed';

const rng = createRng(707);

const categories: ExpenseCategory[] = [
  'کمک به مددجویان',
  'درمان',
  'آموزش',
  'مواد غذایی',
  'اجاره',
  'حقوق',
  'حمل‌ونقل',
  'تجهیزات',
  'سایر',
];

const titleByCategory: Record<ExpenseCategory, string[]> = {
  'کمک به مددجویان': ['کمک نقدی به خانواده نیازمند', 'پرداخت اجاره خانواده'],
  درمان: ['هزینه جراحی', 'خرید دارو', 'ویزیت پزشک متخصص'],
  آموزش: ['خرید لوازم‌التحریر', 'پرداخت شهریه'],
  'مواد غذایی': ['خرید مواد غذایی', 'تهیه بسته معیشتی'],
  اجاره: ['اجاره دفتر مرکزی', 'اجاره انبار'],
  حقوق: ['حقوق پرسنل اداری', 'حقوق مددکاران'],
  'حمل‌ونقل': ['هزینه سوخت خودرو امداد', 'کرایه حمل بسته‌ها'],
  تجهیزات: ['خرید تجهیزات اداری', 'تعمیر خودرو'],
  سایر: ['هزینه‌های متفرقه', 'هزینه چاپ و تبلیغات'],
};

export const expensesMock: Expense[] = Array.from({ length: 80 }, (_, i) => {
  const category = pick(rng, categories);
  const hasProject = rng() > 0.4;
  const project = hasProject ? pick(rng, projectsMock) : null;
  const status: Expense['status'] = rng() > 0.15 ? 'تایید شده' : rng() > 0.5 ? 'در انتظار تایید' : 'رد شده';
  return {
    id: `expense_${i + 1}`,
    documentNumber: `DOC-${(52000 + i).toString()}`,
    title: pick(rng, titleByCategory[category]),
    category,
    amount: randomInt(rng, 1, 60) * 350_000,
    date: isoDaysAgo(randomInt(rng, 0, 365)),
    projectId: project?.id ?? null,
    projectName: project?.title ?? null,
    status,
    createdAt: isoDaysAgo(randomInt(rng, 0, 365)),
    updatedAt: isoDaysAgo(randomInt(rng, 0, 10)),
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
