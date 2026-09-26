import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';
import PageLoader from '@/components/common/LoadingState';
import PermissionGuard from '@/permissions/permission.guard';

const LoginPage = lazy(() => import('@/modules/auth/LoginPage'));
const DashboardPage = lazy(() => import('@/modules/dashboard/DashboardPage'));
const DonorsListPage = lazy(() => import('@/modules/donors/DonorsListPage'));
const DonorDetailsPage = lazy(() => import('@/modules/donors/DonorDetailsPage'));
const BeneficiariesListPage = lazy(() => import('@/modules/beneficiaries/BeneficiariesListPage'));
const BeneficiaryDetailsPage = lazy(() => import('@/modules/beneficiaries/BeneficiaryDetailsPage'));
const DonationsListPage = lazy(() => import('@/modules/donations/DonationsListPage'));
const DonationCreatePage = lazy(() => import('@/modules/donations/DonationCreatePage'));
const ExpensesListPage = lazy(() => import('@/modules/expenses/ExpensesListPage'));
const ProjectsListPage = lazy(() => import('@/modules/projects/ProjectsListPage'));
const FundsListPage = lazy(() => import('@/modules/funds/FundsListPage'));
const AccountsListPage = lazy(() => import('@/modules/accounts/AccountsListPage'));
const ReportsPage = lazy(() => import('@/modules/reports/ReportsPage'));
const RequestsListPage = lazy(() => import('@/modules/requests/RequestsListPage'));
const RequestCreatePage = lazy(() => import('@/modules/requests/RequestCreatePage'));
const RequestDetailsPage = lazy(() => import('@/modules/requests/RequestDetailsPage'));
const UsersListPage = lazy(() => import('@/modules/users/UsersListPage'));
const UserDetailsPage = lazy(() => import('@/modules/users/UserDetailsPage'));
const UserPermissionsPage = lazy(() => import('@/modules/users/UserPermissionsPage'));
const UserAccountsListPage = lazy(() => import('@/modules/user-accounts/UserAccountsListPage'));
const UserAccountDetailsPage = lazy(() => import('@/modules/user-accounts/UserAccountDetailsPage'));
const SettingsPage = lazy(() => import('@/modules/settings/SettingsPage'));
const ForbiddenPage = lazy(() => import('@/modules/errors/ForbiddenPage'));

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<PageLoader />}>{node}</Suspense>;
}

// هر Route با Permission متناظر خودش (بر اساس درخت src/mocks/permissions.mock.ts) محافظت می‌شود.
// اگر کاربر آن Permission را نداشته باشد، حتی با وارد کردن مستقیم URL هم به 403/ redirect می‌شود.
function withPermission(permission: string, node: ReactNode) {
  return withSuspense(<PermissionGuard permission={permission}>{node}</PermissionGuard>);
}

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: '/login', element: withSuspense(<LoginPage />) }],
  },
  {
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/403', element: withSuspense(<ForbiddenPage />) },

      { path: '/dashboard', element: withPermission('dashboard', <DashboardPage />) },

      { path: '/donors', element: withPermission('donors.list', <DonorsListPage />) },
      { path: '/donors/:id', element: withPermission('donors.details', <DonorDetailsPage />) },

      { path: '/beneficiaries', element: withPermission('beneficiaries.list', <BeneficiariesListPage />) },
      { path: '/beneficiaries/:id', element: withPermission('beneficiaries.details', <BeneficiaryDetailsPage />) },

      { path: '/donations', element: withPermission('donations.list', <DonationsListPage />) },
      { path: '/donations/create', element: withPermission('donations.create', <DonationCreatePage />) },

      { path: '/expenses', element: withPermission('expenses.list', <ExpensesListPage />) },
      { path: '/projects', element: withPermission('projects.list', <ProjectsListPage />) },
      { path: '/funds', element: withPermission('funds.list', <FundsListPage />) },
      { path: '/accounts', element: withPermission('accounts.list', <AccountsListPage />) },
      { path: '/reports', element: withPermission('reports.financial', <ReportsPage />) },

      { path: '/requests', element: withPermission('requests.list', <RequestsListPage />) },
      { path: '/requests/create', element: withPermission('requests.create', <RequestCreatePage />) },
      { path: '/requests/:id', element: withPermission('requests.details', <RequestDetailsPage />) },

      { path: '/users', element: withPermission('users.list', <UsersListPage />) },
      { path: '/users/:id', element: withPermission('users.list', <UserDetailsPage />) },
      { path: '/users/:id/permissions', element: withPermission('users.permissions', <UserPermissionsPage />) },

      // ماژول جدید «کاربران» متصل به API واقعی بک‌اند (نه Mock) — طبق درخواست شما.
      // چون هنوز به درخت Permission اضافه نشده (شما گفتید خودتان ادامه می‌دهید)،
      // فعلاً فقط به ورود به سیستم نیاز دارد، نه یک Permission خاص.
      { path: '/user-accounts', element: withSuspense(<UserAccountsListPage />) },
      { path: '/user-accounts/:id', element: withSuspense(<UserAccountDetailsPage />) },

      { path: '/settings', element: withPermission('settings', <SettingsPage />) },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
