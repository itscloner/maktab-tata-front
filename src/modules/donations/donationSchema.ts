import { z } from 'zod';

export const donationSchema = z.object({
  donorId: z.string().min(1, 'انتخاب خیر الزامی است'),
  amount: z.number().min(10000, 'مبلغ باید حداقل ۱۰,۰۰۰ تومان باشد'),
  type: z.enum(['نقدی', 'کارت‌به‌کارت', 'درگاه', 'واریز بانکی', 'غیرنقدی', 'صدقه', 'زکات', 'نذر']),
  date: z.string().min(1, 'تاریخ الزامی است'),
  projectId: z.string().nullable(),
  fundId: z.string().min(1, 'انتخاب صندوق الزامی است'),
  description: z.string().optional(),
});

export type DonationFormValues = z.infer<typeof donationSchema>;
