import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const schema = z.object({
  username: z.string().min(1, 'نام کاربری الزامی است'),
  password: z.string().min(1, 'رمز عبور الزامی است'),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: '', password: '', remember: true },
  });

  const onSubmit = async (values: FormValues) => {
    setLoginError('');
    const ok = await login(values.username, values.password);
    if (ok) {
      navigate('/dashboard', { replace: true });
    } else {
      setLoginError('نام کاربری یا رمز عبور اشتباه است.');
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: { xs: 3, sm: 5 }, width: '100%', maxWidth: 420 }}>
      <Stack spacing={0.75} sx={{ mb: 3 }}>
        <Typography variant="h3">ورود به سامانه</Typography>
        <Typography variant="body2" color="text.secondary">
          برای ورود، نام کاربری و رمز عبور خود را وارد کنید.
        </Typography>
      </Stack>

      {loginError && (
        <Alert severity="error" sx={{ mb: 2.5 }}>
          {loginError}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <TextField
            label="نام کاربری"
            fullWidth
            autoFocus
            error={!!errors.username}
            helperText={errors.username?.message}
            {...register('username')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="رمز عبور"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setShowPassword((s) => !s)} edge="end">
                    {showPassword ? <VisibilityOffRoundedIcon fontSize="small" /> : <VisibilityRoundedIcon fontSize="small" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <FormControlLabel control={<Checkbox defaultChecked {...register('remember')} />} label="مرا به خاطر بسپار" />
          </Stack>
          <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
            {isSubmitting ? 'در حال ورود...' : 'ورود'}
          </Button>
          <Alert severity="info" variant="outlined" sx={{ fontSize: '0.78rem' }}>
            رمز عبور همه کاربران آزمایشی: 123456 — می‌توانید با admin (دسترسی کامل)، mohammad.karimi (مدیر خیریه)، zahra.mousavi (مسئول مالی) یا ali.rezaei (اپراتور) وارد شوید.
          </Alert>
        </Stack>
      </Box>
    </Paper>
  );
}
