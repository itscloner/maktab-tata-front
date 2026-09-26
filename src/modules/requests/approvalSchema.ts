import { z } from 'zod';

export const approvalSchema = z.object({
  approvalDate: z.string().min(1, 'تاریخ تایید الزامی است'),
  decision: z.enum(['تایید', 'رد']),
  reason: z.string().min(3, 'علت تایید یا رد الزامی است'),
  description: z.string().optional(),
});

export type ApprovalFormValues = z.infer<typeof approvalSchema>;
