import type { ReactNode } from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { rtlCache } from '@/theme/rtlCache';
import { buildTheme } from '@/theme';
import { useThemeStore } from '@/stores/themeStore';

export default function AppThemeProvider({ children }: { children: ReactNode }) {
  const mode = useThemeStore((s) => s.mode);
  const theme = buildTheme(mode);
  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
