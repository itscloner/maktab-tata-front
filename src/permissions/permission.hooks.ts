import { useMemo } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { hasAllPermissions, hasAnyPermission, hasPermission } from './permission.utils';

// دسترسی به یک Permission واحد — برای نمایش/مخفی‌کردن Actionهای داخل صفحه
export function usePermission(permissionId: string): boolean {
  const user = useAuthStore((s) => s.user);
  return useMemo(() => hasPermission(user, permissionId), [user, permissionId]);
}

export function useAnyPermission(permissionIds: string[]): boolean {
  const user = useAuthStore((s) => s.user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => hasAnyPermission(user, permissionIds), [user, permissionIds.join(',')]);
}

export function useAllPermissions(permissionIds: string[]): boolean {
  const user = useAuthStore((s) => s.user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => hasAllPermissions(user, permissionIds), [user, permissionIds.join(',')]);
}

export function useCurrentPermissionUser() {
  return useAuthStore((s) => s.user);
}
