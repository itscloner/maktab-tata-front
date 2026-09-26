import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import StatusChip from '@/components/common/StatusChip';
import { formatCurrency } from '@/utils/currency';
import { formatPersianDate } from '@/utils/date';

interface Row {
  id: string;
  kind: 'کمک' | 'هزینه';
  title: string;
  amount: number;
  date: string;
  status: string;
}

export default function RecentTransactionsTable({ rows }: { rows: Row[] }) {
  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>نوع</TableCell>
          <TableCell>عنوان</TableCell>
          <TableCell>مبلغ</TableCell>
          <TableCell>تاریخ</TableCell>
          <TableCell>وضعیت</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.id} hover>
            <TableCell>
              <Chip
                size="small"
                label={r.kind}
                sx={{
                  bgcolor: (theme) => alpha(r.kind === 'کمک' ? theme.palette.primary.main : theme.palette.secondary.main, 0.12),
                  color: (theme) => (r.kind === 'کمک' ? theme.palette.primary.main : theme.palette.secondary.dark),
                  fontWeight: 700,
                }}
              />
            </TableCell>
            <TableCell>{r.title}</TableCell>
            <TableCell sx={{ fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(r.amount)}</TableCell>
            <TableCell sx={{ fontVariantNumeric: 'tabular-nums' }}>{formatPersianDate(r.date)}</TableCell>
            <TableCell>
              <StatusChip label={r.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
