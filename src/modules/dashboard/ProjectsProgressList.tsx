import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { alpha } from '@mui/material/styles';

interface ProjectProgress {
  title: string;
  progress: number;
}

export default function ProjectsProgressList({ data }: { data: ProjectProgress[] }) {
  return (
    <Stack spacing={2.25}>
      {data.map((p) => (
        <Stack key={p.title} spacing={0.75}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" fontWeight={600}>
              {p.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {p.progress}٪
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={p.progress}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
              '& .MuiLinearProgress-bar': { borderRadius: 4 },
            }}
          />
        </Stack>
      ))}
    </Stack>
  );
}
