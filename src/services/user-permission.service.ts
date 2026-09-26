import api from './axios';
import type {
  UserPermission,
  CreateUserPermissionRequest,
  UpdateUserPermissionRequest,
} from '../Types/user-permission.types';

// Routeها عیناً از MaktabTaha.WebApi.Controllers.UserPermissionController گرفته شده‌اند:
// [Route("api/[controller]")] → api/UserPermission
// نکته: کلید این موجودیت ترکیبی (userId + permissionId) است، نه یک id ساده.
export const userPermissionService = {
  getUserPermissions: () => api.get<UserPermission[]>('/UserPermission'),
  getUserPermissionById: (userId: number, permissionId: number) =>
    api.get<UserPermission>(`/UserPermission/${userId}/${permissionId}`),
  createUserPermission: (data: CreateUserPermissionRequest) =>
    api.post<UserPermission>('/UserPermission', data),
  updateUserPermission: (userId: number, permissionId: number, data: UpdateUserPermissionRequest) =>
    api.put<UserPermission>(`/UserPermission/${userId}/${permissionId}`, data),
  deleteUserPermission: (userId: number, permissionId: number) =>
    api.delete(`/UserPermission/${userId}/${permissionId}`),
};
