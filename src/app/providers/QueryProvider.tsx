import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

// یک نمونه QueryClient برای کل اپ — تنظیمات پیش‌فرض محافظه‌کارانه
// (بدون رفرش خودکار روی فوکوس پنجره تا در فرم‌ها ناگهان داده عوض نشود)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
});

export default function QueryProvider({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
