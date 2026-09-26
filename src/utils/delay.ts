// شبیه‌سازی تاخیر شبکه برای Mock Service Layer
export function delay<T>(value: T, ms = 350): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}
