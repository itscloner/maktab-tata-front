import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Stack spacing={1.25} sx={{ p: 2 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="rounded" height={44} sx={{ borderRadius: 2 }} />
      ))}
    </Stack>
  );
}

export function CardSkeleton({ height = 120 }: { height?: number }) {
  return <Skeleton variant="rounded" height={height} sx={{ borderRadius: 4 }} />;
}

export default function PageLoader() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rounded" height={32} width={220} />
      <Stack direction="row" spacing={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rounded" height={110} sx={{ flex: 1, borderRadius: 4 }} />
        ))}
      </Stack>
      <Skeleton variant="rounded" height={360} sx={{ borderRadius: 4 }} />
    </Stack>
  );
}
