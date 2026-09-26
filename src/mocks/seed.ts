// یک RNG ساده و Deterministic برای تولید داده‌های Mock قابل تکرار
export function createRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function pickIndex(rng: () => number, length: number): number {
  return Math.floor(rng() * length);
}

export function randomInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export const AVATAR_COLORS = [
  '#0F6E5C',
  '#C68F2C',
  '#2E6E8E',
  '#8A5D1B',
  '#3E8F71',
  '#A87422',
  '#6FAB95',
];

export const FIRST_NAMES_MALE = ['علی', 'محمد', 'حسین', 'رضا', 'مهدی', 'احمد', 'امیر', 'حسن', 'جواد', 'کریم'];
export const FIRST_NAMES_FEMALE = ['زهرا', 'فاطمه', 'مریم', 'سارا', 'نرگس', 'الهام', 'سمیه', 'لیلا', 'محدثه', 'زینب'];
export const LAST_NAMES = ['رضایی', 'محمدی', 'حسینی', 'کریمی', 'احمدی', 'موسوی', 'صادقی', 'نجفی', 'قاسمی', 'رحیمی', 'یوسفی', 'ابراهیمی'];
export const CITIES = ['تهران', 'مشهد', 'اصفهان', 'شیراز', 'تبریز', 'قم', 'کرج', 'اهواز'];

export function randomFullName(rng: () => number): { firstName: string; lastName: string } {
  const isMale = rng() > 0.5;
  const firstName = pick(rng, isMale ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE);
  const lastName = pick(rng, LAST_NAMES);
  return { firstName, lastName };
}

export function randomNationalId(rng: () => number): string {
  let id = '';
  for (let i = 0; i < 10; i += 1) id += randomInt(rng, 0, 9);
  return id;
}

export function randomMobile(rng: () => number): string {
  return `09${randomInt(rng, 10, 39)}${randomInt(rng, 1000000, 9999999)}`;
}
