# سامانه مدیریت خیریه مکتب طه

پنل مدیریت خیریه — React + TypeScript + Vite + Material UI (RTL/فارسی).
در این مرحله بدون Backend؛ تمام داده‌ها Mock هستند اما معماری برای اتصال به API واقعی در آینده آماده است
(فقط لایه `src/services/mock` باید با فراخوانی‌های API واقعی جایگزین شود).

## اجرا

```bash
npm install
npm run dev
```

سپس آدرس نمایش‌داده‌شده در ترمینال (معمولاً http://localhost:5173) را باز کنید.

## ورود آزمایشی

رمز عبور همه کاربران آزمایشی: `123456`

| نام کاربری | نقش | دسترسی |
|---|---|---|
| `admin` | مدیر سیستم (Super Admin) | کامل — بدون نیاز به انتخاب تک‌تک دسترسی |
| `mohammad.karimi` | مدیر خیریه | خیرین، مددجویان، کمک‌ها، پروژه‌ها، گزارش‌ها |
| `zahra.mousavi` | مسئول مالی | کمک‌ها، هزینه‌ها، صندوق‌ها، حساب‌ها، گزارش مالی |
| `ali.rezaei` | اپراتور | دسترسی محدود (لیست/ایجاد چند بخش) |
| `narges.hosseini` | مشاهده‌گر | فقط داشبورد |

## سیستم دسترسی‌ها (Permissions)

- منبع واحد حقیقت: `src/mocks/permissions.mock.ts` — یک درخت Permission که هر گره آن معادل یک منو/زیرمنوی پنل است.
- منطق مرکزی (هرگز در Componentها تکرار نمی‌شود): `src/permissions/` شامل types، utils، هوک‌ها (`usePermission`) و `<PermissionGuard>`.
- **Sidebar** به‌صورت خودکار بر اساس دسترسی‌های کاربر فیلتر می‌شود (`getNavigableMenu`).
- **Routeها** با `<PermissionGuard permission="...">` محافظت شده‌اند؛ ورود مستقیم به یک URL غیرمجاز به صفحه `/403` هدایت می‌شود.
- **دکمه‌های داخل صفحه** (ویرایش/حذف/افزودن) هم با `usePermission(...)` مخفی می‌شوند.
- صفحه `کاربران ← مدیریت دسترسی‌ها` (`/users/:id/permissions`) امکان تنظیم درختی دسترسی هر کاربر را با رفتار Parent/Child هوشمند (Indeterminate)، جستجو، انتخاب همه، ذخیره و بازنشانی فراهم می‌کند.
- کاربر با نقش «مدیر سیستم» همیشه دسترسی کامل دارد و از این تنظیمات مستثنی است.

## ساخت نسخه Production

```bash
npm run build
npm run preview
```

## ساختار پروژه

```
src/
├── app/            روتر و Providerها
├── components/     کامپوننت‌های Reusable (common, forms, tables, dialogs)
├── layouts/         Layout داشبورد و ورود
├── modules/         صفحات هر بخش (donors, beneficiaries, donations, ...)
├── mocks/           داده‌های Mock تایپ‌شده
├── services/mock/   لایه Service — در آینده با API واقعی جایگزین می‌شود
├── stores/          Zustand stores (auth, theme, ui, toast)
├── theme/           تنظیمات MUI Theme (RTL، پالت رنگ، تایپوگرافی)
├── types/           تایپ‌های TypeScript دامنه
└── utils/           ابزارهای تاریخ شمسی، فرمت ارز و ...
```

## نکات فنی

- تبدیل تاریخ میلادی به شمسی با یک الگوریتم مستقل (بدون وابستگی خارجی) در `src/utils/date.ts` انجام می‌شود.
- برای فعال‌سازی RTL از `stylis-plugin-rtl` + `@emotion/cache` استفاده شده است.
- فونت `Vazirmatn` از طریق پکیج `@fontsource/vazirmatn` بارگذاری می‌شود.
- تصاویر آواتار به‌صورت حروف اول نام (Initials) رندر می‌شوند تا پروژه به‌طور کامل آفلاین کار کند؛
  ایلوستریشن‌های صفحه ورود و وضعیت خالی/خطا نیز SVG داخلی هستند.

## لایه اتصال به Backend واقعی (.NET Core)

علاوه بر لایه Mock (`src/services/mock`)، یک لایه جدا برای اتصال به API واقعی اضافه شده:

```
src/
├── Services/
│   ├── axios.ts                  ← Axios instance + Interceptor توکن و خطا
│   ├── user.service.ts
│   ├── permission.service.ts
│   └── user-permission.service.ts
└── Types/
    ├── user.types.ts
    ├── permission.types.ts
    └── user-permission.types.ts
```

قبل از استفاده:

1. فایل `.env.example` را کپی و به `.env` تغییر نام دهید، سپس `VITE_API_BASE_URL` را با آدرس واقعی Backend پر کنید.
2. در `src/Services/axios.ts` تابع `getAccessToken` را به منبع واقعی نگهداری توکن پروژه (Zustand/localStorage/Cookie) وصل کنید.
3. برخی Requestها فعلاً `Record<string, unknown>` هستند (علامت‌گذاری شده با `TODO`) چون فایل‌های Command مربوطه (`CreateUserCommand.cs` و مشابه) هنوز بررسی نشده‌اند؛ با ارسال آن فایل‌ها، Typeهای دقیق تکمیل می‌شوند.

این لایه هنوز به هیچ Component یا React Query Hook متصل نشده — طبق درخواست، فقط Service Layer پیاده‌سازی شده است.

## ماژول کاربران — متصل به API واقعی (React Query)

این ماژول (برخلاف بقیه‌ی پروژه که هنوز Mock است) مستقیماً به Backend واقعی وصل می‌شود و الگوی درخواستی شما را پیاده می‌کند:

```
src/Services/
└── users/
    ├── _request.ts   ← توابع خام Axios (بدون هیچ منطق React)
    └── _hook.ts       ← useUsersListQuery, useUserByIdQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation
```

صفحات آن در `src/modules/user-accounts/` هستند و با مسیرهای `/user-accounts` (لیست) و `/user-accounts/:id` (جزئیات) در روتر وصل شده‌اند. فرم ایجاد/ویرایش به‌صورت Dialog است (مطابق الگوی خیرین).

**نکات مهم قبل از ادامه‌دادن:**

1. این مسیر فعلاً در Sidebar/درخت Permission نیست (چون گفتید بقیه را خودتان جلو می‌برید) — برای اضافه‌کردنش به منو، یک گره جدید به `src/mocks/permissions.mock.ts` اضافه کنید.
2. فیلد `email` در فایل `User.cs` که قبلاً بررسی کردیم وجود نداشت؛ فرض شده در توسعه بک‌اند اضافه شده — اگر نام دقیق فیلد در Response چیز دیگری است، فقط `src/Types/user.types.ts` را اصلاح کنید.
3. فرم «ایجاد کاربر» فیلد رمز عبور ندارد چون در فیلدهای اعلامی شما نبود؛ اگر `CreateUserCommand` بک‌اند به آن نیاز دارد (که معمولاً همین‌طور است)، باید دستی اضافه‌اش کنید.
4. برای اجرای این ماژول حتماً `npm install` را دوباره بزنید (بسته‌ی `@tanstack/react-query` تازه اضافه شده) و `VITE_API_BASE_URL` را در `.env` تنظیم کنید.
