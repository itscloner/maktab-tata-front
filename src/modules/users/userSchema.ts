import { z } from 'zod';

export const userSchema = z.object({
  fullName: z.string().min(3, 'نام و نام خانوادگی باید حداقل ۳ حرف باشد'),
  username: z.string().min(3, 'نام کاربری باید حداقل ۳ حرف باشد'),
  email: z.string().email('ایمیل معتبر نیست'),
  mobile: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  role: z.enum(['مدیر سیستم', 'مدیر خیریه', 'مسئول مالی', 'اپراتور', 'مشاهده‌گر']),
  isActive: z.boolean(),
});

export type UserFormValues = z.infer<typeof userSchema>;
