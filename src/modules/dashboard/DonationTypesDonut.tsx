import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTheme } from '@mui/material/styles';
import type { DonationTypeSlice } from '@/mocks/dashboard.mock';

const COLORS = ['#0F6E5C', '#C68F2C', '#2E6E8E', '#3E8F71', '#EABD5F', '#8A5D1B', '#6FAB95', '#A87422'];

export default function DonationTypesDonut({ data }: { data: DonationTypeSlice[] }) {
  const theme = useTheme();
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="type"
          innerRadius={62}
          outerRadius={92}
          paddingAngle={2}
          strokeWidth={2}
          stroke={theme.palette.background.paper}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [`${value}%`, name]}
          contentStyle={{
            borderRadius: 10,
            border: `1px solid ${theme.palette.divider}`,
            fontFamily: 'Vazirmatn',
            fontSize: 12,
          }}
        />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          formatter={(value) => <span style={{ fontSize: 12, fontFamily: 'Vazirmatn' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
