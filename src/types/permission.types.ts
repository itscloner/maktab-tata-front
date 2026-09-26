// بر اساس MaktabTaha.Domain.Entites.Permission (فایل Permission.cs که ارسال شد)
export interface Permission {
  id: number;
  title: string;
}

// TODO: از CreatePermissionCommand.cs تکمیل شود
export type CreatePermissionRequest = Record<string, unknown>;
// TODO: از UpdatePermissionCommand.cs تکمیل شود
export type UpdatePermissionRequest = Record<string, unknown>;
