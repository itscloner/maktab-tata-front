import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ErrorIllustration } from './illustrations';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'دریافت اطلاعات با خطا مواجه شد.',
  description = 'لطفاً اتصال خود را بررسی کرده و دوباره تلاش کنید.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ py: 8, px: 2, textAlign: 'center' }}>
      <ErrorIllustration />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
        {description}
      </Typography>
      {onRetry && (
        <Button variant="outlined" color="error" onClick={onRetry}>
          تلاش مجدد
        </Button>
      )}
    </Stack>
  );
}
