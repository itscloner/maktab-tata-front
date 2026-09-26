import Chip from '@mui/material/Chip';
import { alpha, useTheme } from '@mui/material/styles';

type Tone = 'success' | 'warning' | 'error' | 'info' | 'neutral';

const STATUS_TONE_MAP: Record<string, Tone> = {
  فعال: 'success',
  موفق: 'success',
  'تایید شده': 'success',
  غیرفعال: 'neutral',
  مختومه: 'neutral',
  'در انتظار': 'warning',
  'در انتظار بررسی': 'warning',
  'در انتظار تایید': 'warning',
  ناموفق: 'error',
  'رد شده': 'error',
};

export default function StatusChip({ label }: { label: string }) {
  const theme = useTheme();
  const tone = STATUS_TONE_MAP[label] ?? 'info';
  const colorMap: Record<Tone, string> = {
    success: theme.palette.success.main,
    warning: theme.palette.warning.dark,
    error: theme.palette.error.main,
    info: theme.palette.info.main,
    neutral: theme.palette.text.secondary,
  };
  const color = colorMap[tone];
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        color,
        bgcolor: alpha(color, 0.12),
        border: `1px solid ${alpha(color, 0.28)}`,
      }}
    />
  );
}
