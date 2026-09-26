import type { User } from './user.types';
import type { Permission } from './permission.types';

// بر اساس MaktabTaha.Domain.Entites.UserPermission — کلید این موجودیت ترکیبی
// (userId + permissionId) است، نه یک id ساده؛ دقیقاً مطابق روت
// [HttpGet("{userId}/{permissionId}")] در UserPermissionController
export interface UserPermission {
  userId: number;
  permissionId: number;
  user?: User; // TODO: تأیید شود که آیا Response این Navigation Propertyها را serialize می‌کند
  permission?: Permission; // TODO: همین‌طور
}

// TODO: از CreateUserPermissionCommand.cs تکمیل شود
export type CreateUserPermissionRequest = Record<string, unknown>;
// TODO: از UpdateUserPermissionCommand.cs تکمیل شود
export type UpdateUserPermissionRequest = Record<string, unknown>;
