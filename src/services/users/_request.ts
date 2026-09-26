import api from '../axios';
import type { User, CreateUserRequest, UpdateUserRequest } from '../../Types/user.types';

// Routeها عیناً از MaktabTaha.WebApi.Controllers.UserController گرفته شده‌اند:
// [Route("api/[controller]")] → api/User
// این فایل فقط مسئول ارتباط خام با API است؛ هیچ منطق React/Cache اینجا نیست —
// آن بخش در _hook.ts (با React Query) پیاده‌سازی شده.
export const usersRequest = {
  getList: () => api.get<User[]>('/User'),

  getById: (id: number) => api.get<User>(`/User/${id}`),

  create: (data: CreateUserRequest) => api.post<User>('/User', data),

  update: (id: number, data: UpdateUserRequest) => api.put<User>(`/User/${id}`, data),

  remove: (id: number) => api.delete(`/User/${id}`),
};
