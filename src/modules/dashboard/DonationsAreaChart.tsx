import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTheme } from '@mui/material/styles';
import type { MonthlyPoint } from '@/mocks/dashboard.mock';
import { formatCompactCurrency } from '@/utils/currency';

export default function DonationsAreaChart({ data }: { data: MonthlyPoint[] }) {
  const theme = useTheme();
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="donationsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.32} />
            <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: theme.palette.text.secondary }} axisLine={false} tickLine={false} />
        <YAxis
          tickFormatter={(v) => formatCompactCurrency(v)}
          tick={{ fontSize: 11, fill: theme.palette.text.secondary }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
        <Tooltip
          formatter={(value: number) => [formatCompactCurrency(value), 'کمک‌ها']}
          contentStyle={{
            borderRadius: 10,
            border: `1px solid ${theme.palette.divider}`,
            fontFamily: 'Vazirmatn',
            fontSize: 12,
          }}
        />
        <Area type="monotone" dataKey="amount" stroke={theme.palette.primary.main} strokeWidth={2.5} fill="url(#donationsFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
