import { createTheme, type ThemeOptions, type PaletteMode } from '@mui/material/styles';
import { faIR } from '@mui/material/locale';
import { palette, shape, fontFamily } from './tokens';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  direction: 'rtl',
  palette: {
    mode,
    primary: {
      main: palette.emerald[500],
      light: palette.emerald[300],
      dark: palette.emerald[700],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: palette.saffron[500],
      light: palette.saffron[300],
      dark: palette.saffron[700],
      contrastText: palette.ink[900],
    },
    error: { main: palette.clay },
    info: { main: palette.sky },
    success: { main: palette.emerald[400] },
    warning: { main: palette.saffron[400] },
    background:
      mode === 'light'
        ? { default: '#FAF9F6', paper: '#FFFFFF' }
        : { default: palette.ink[900], paper: '#182420' },
    text:
      mode === 'light'
        ? { primary: palette.ink[900], secondary: palette.ink[500] }
        : { primary: '#EDF2F0', secondary: palette.ink[300] },
    divider: mode === 'light' ? palette.ink[100] : 'rgba(255,255,255,0.09)',
  },
  shape: { borderRadius: shape.radius },
  typography: {
    fontFamily,
    h1: { fontWeight: 700, fontSize: '2.25rem' },
    h2: { fontWeight: 700, fontSize: '1.875rem' },
    h3: { fontWeight: 700, fontSize: '1.5rem' },
    h4: { fontWeight: 600, fontSize: '1.25rem' },
    h5: { fontWeight: 600, fontSize: '1.05rem' },
    h6: { fontWeight: 600, fontSize: '0.95rem' },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500, fontSize: '0.825rem' },
    body1: { fontSize: '0.9rem' },
    body2: { fontSize: '0.825rem' },
    button: { fontWeight: 600, textTransform: 'none' },
    caption: { fontSize: '0.72rem' },
  },
  shadows: [
    'none',
    '0 1px 2px rgba(18,27,24,0.05)',
    '0 2px 6px rgba(18,27,24,0.06)',
    '0 4px 10px rgba(18,27,24,0.07)',
    '0 6px 14px rgba(18,27,24,0.08)',
    ...Array(20).fill('0 8px 20px rgba(18,27,24,0.10)'),
  ] as ThemeOptions['shadows'],
});

const componentOverrides = (mode: PaletteMode): ThemeOptions['components'] => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        fontFeatureSettings: '"ss01"',
      },
      '::selection': {
        backgroundColor: palette.saffron[200],
      },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: { borderRadius: 8, paddingInline: 16 },
      sizeMedium: { paddingBlock: 8 },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' },
      rounded: { borderRadius: shape.radiusLg },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: shape.radiusLg,
        border: `1px solid ${mode === 'light' ? palette.ink[100] : 'rgba(255,255,255,0.08)'}`,
        boxShadow: 'none',
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 8, fontWeight: 600 },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: { fontWeight: 700, fontSize: '0.8rem' },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: { border: 'none' },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: { fontFamily, fontSize: '0.75rem' },
    },
  },
});

export const buildTheme = (mode: PaletteMode) => {
  const base = createTheme(getDesignTokens(mode), faIR);
  return createTheme(base, { components: componentOverrides(mode) }, faIR);
};
