import AppThemeProvider from '@/app/providers/AppThemeProvider';
import QueryProvider from '@/app/providers/QueryProvider';
import AppRouter from '@/app/router';
import ToastHost from '@/components/common/ToastHost';

export default function App() {
  return (
    <QueryProvider>
      <AppThemeProvider>
        <AppRouter />
        <ToastHost />
      </AppThemeProvider>
    </QueryProvider>
  );
}
