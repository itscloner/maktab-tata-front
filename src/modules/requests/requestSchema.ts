import { z } from "zod";

export const requestSchema = z.object({
  requestDate: z.string().min(1, "تاریخ درخواست الزامی است"),

  requestDescription: z
    .string()
    .trim()
    .min(5, "شرح درخواست باید حداقل ۵ کاراکتر باشد"),

  requestTypeId: z.number().int().positive("نوع درخواست الزامی است"),

  clientFirstName: z.string().trim().min(2, "نام باید حداقل ۲ حرف باشد"),

  clientLastName: z
    .string()
    .trim()
    .min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),

  houseHeadStatusId: z.number().int().positive("نوع سرپرستی الزامی است"),

  gender: z.string().min(1, "جنسیت الزامی است"),

  refererId: z.number().int().positive("معرف الزامی است"),

  nationaltyId: z.number().int().positive("ملیت الزامی است"),

  provinceId: z.number().int().positive("استان الزامی است"),

  cityId: z.number().int().positive("شهر الزامی است"),

  address: z.string().trim().min(5, "آدرس الزامی است"),

  mobileNumber: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

  homeNumber: z.string().trim().optional(),

  areaId: z.number().int().positive("منطقه الزامی است"),

  religonId: z.number().int().positive("دین الزامی است"),
});

export type RequestFormValues = z.infer<typeof requestSchema>;
