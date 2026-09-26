import { z } from "zod";

export const requestSchema = z.object({
  requestDate: z.string().min(1, "تاریخ درخواست الزامی است"),

  // اطلاعات مددجو
  nationalId: z.string().length(10, "کد ملی باید ۱۰ رقم باشد"),
  firstName: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),
  gender: z.enum(["مرد", "زن"]),
  custodyType: z.enum([
    "دارای سرپرست",
    "بدون سرپرست",
    "زن سرپرست خانوار",
    "سالمند بی‌سرپرست",
  ]),
  nationality: z.enum(["ایرانی", "افغان", "عراقی", "سایر"]),
  religion: z.enum(["اسلام", "مسیحیت", "کلیمی", "زرتشتی", "سایر"]),

  // اطلاعات تماس
  province: z.string().min(1, "استان الزامی است"),
  city: z.string().min(1, "شهر الزامی است"),
  district: z.string().min(1, "محدوده الزامی است"),
  address: z.string().min(5, "آدرس الزامی است"),
  mobile: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  phone: z.string().optional(),

  // اطلاعات درخواست
  aidType: z.enum([
    "نقدی",
    "درمانی",
    "تحصیلی",
    "جهیزیه",
    "مسکن",
    "اطعام",
    "سایر",
  ]),
  requestDescription: z.string().min(5, "شرح درخواست الزامی است"),
  referrer: z.string().min(2, "معرف الزامی است"),
});

export type RequestFormValues = z.infer<typeof requestSchema>;
