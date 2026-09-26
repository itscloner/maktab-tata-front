import type { PermissionUser } from '@/permissions/permission.types';
import { usersMock } from '@/mocks/users.mock';
import { delay } from '@/utils/delay';
import { generateId } from '@/utils/id';

// پایگاه‌داده در حافظه — بعداً با API واقعی جایگزین می‌شود بدون تغییر امضای توابع
const store: PermissionUser[] = [...usersMock];

export type UserInput = Pick<PermissionUser, 'fullName' | 'username' | 'email' | 'mobile' | 'role' | 'isActive'>;

export async function getUsers(): Promise<PermissionUser[]> {
  return delay([...store]);
}

export async function getUserById(id: string): Promise<PermissionUser | undefined> {
  return delay(store.find((u) => u.id === id));
}

export async function createUser(input: UserInput): Promise<PermissionUser> {
  const now = new Date().toISOString();
  const user: PermissionUser = {
    ...input,
    id: generateId('user'),
    avatarColor: '#0F6E5C',
    lastLoginAt: null,
    permissions: [],
    createdAt: now,
    updatedAt: now,
  };
  store.unshift(user);
  return delay(user);
}

export async function updateUser(id: string, input: Partial<UserInput>): Promise<PermissionUser | undefined> {
  const index = store.findIndex((u) => u.id === id);
  if (index === -1) return delay(undefined);
  store[index] = { ...store[index], ...input, updatedAt: new Date().toISOString() };
  return delay(store[index]);
}

// ثبت دسترسی‌های جدید یک کاربر — قلب صفحه «مدیریت دسترسی‌های کاربر»
export async function updateUserPermissions(id: string, permissions: string[]): Promise<PermissionUser | undefined> {
  const index = store.findIndex((u) => u.id === id);
  if (index === -1) return delay(undefined);
  store[index] = { ...store[index], permissions, updatedAt: new Date().toISOString() };
  return delay(store[index]);
}

export async function deleteUser(id: string): Promise<boolean> {
  const index = store.findIndex((u) => u.id === id);
  if (index === -1) return delay(false);
  store.splice(index, 1);
  return delay(true);
}
