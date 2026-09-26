import type { AppNotification } from '@/types';
import { isoDaysAgo } from './seed';

export const notificationsMock: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'کمک جدید ثبت شد',
    message: 'یک کمک نقدی به مبلغ ۵,۰۰۰,۰۰۰ تومان توسط علی رضایی ثبت شد.',
    level: 'success',
    date: isoDaysAgo(0),
    read: false,
  },
  {
    id: 'notif_2',
    title: 'درخواست کمک در انتظار بررسی',
    message: 'یک درخواست کمک تحصیلی جدید نیازمند تایید است.',
    level: 'warning',
    date: isoDaysAgo(1),
    read: false,
  },
  {
    id: 'notif_3',
    title: 'هزینه رد شد',
    message: 'سند هزینه DOC-52014 به دلیل نقص مدارک رد شد.',
    level: 'error',
    date: isoDaysAgo(2),
    read: true,
  },
  {
    id: 'notif_4',
    title: 'گزارش ماهانه آماده است',
    message: 'گزارش مالی شهریورماه آماده مشاهده و دانلود است.',
    level: 'info',
    date: isoDaysAgo(4),
    read: true,
  },
];
