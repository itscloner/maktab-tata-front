// تایپ‌های مرکزی سیستم Permission — محور اصلی: دسترسی به منو/زیرمنو.
// این فایل تنها منبع تعریف تایپ‌هاست تا در آینده با اتصال Backend واقعی
// (که همین ساختار را از API برمی‌گرداند) نیازی به تغییر نباشد.

export interface PermissionMenu {
  id: string; // شناسه یکتا و سلسله‌مراتبی — مثلاً beneficiaries.create
  title: string;
  key: string; // معمولاً برابر id؛ برای اتصال به Backend واقعی (کد Permission) نگه داشته شده
  path?: string;
  icon?: string;
  parentId: string | null;
  children?: PermissionMenu[];
}

export type UserRole = 'مدیر سیستم' | 'مدیر خیریه' | 'مسئول مالی' | 'اپراتور' | 'مشاهده‌گر';

// نقشی که به‌صورت ویژه همیشه دسترسی کامل دارد و نیازی به انتخاب تک‌تک Permission ندارد
export const SUPER_ADMIN_ROLE: UserRole = 'مدیر سیستم';

export interface PermissionUser {
  id: string;
  fullName: string;
  username: string;
  mobile: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatarColor: string;
  lastLoginAt: string | null;
  permissions: string[]; // آرایه‌ای از PermissionMenu.id — برای Super Admin نادیده گرفته می‌شود
  createdAt: string;
  updatedAt: string;
}
