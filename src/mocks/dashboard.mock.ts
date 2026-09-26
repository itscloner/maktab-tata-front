import { donationsMock } from './donations.mock';
import { expensesMock } from './expenses.mock';
import { donorsMock } from './donors.mock';
import { beneficiariesMock } from './beneficiaries.mock';
import { projectsMock } from './projects.mock';
import { jalaliMonthLabel } from '@/utils/date';

export interface MonthlyPoint {
  month: string;
  amount: number;
}

export interface DonationTypeSlice {
  type: string;
  value: number;
}

function lastNMonthsLabels(n: number): string[] {
  const now = new Date();
  const labels: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    // تخمین ماه شمسی بر اساس افست ماه میلادی (کافی برای نمایش Mock)
    const idx = ((d.getMonth() + 9) % 12);
    labels.push(jalaliMonthLabel(idx));
  }
  return labels;
}

const monthLabels = lastNMonthsLabels(7);

export const donationsMonthlyMock: MonthlyPoint[] = monthLabels.map((month, i) => ({
  month,
  amount: 180_000_000 + i * 65_000_000 + (i % 2 === 0 ? 40_000_000 : -20_000_000),
}));

export const expensesMonthlyMock: MonthlyPoint[] = monthLabels.map((month, i) => ({
  month,
  amount: 90_000_000 + i * 40_000_000 + (i % 3 === 0 ? 30_000_000 : 0),
}));

export const donationTypesMock: DonationTypeSlice[] = [
  { type: 'نقدی', value: 32 },
  { type: 'کارت‌به‌کارت', value: 22 },
  { type: 'درگاه', value: 18 },
  { type: 'بانکی', value: 12 },
  { type: 'غیرنقدی', value: 6 },
  { type: 'صدقه', value: 4 },
  { type: 'زکات', value: 4 },
  { type: 'نذر', value: 2 },
];

export const dashboardStatsMock = {
  totalDonations: 2_850_000_000,
  totalExpenses: 1_420_000_000,
  balance: 1_430_000_000,
  donorsCount: donorsMock.length * 30 + 8, // برای نمایش عدد بزرگ‌تر مطابق نمونه طرح
  beneficiariesCount: beneficiariesMock.length * 13 - 4,
  activeProjectsCount: projectsMock.filter((p) => p.status === 'فعال').length + 8,
};

export const projectsProgressMock = projectsMock.slice(0, 4).map((p) => ({
  title: p.title,
  progress: Math.round((p.raisedAmount / p.budget) * 100),
}));

export const recentTransactionsMock = [
  ...donationsMock.slice(0, 5).map((d) => ({
    id: d.id,
    kind: 'کمک' as const,
    title: d.donorName,
    amount: d.amount,
    date: d.date,
    status: d.status,
  })),
  ...expensesMock.slice(0, 5).map((e) => ({
    id: e.id,
    kind: 'هزینه' as const,
    title: e.title,
    amount: e.amount,
    date: e.date,
    status: e.status,
  })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);
