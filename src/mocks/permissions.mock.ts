import type { PermissionMenu } from '@/permissions/permission.types';

// درخت کامل Permissionها — منبع واحد حقیقت برای:
// ۱) Sidebar (src/mocks/menus.mock.ts آن را بازتاب می‌دهد)
// ۲) درخت انتخاب دسترسی در صفحه «مدیریت دسترسی‌های کاربر»
// ۳) Route Guard / Permission Guard

export const permissionsMock: PermissionMenu[] = [
  { id: 'dashboard', key: 'dashboard', title: 'داشبورد', path: '/dashboard', icon: 'dashboard', parentId: null },

  {
    id: 'donors',
    key: 'donors',
    title: 'خیرین',
    icon: 'donors',
    parentId: null,
    children: [
      { id: 'donors.list', key: 'donors.list', title: 'لیست خیرین', path: '/donors', parentId: 'donors' },
      { id: 'donors.create', key: 'donors.create', title: 'ایجاد خیر جدید', parentId: 'donors' },
      { id: 'donors.edit', key: 'donors.edit', title: 'ویرایش خیر', parentId: 'donors' },
      { id: 'donors.delete', key: 'donors.delete', title: 'حذف خیر', parentId: 'donors' },
      { id: 'donors.details', key: 'donors.details', title: 'جزئیات خیر', path: '/donors/:id', parentId: 'donors' },
    ],
  },
  {
    id: 'beneficiaries',
    key: 'beneficiaries',
    title: 'مددجویان',
    icon: 'beneficiaries',
    parentId: null,
    children: [
      { id: 'beneficiaries.list', key: 'beneficiaries.list', title: 'لیست مددجویان', path: '/beneficiaries', parentId: 'beneficiaries' },
      { id: 'beneficiaries.create', key: 'beneficiaries.create', title: 'ایجاد مددجو جدید', parentId: 'beneficiaries' },
      { id: 'beneficiaries.edit', key: 'beneficiaries.edit', title: 'ویرایش مددجو', parentId: 'beneficiaries' },
      { id: 'beneficiaries.delete', key: 'beneficiaries.delete', title: 'حذف مددجو', parentId: 'beneficiaries' },
      { id: 'beneficiaries.details', key: 'beneficiaries.details', title: 'پرونده مددجو', path: '/beneficiaries/:id', parentId: 'beneficiaries' },
    ],
  },
  {
    id: 'requests',
    key: 'requests',
    title: 'درخواست‌ها',
    icon: 'requests',
    parentId: null,
    children: [
      { id: 'requests.list', key: 'requests.list', title: 'لیست درخواست‌ها', path: '/requests', parentId: 'requests' },
      { id: 'requests.create', key: 'requests.create', title: 'ثبت درخواست جدید', path: '/requests/create', parentId: 'requests' },
      { id: 'requests.approve', key: 'requests.approve', title: 'تایید/رد درخواست', parentId: 'requests' },
      { id: 'requests.details', key: 'requests.details', title: 'جزئیات درخواست', path: '/requests/:id', parentId: 'requests' },
    ],
  },
  {
    id: 'donations',
    key: 'donations',
    title: 'کمک‌ها',
    icon: 'donations',
    parentId: null,
    children: [
      { id: 'donations.list', key: 'donations.list', title: 'لیست کمک‌ها', path: '/donations', parentId: 'donations' },
      { id: 'donations.create', key: 'donations.create', title: 'ثبت کمک جدید', path: '/donations/create', parentId: 'donations' },
      { id: 'donations.edit', key: 'donations.edit', title: 'ویرایش کمک', parentId: 'donations' },
      { id: 'donations.delete', key: 'donations.delete', title: 'حذف کمک', parentId: 'donations' },
      { id: 'donations.details', key: 'donations.details', title: 'جزئیات کمک', parentId: 'donations' },
    ],
  },
  {
    id: 'expenses',
    key: 'expenses',
    title: 'هزینه‌ها',
    icon: 'expenses',
    parentId: null,
    children: [
      { id: 'expenses.list', key: 'expenses.list', title: 'لیست هزینه‌ها', path: '/expenses', parentId: 'expenses' },
      { id: 'expenses.create', key: 'expenses.create', title: 'ثبت هزینه جدید', parentId: 'expenses' },
      { id: 'expenses.edit', key: 'expenses.edit', title: 'ویرایش هزینه', parentId: 'expenses' },
      { id: 'expenses.delete', key: 'expenses.delete', title: 'حذف هزینه', parentId: 'expenses' },
      { id: 'expenses.details', key: 'expenses.details', title: 'جزئیات هزینه', parentId: 'expenses' },
    ],
  },
  {
    id: 'projects',
    key: 'projects',
    title: 'پروژه‌ها',
    icon: 'projects',
    parentId: null,
    children: [
      { id: 'projects.list', key: 'projects.list', title: 'لیست پروژه‌ها', path: '/projects', parentId: 'projects' },
      { id: 'projects.create', key: 'projects.create', title: 'ایجاد پروژه جدید', parentId: 'projects' },
      { id: 'projects.edit', key: 'projects.edit', title: 'ویرایش پروژه', parentId: 'projects' },
      { id: 'projects.details', key: 'projects.details', title: 'جزئیات پروژه', parentId: 'projects' },
    ],
  },
  {
    id: 'funds',
    key: 'funds',
    title: 'صندوق‌ها',
    icon: 'funds',
    parentId: null,
    children: [
      { id: 'funds.list', key: 'funds.list', title: 'لیست صندوق‌ها', path: '/funds', parentId: 'funds' },
      { id: 'funds.create', key: 'funds.create', title: 'ایجاد صندوق', parentId: 'funds' },
      { id: 'funds.edit', key: 'funds.edit', title: 'ویرایش صندوق', parentId: 'funds' },
      { id: 'funds.details', key: 'funds.details', title: 'جزئیات صندوق', parentId: 'funds' },
    ],
  },
  {
    id: 'accounts',
    key: 'accounts',
    title: 'حساب‌های مالی',
    icon: 'accounts',
    parentId: null,
    children: [
      { id: 'accounts.list', key: 'accounts.list', title: 'لیست حساب‌ها', path: '/accounts', parentId: 'accounts' },
      { id: 'accounts.create', key: 'accounts.create', title: 'ایجاد حساب', parentId: 'accounts' },
      { id: 'accounts.edit', key: 'accounts.edit', title: 'ویرایش حساب', parentId: 'accounts' },
      { id: 'accounts.transactions', key: 'accounts.transactions', title: 'تراکنش‌ها', parentId: 'accounts' },
    ],
  },
  {
    id: 'reports',
    key: 'reports',
    title: 'گزارش‌ها',
    icon: 'reports',
    parentId: null,
    children: [
      { id: 'reports.financial', key: 'reports.financial', title: 'گزارش مالی', path: '/reports', parentId: 'reports' },
      { id: 'reports.donors', key: 'reports.donors', title: 'گزارش خیرین', parentId: 'reports' },
      { id: 'reports.beneficiaries', key: 'reports.beneficiaries', title: 'گزارش مددجویان', parentId: 'reports' },
      { id: 'reports.projects', key: 'reports.projects', title: 'گزارش پروژه‌ها', parentId: 'reports' },
    ],
  },
  {
    id: 'users',
    key: 'users',
    title: 'کاربران',
    icon: 'users',
    parentId: null,
    children: [
      { id: 'users.list', key: 'users.list', title: 'لیست کاربران', path: '/users', parentId: 'users' },
      { id: 'users.create', key: 'users.create', title: 'ایجاد کاربر', parentId: 'users' },
      { id: 'users.edit', key: 'users.edit', title: 'ویرایش کاربر', parentId: 'users' },
      { id: 'users.delete', key: 'users.delete', title: 'حذف کاربر', parentId: 'users' },
      { id: 'users.permissions', key: 'users.permissions', title: 'دسترسی‌های کاربر', parentId: 'users' },
    ],
  },

  { id: 'settings', key: 'settings', title: 'تنظیمات', path: '/settings', icon: 'settings', parentId: null },
];

// لیست مسطح تمام گره‌ها — برای جستجو، شمارش کل، Select All و اعتبارسنجی
export function flattenPermissions(nodes: PermissionMenu[] = permissionsMock): PermissionMenu[] {
  const out: PermissionMenu[] = [];
  const walk = (list: PermissionMenu[]) => {
    list.forEach((n) => {
      out.push(n);
      if (n.children?.length) walk(n.children);
    });
  };
  walk(nodes);
  return out;
}

export const allPermissionIds: string[] = flattenPermissions().map((n) => n.id);
