import { z } from 'zod';

export const userAccountSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ حرف باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ حرف باشد'),
  userName: z.string().min(3, 'نام کاربری باید حداقل ۳ حرف باشد'),
  mobile: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  email: z.string().email('ایمیل معتبر نیست'),
});

export type UserAccountFormValues = z.infer<typeof userAccountSchema>;
