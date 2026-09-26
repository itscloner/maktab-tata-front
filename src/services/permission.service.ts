import api from './axios';
import type { Permission, CreatePermissionRequest, UpdatePermissionRequest } from '../Types/permission.types';

// Routeها عیناً از MaktabTaha.WebApi.Controllers.PermissionController گرفته شده‌اند:
// [Route("api/[controller]")] → api/Permission
export const permissionService = {
  getPermissions: () => api.get<Permission[]>('/Permission'),
  getPermissionById: (id: number) => api.get<Permission>(`/Permission/${id}`),
  createPermission: (data: CreatePermissionRequest) => api.post<Permission>('/Permission', data),
  updatePermission: (id: number, data: UpdatePermissionRequest) => api.put<Permission>(`/Permission/${id}`, data),
  deletePermission: (id: number) => api.delete(`/Permission/${id}`),
};
