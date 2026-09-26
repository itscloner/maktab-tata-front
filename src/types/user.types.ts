// بر اساس فیلدهای اعلام‌شده توسط شما برای ماژول کاربران.
// نکته: در فایل User.cs که قبلاً بررسی کردیم Email وجود نداشت؛ فرض بر این است
// که در توسعه بک‌اند این فیلد اضافه شده. اگر نام دقیق فیلد در Response بک‌اند
// چیز دیگری است (مثلاً EmailAddress)، همین یک خط را اصلاح کنید.
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  mobile: string;
  email: string;
  lastEntry: string | null; // DateTime? در بک‌اند → ISO string در JSON؛ فقط نمایشی است
}

// فیلدهای قابل‌ویرایش فرم — بدون شناسه و بدون lastEntry (که فقط توسط سرور ست می‌شود)
export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  userName: string;
  mobile: string;
  email: string;
  // TODO: بک‌اند برای ساخت کاربر قطعاً یک فیلد مربوط به رمز عبور می‌خواهد
  // (چون در Entity، PasswordHash نال‌پذیر نیست به‌صورت منطقی برای ورود).
  // چون در فیلدهای درخواستی شما ذکر نشده، این‌جا اضافه نکردم؛
  // بعداً که CreateUserCommand.cs را فرستادید یا خودتان مطمئن شدید، این خط را اضافه کنید:
  // password: string;
}

export type UpdateUserRequest = CreateUserRequest;
