// منوی Sidebar عیناً از درخت Permission می‌آید تا هرگز از هم Sync نشوند:
// هر منو = یک Permission؛ اضافه/حذف یک Permission در permissions.mock.ts
// به‌صورت خودکار در Sidebar هم منعکس می‌شود.
export { permissionsMock as menusMock, flattenPermissions as flattenMenus } from './permissions.mock';
export type { PermissionMenu as MenuNode } from '@/permissions/permission.types';
