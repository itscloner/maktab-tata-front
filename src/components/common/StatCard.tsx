import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  accent?: string;
  trend?: { value: string; positive: boolean };
}

export default function StatCard({ label, value, icon, accent, trend }: StatCardProps) {
  const theme = useTheme();
  const color = accent ?? theme.palette.primary.main;
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: alpha(color, 0.12),
            color,
          }}
        >
          {icon}
        </Box>
      </Stack>
      <Typography variant="h3" sx={{ fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </Typography>
      {trend && (
        <Typography
          variant="caption"
          sx={{ color: trend.positive ? theme.palette.success.main : theme.palette.error.main, fontWeight: 700 }}
        >
          {trend.positive ? '▲' : '▼'} {trend.value}
        </Typography>
      )}
    </Paper>
  );
}
