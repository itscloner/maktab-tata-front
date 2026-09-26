import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PermissionUser } from '@/permissions/permission.types';
import { usersMock } from '@/mocks/users.mock';

export type AuthUser = Pick<PermissionUser, 'id' | 'username' | 'fullName' | 'role' | 'permissions'>;

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Mock Authentication — در آینده با فراخوانی سرویس احراز هویت واقعی جایگزین می‌شود.
// رمز عبور برای همه کاربران Mock یکسان است تا بتوان هر یک از نقش‌ها را امتحان کرد.
const MOCK_PASSWORD = '123456';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (username, password) => {
        await new Promise((r) => setTimeout(r, 700));
        const found = usersMock.find((u) => u.username === username && u.isActive);
        if (found && password === MOCK_PASSWORD) {
          set({
            user: {
              id: found.id,
              username: found.username,
              fullName: found.fullName,
              role: found.role,
              permissions: found.permissions,
            },
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'mokt-auth' },
  ),
);
