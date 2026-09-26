import { useState, type SyntheticEvent, type ReactNode } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import PageHeader from '@/components/common/PageHeader';
import { useThemeStore } from '@/stores/themeStore';
import { useToastStore } from '@/stores/toastStore';

const TABS = ['اطلاعات خیریه', 'تنظیمات حساب', 'تنظیمات اعلان‌ها', 'ظاهر سامانه', 'تنظیمات سیستم'];

function TabPanel({ index, value, children }: { index: number; value: number; children: ReactNode }) {
  if (index !== value) return null;
  return <Stack sx={{ p: 3 }}>{children}</Stack>;
}

export default function SettingsPage() {
  const [tab, setTab] = useState(0);
  const { mode, setMode } = useThemeStore();
  const showToast = useToastStore((s) => s.show);

  const handleChange = (_: SyntheticEvent, newValue: number) => setTab(newValue);

  const saveSettings = () => showToast('تنظیمات با موفقیت ذخیره شد.');

  return (
    <Stack spacing={3}>
      <PageHeader title="تنظیمات" description="مدیریت تنظیمات کلی سامانه و خیریه" />
      <Paper variant="outlined">
        <Tabs value={tab} onChange={handleChange} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 1 }}>
          {TABS.map((t) => (
            <Tab key={t} label={t} />
          ))}
        </Tabs>

        <TabPanel index={0} value={tab}>
          <Grid container spacing={2.5} maxWidth={640}>
            <Grid item xs={12}><TextField fullWidth label="نام خیریه" defaultValue="خیریه مکتب طه" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="شماره تماس" defaultValue="021-88888888" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="ایمیل" defaultValue="info@maktabtaha.org" /></Grid>
            <Grid item xs={12}><TextField fullWidth label="آدرس" multiline rows={2} defaultValue="تهران، خیابان ولیعصر" /></Grid>
            <Grid item xs={12}><TextField fullWidth label="شماره ثبت / شناسه ملی" defaultValue="14005678901" /></Grid>
          </Grid>
        </TabPanel>

        <TabPanel index={1} value={tab}>
          <Grid container spacing={2.5} maxWidth={640}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="نام کامل" defaultValue="مدیر سیستم" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="نام کاربری" defaultValue="admin" disabled /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth type="password" label="رمز عبور جدید" placeholder="••••••••" /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth type="password" label="تکرار رمز عبور" placeholder="••••••••" /></Grid>
          </Grid>
        </TabPanel>

        <TabPanel index={2} value={tab}>
          <Stack spacing={1} maxWidth={480}>
            <FormControlLabel control={<Switch defaultChecked />} label="اعلان ثبت کمک جدید" />
            <FormControlLabel control={<Switch defaultChecked />} label="اعلان درخواست‌های در انتظار بررسی" />
            <FormControlLabel control={<Switch />} label="اعلان از طریق پیامک" />
            <FormControlLabel control={<Switch defaultChecked />} label="اعلان از طریق ایمیل" />
          </Stack>
        </TabPanel>

        <TabPanel index={3} value={tab}>
          <Stack spacing={2} maxWidth={480}>
            <Stack spacing={1}>
              <Divider textAlign="left"><Stack component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>حالت نمایش</Stack></Divider>
              <ToggleButtonGroup
                value={mode}
                exclusive
                onChange={(_, v) => v && setMode(v)}
                sx={{ width: 'fit-content' }}
              >
                <ToggleButton value="light" sx={{ gap: 1, px: 2.5 }}><LightModeRoundedIcon fontSize="small" /> روشن</ToggleButton>
                <ToggleButton value="dark" sx={{ gap: 1, px: 2.5 }}><DarkModeRoundedIcon fontSize="small" /> تیره</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
          </Stack>
        </TabPanel>

        <TabPanel index={4} value={tab}>
          <Grid container spacing={2.5} maxWidth={640}>
            <Grid item xs={12} sm={6}><TextField fullWidth label="واحد پول" defaultValue="تومان" disabled /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="تقویم سیستم" defaultValue="شمسی" disabled /></Grid>
            <Grid item xs={12}><FormControlLabel control={<Switch defaultChecked />} label="پشتیبان‌گیری خودکار روزانه" /></Grid>
          </Grid>
        </TabPanel>

        <Divider />
        <Stack direction="row" justifyContent="flex-end" sx={{ p: 2.5 }}>
          <Button variant="contained" onClick={saveSettings}>ذخیره تغییرات</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
