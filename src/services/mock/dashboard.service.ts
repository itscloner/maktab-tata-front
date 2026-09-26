import {
  dashboardStatsMock,
  donationsMonthlyMock,
  expensesMonthlyMock,
  donationTypesMock,
  projectsProgressMock,
  recentTransactionsMock,
} from '@/mocks/dashboard.mock';
import { delay } from '@/utils/delay';

export async function getDashboardData() {
  return delay({
    stats: dashboardStatsMock,
    donationsMonthly: donationsMonthlyMock,
    expensesMonthly: expensesMonthlyMock,
    donationTypes: donationTypesMock,
    projectsProgress: projectsProgressMock,
    recentTransactions: recentTransactionsMock,
  });
}
