import { z } from 'zod';

export const donorSchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ حرف باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ حرف باشد'),
  nationalId: z.string().length(10, 'کد ملی باید ۱۰ رقم باشد'),
  mobile: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().min(1, 'شهر الزامی است'),
  status: z.enum(['فعال', 'غیرفعال']),
  notes: z.string().optional(),
});

export type DonorFormValues = z.infer<typeof donorSchema>;
