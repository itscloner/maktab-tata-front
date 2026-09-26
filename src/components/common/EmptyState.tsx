import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { EmptyBoxIllustration } from './illustrations';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ py: 8, px: 2, textAlign: 'center' }}>
      <EmptyBoxIllustration />
      <Typography variant="h6">{title}</Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
          {description}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Box pt={1}>
          <Button variant="contained" onClick={onAction}>
            {actionLabel}
          </Button>
        </Box>
      )}
    </Stack>
  );
}
