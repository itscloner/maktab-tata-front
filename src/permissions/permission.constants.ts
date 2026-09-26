import { SUPER_ADMIN_ROLE } from './permission.types';

export { SUPER_ADMIN_ROLE };

// دسترسی‌های پیش‌فرض برای هر Role — صرفاً برای مقداردهی اولیه Mock Userها استفاده می‌شود.
// نکته: از این پس، منبع حقیقت دسترسیِ هر کاربر، آرایه permissions خودِ همان کاربر است، نه Role.
export const ROLE_PRESET_PERMISSIONS: Record<string, string[]> = {
  'مدیر خیریه': [
    'dashboard',
    'donors', 'donors.list', 'donors.create', 'donors.edit', 'donors.delete', 'donors.details',
    'beneficiaries', 'beneficiaries.list', 'beneficiaries.create', 'beneficiaries.edit', 'beneficiaries.delete', 'beneficiaries.details',
    'requests', 'requests.list', 'requests.create', 'requests.approve', 'requests.details',
    'donations', 'donations.list', 'donations.create', 'donations.edit', 'donations.delete', 'donations.details',
    'projects', 'projects.list', 'projects.create', 'projects.edit', 'projects.details',
    'reports', 'reports.financial', 'reports.donors', 'reports.beneficiaries', 'reports.projects',
  ],
  'مسئول مالی': [
    'dashboard',
    'donations', 'donations.list', 'donations.create', 'donations.edit', 'donations.details',
    'expenses', 'expenses.list', 'expenses.create', 'expenses.edit', 'expenses.details',
    'funds', 'funds.list', 'funds.create', 'funds.edit', 'funds.details',
    'accounts', 'accounts.list', 'accounts.create', 'accounts.edit', 'accounts.transactions',
    'reports', 'reports.financial',
  ],
  'اپراتور': [
    'dashboard',
    'donors', 'donors.list',
    'beneficiaries', 'beneficiaries.list', 'beneficiaries.create',
    'requests', 'requests.list', 'requests.create',
    'donations', 'donations.list', 'donations.create',
  ],
  'مشاهده‌گر': ['dashboard'],
};
