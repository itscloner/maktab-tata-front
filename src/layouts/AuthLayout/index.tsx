import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import { LoginHeroIllustration } from '@/components/common/illustrations';

export default function AuthLayout() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(160deg, #07372F 0%, #0F6E5C 55%, #3E8F71 100%)',
          color: '#fff',
          p: 6,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <svg width="34" height="34" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.12)" />
            <path d="M16 7c-3.5 3-5.5 6.2-5.5 9.3 0 3.4 2.5 6.2 5.5 6.2s5.5-2.8 5.5-6.2C21.5 13.2 19.5 10 16 7z" fill="#F2C572" />
          </svg>
          <Typography variant="h5" fontWeight={700}>مکتب طه</Typography>
        </Stack>

        <Stack alignItems="center" spacing={4}>
          <LoginHeroIllustration />
          <Stack spacing={1} alignItems="center" textAlign="center" maxWidth={380}>
            <Typography variant="h4" fontWeight={700}>
              همراه شما در مسیر نیکوکاری
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              مدیریت شفاف کمک‌ها، پرونده‌های مددجویان و پروژه‌های خیریه، همه در یک سامانه.
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} خیریه مکتب طه. تمامی حقوق محفوظ است.
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          bgcolor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
