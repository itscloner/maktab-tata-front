import type { PermissionMenu, PermissionUser } from './permission.types';
import { SUPER_ADMIN_ROLE } from './permission.types';
import { flattenPermissions, permissionsMock } from '@/mocks/permissions.mock';

// ── بررسی دسترسی ────────────────────────────────────────────────
// تمام Componentها و Hookها باید این توابع را صدا بزنند؛ منطق هرگز نباید تکرار شود.

export function hasPermission(user: Pick<PermissionUser, 'role' | 'permissions'> | null | undefined, permissionId: string): boolean {
  if (!user) return false;
  if (user.role === SUPER_ADMIN_ROLE) return true;
  return user.permissions.includes(permissionId);
}

export function hasAnyPermission(user: Pick<PermissionUser, 'role' | 'permissions'> | null | undefined, permissionIds: string[]): boolean {
  if (!user) return false;
  if (user.role === SUPER_ADMIN_ROLE) return true;
  return permissionIds.some((id) => user.permissions.includes(id));
}

export function hasAllPermissions(user: Pick<PermissionUser, 'role' | 'permissions'> | null | undefined, permissionIds: string[]): boolean {
  if (!user) return false;
  if (user.role === SUPER_ADMIN_ROLE) return true;
  return permissionIds.every((id) => user.permissions.includes(id));
}

// ── فیلتر منو بر اساس دسترسی ────────────────────────────────────
// یک گروه Parent وقتی نمایش داده می‌شود که خودش یا حداقل یکی از Childهایش مجاز باشد.
export function filterMenuByPermissions(
  menu: PermissionMenu[],
  user: Pick<PermissionUser, 'role' | 'permissions'> | null | undefined,
): PermissionMenu[] {
  if (!user) return [];
  if (user.role === SUPER_ADMIN_ROLE) return menu;

  const walk = (nodes: PermissionMenu[]): PermissionMenu[] =>
    nodes.reduce<PermissionMenu[]>((acc, node) => {
      const children = node.children ? walk(node.children) : undefined;
      const selfAllowed = hasPermission(user, node.id);
      if (selfAllowed || (children && children.length > 0)) {
        acc.push({ ...node, children });
      }
      return acc;
    }, []);

  return walk(menu);
}

// ── منطق Tree Checkbox (Parent/Child هوشمند) ────────────────────

export type CheckState = 'checked' | 'unchecked' | 'indeterminate';

export function getNodeCheckState(node: PermissionMenu, selected: Set<string>): CheckState {
  const allIds = flattenPermissions([node]).map((n) => n.id);
  const selectedCount = allIds.filter((id) => selected.has(id)).length;
  if (selectedCount === 0) return 'unchecked';
  if (selectedCount === allIds.length) return 'checked';
  return 'indeterminate';
}

// تیک‌زدن/برداشتن یک گره: خودش + تمام فرزندانش با هم تغییر می‌کنند
export function toggleNodeSelection(node: PermissionMenu, selected: Set<string>, checked: boolean): Set<string> {
  const next = new Set(selected);
  const ids = flattenPermissions([node]).map((n) => n.id);
  ids.forEach((id) => (checked ? next.add(id) : next.delete(id)));
  return next;
}

export function selectAllPermissions(menu: PermissionMenu[] = []): Set<string> {
  return new Set(flattenPermissions(menu.length ? menu : undefined).map((n) => n.id));
}

// جستجو در درخت بدون خراب‌کردن ساختار: اگر خودش یا هر فرزندی match شود، کل مسیر نگه داشته می‌شود
export function filterMenuBySearch(menu: PermissionMenu[], query: string): PermissionMenu[] {
  const q = query.trim();
  if (!q) return menu;

  const matches = (title: string) => title.includes(q);

  const walk = (nodes: PermissionMenu[]): PermissionMenu[] =>
    nodes.reduce<PermissionMenu[]>((acc, node) => {
      const children = node.children ? walk(node.children) : undefined;
      if (matches(node.title) || (children && children.length > 0)) {
        acc.push({ ...node, children: children && children.length > 0 ? children : node.children });
      }
      return acc;
    }, []);

  return walk(menu);
}

// ── ساخت منوی قابل‌ناوبری Sidebar ────────────────────────────────
// فقط گره‌هایی که خودشان یک صفحه‌ی ثابت (بدون پارامتر :id) دارند، یا زیرمجموعه‌ای
// قابل‌ناوبری دارند، در Sidebar نمایش داده می‌شوند. Permissionهای صرفاً عملیاتی
// (ویرایش/حذف/جزئیات) هرگز آیتم مستقل Sidebar نیستند — فقط دکمه‌های صفحه را کنترل می‌کنند.
function isNavigablePath(path?: string): boolean {
  return !!path && !path.includes(':');
}

export function getNavigableMenu(
  user: Pick<PermissionUser, 'role' | 'permissions'> | null | undefined,
): PermissionMenu[] {
  const allowed = filterMenuByPermissions(permissionsMock, user);

  const prune = (nodes: PermissionMenu[]): PermissionMenu[] =>
    nodes.reduce<PermissionMenu[]>((acc, node) => {
      const children = node.children ? prune(node.children.filter((c) => isNavigablePath(c.path))) : undefined;
      if (isNavigablePath(node.path) || (children && children.length > 0)) {
        acc.push({ ...node, children: children && children.length > 0 ? children : undefined });
      }
      return acc;
    }, []);

  return prune(allowed);
}
