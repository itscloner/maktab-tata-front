import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useNavigate } from 'react-router-dom';
import { ErrorIllustration } from '@/components/common/illustrations';

export default function ForbiddenPage() {
  const navigate = useNavigate();
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ minHeight: '70vh', textAlign: 'center', px: 2 }}
    >
      <ErrorIllustration color="#C68F2C" />
      <Typography variant="h2">۴۰۳ — دسترسی غیرمجاز</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 420 }}>
        شما مجوز لازم برای مشاهده این صفحه را ندارید. در صورت نیاز به دسترسی، با مدیر سیستم تماس بگیرید.
      </Typography>
      <Button variant="contained" startIcon={<ArrowForwardRoundedIcon />} onClick={() => navigate('/dashboard')}>
        بازگشت به داشبورد
      </Button>
    </Stack>
  );
}
