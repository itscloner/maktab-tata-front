import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { hasAnyPermission, hasPermission } from './permission.utils';

interface PermissionGuardProps {
  permission: string | string[]; // رشته = نیاز به همان یک Permission، آرایه = کافی‌ست یکی از آن‌ها را داشته باشد
  children: ReactNode;
  fallback?: ReactNode; // اگر ندهید، به /403 هدایت می‌شود (مناسب Route)؛ برای استفاده درون‌صفحه‌ای fallback={null} بدهید
}

// برای محافظت از یک Route:
//   { path: '/beneficiaries/create', element: <PermissionGuard permission="beneficiaries.create"><BeneficiaryCreatePage/></PermissionGuard> }
// برای مخفی‌کردن یک بخش از UI (مثلاً یک دکمه یا کارت) بدون Redirect:
//   <PermissionGuard permission="beneficiaries.delete" fallback={null}><DeleteButton/></PermissionGuard>
export default function PermissionGuard({ permission, children, fallback }: PermissionGuardProps) {
  const user = useAuthStore((s) => s.user);
  const allowed = Array.isArray(permission) ? hasAnyPermission(user, permission) : hasPermission(user, permission);

  if (allowed) return <>{children}</>;
  if (fallback !== undefined) return <>{fallback}</>;
  return <Navigate to="/403" replace />;
}
