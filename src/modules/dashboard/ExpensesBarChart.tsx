import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useTheme } from '@mui/material/styles';
import type { MonthlyPoint } from '@/mocks/dashboard.mock';
import { formatCompactCurrency } from '@/utils/currency';

export default function ExpensesBarChart({ data }: { data: MonthlyPoint[] }) {
  const theme = useTheme();
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
          formatter={(value: number) => [formatCompactCurrency(value), 'هزینه‌ها']}
          contentStyle={{
            borderRadius: 10,
            border: `1px solid ${theme.palette.divider}`,
            fontFamily: 'Vazirmatn',
            fontSize: 12,
          }}
        />
        <Bar dataKey="amount" fill={theme.palette.secondary.main} radius={[6, 6, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}
