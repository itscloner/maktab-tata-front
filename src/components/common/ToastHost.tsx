import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useToastStore } from '@/stores/toastStore';

export default function ToastHost() {
  const { toasts, dismiss } = useToastStore();
  return (
    <Stack sx={{ position: 'fixed', bottom: 24, insetInlineStart: 24, zIndex: 2000, gap: 1 }}>
      {toasts.map((t) => (
        <Snackbar key={t.id} open anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} sx={{ position: 'static' }}>
          <Alert severity={t.severity} variant="filled" onClose={() => dismiss(t.id)} sx={{ minWidth: 280 }}>
            {t.message}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
}
