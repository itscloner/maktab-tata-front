import { z } from 'zod';

export const beneficiarySchema = z.object({
  firstName: z.string().min(2, 'نام باید حداقل ۲ حرف باشد'),
  lastName: z.string().min(2, 'نام خانوادگی باید حداقل ۲ حرف باشد'),
  nationalId: z.string().length(10, 'کد ملی باید ۱۰ رقم باشد'),
  mobile: z.string().regex(/^09\d{9}$/, 'شماره موبایل معتبر نیست'),
  address: z.string().min(1, 'آدرس الزامی است'),
  city: z.string().min(1, 'شهر الزامی است'),
  economicStatus: z.enum(['بحرانی', 'ضعیف', 'متوسط', 'نیازمند بررسی مجدد']),
  caseStatus: z.enum(['فعال', 'غیرفعال', 'در انتظار بررسی', 'مختومه']),
});

export type BeneficiaryFormValues = z.infer<typeof beneficiarySchema>;
