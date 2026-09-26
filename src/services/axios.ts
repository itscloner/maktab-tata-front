import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

// TODO: مقدار واقعی را در .env پروژه قرار دهید، مثلاً:
// VITE_API_BASE_URL=https://localhost:5001/api
const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api';

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Token ────────────────────────────────────────────────────────
// چون هیچ AuthController‌ای برای من ارسال نشده، نحوه‌ی نگهداری توکن را
// نمی‌دانم (localStorage؟ استور Zustand؟ Cookie؟). فعلاً از یک تابع ساده
// قابل‌تعویض استفاده می‌کنم — فقط همین یک تابع را به منبع واقعی Auth
// پروژه وصل کنید، بقیه‌ی فایل نیازی به تغییر ندارد.
function getAccessToken(): string | null {
  return localStorage.getItem('accessToken'); // TODO: در صورت نیاز جایگزین کنید
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Error Handling عمومی ────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // TODO: بسته به نیاز، اینجا logout/redirect به صفحه ورود انجام شود
    }
    return Promise.reject(error);
  },
);

export default api;
