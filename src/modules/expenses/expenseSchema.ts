import { z } from 'zod';

export const expenseSchema = z.object({
  title: z.string().min(2, 'عنوان الزامی است'),
  category: z.enum(['کمک به مددجویان', 'درمان', 'آموزش', 'مواد غذایی', 'اجاره', 'حقوق', 'حمل‌ونقل', 'تجهیزات', 'سایر']),
  amount: z.number().min(1000, 'مبلغ باید حداقل ۱,۰۰۰ تومان باشد'),
  date: z.string().min(1, 'تاریخ الزامی است'),
  projectId: z.string().nullable(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
