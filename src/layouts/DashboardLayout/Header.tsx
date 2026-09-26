import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUiStore } from '@/stores/uiStore';
import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import SearchInput from '@/components/common/SearchInput';
import AppAvatar from '@/components/common/AppAvatar';
import { flattenPermissions } from '@/mocks/permissions.mock';
import NotificationsMenu from './NotificationsMenu';

export default function Header() {
  const { setMobileDrawerOpen } = useUiStore();
  const { mode, toggleMode } = useThemeStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notifAnchor, setNotifAnchor] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState('');

  const currentNav = flattenPermissions()
    .filter((n) => n.path && !n.path.includes(':') && location.pathname.startsWith(n.path))
    .sort((a, b) => (b.path?.length ?? 0) - (a.path?.length ?? 0))[0];

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: 68 }}>
        <IconButton sx={{ display: { xs: 'inline-flex', md: 'none' } }} onClick={() => setMobileDrawerOpen(true)}>
          <MenuRoundedIcon />
        </IconButton>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="h5" noWrap>
            {currentNav?.title ?? 'داشبورد'}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <SearchInput value={search} onChange={setSearch} placeholder="جستجو در سامانه..." />
        </Box>

        <IconButton onClick={toggleMode}>
          {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>

        <IconButton onClick={(e) => setNotifAnchor(e.currentTarget)}>
          <Badge badgeContent={2} color="error">
            <NotificationsRoundedIcon />
          </Badge>
        </IconButton>
        <NotificationsMenu anchorEl={notifAnchor} onClose={() => setNotifAnchor(null)} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          onClick={(e) => setUserMenuAnchor(e.currentTarget)}
          sx={{ cursor: 'pointer', pl: 0.5 }}
        >
          <AppAvatar name={user?.fullName ?? 'مدیر'} size={36} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="body2" fontWeight={600} noWrap>
              {user?.fullName ?? 'مدیر سیستم'}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.role ?? 'مدیر سیستم'}
            </Typography>
          </Box>
        </Stack>
        <Menu anchorEl={userMenuAnchor} open={!!userMenuAnchor} onClose={() => setUserMenuAnchor(null)}>
          <MenuItem onClick={() => setUserMenuAnchor(null)}>
            <ListItemIcon><PersonRoundedIcon fontSize="small" /></ListItemIcon>
            <ListItemText>پروفایل من</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => { setUserMenuAnchor(null); navigate('/settings'); }}>
            <ListItemIcon><SettingsRoundedIcon fontSize="small" /></ListItemIcon>
            <ListItemText>تنظیمات</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <ListItemIcon><LogoutRoundedIcon fontSize="small" color="error" /></ListItemIcon>
            <ListItemText sx={{ color: 'error.main' }}>خروج از حساب</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
