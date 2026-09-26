import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import { useLocation, useNavigate } from 'react-router-dom';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { alpha } from '@mui/material/styles';
import { iconMap } from './iconMap';
import { useUiStore } from '@/stores/uiStore';
import { useAuthStore } from '@/stores/authStore';
import { getNavigableMenu } from '@/permissions/permission.utils';
import type { PermissionMenu } from '@/permissions/permission.types';

export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_WIDTH_COLLAPSED = 76;

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5} sx={{ px: collapsed ? 1.5 : 2.5, py: 2.5 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #0F6E5C 0%, #3E8F71 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
          <path d="M16 7c-3.5 3-5.5 6.2-5.5 9.3 0 3.4 2.5 6.2 5.5 6.2s5.5-2.8 5.5-6.2C21.5 13.2 19.5 10 16 7z" fill="#F2C572" />
        </svg>
      </Box>
      {!collapsed && (
        <Stack sx={{ overflow: 'hidden' }}>
          <Typography variant="subtitle1" noWrap sx={{ lineHeight: 1.2 }}>
            مکتب طه
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            سامانه مدیریت خیریه
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

function isActivePath(pathname: string, path?: string) {
  return !!path && pathname.startsWith(path);
}

function NavGroup({ node, collapsed, onNavigate }: { node: PermissionMenu; collapsed: boolean; onNavigate?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const children = node.children ?? [];
  const groupActive = children.some((c) => isActivePath(location.pathname, c.path));
  const [open, setOpen] = useState(groupActive);

  const header = (
    <ListItemButton
      selected={groupActive && !open}
      onClick={() => {
        if (collapsed) {
          const first = children[0];
          if (first?.path) {
            navigate(first.path);
            onNavigate?.();
          }
          return;
        }
        setOpen((o) => !o);
      }}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        minHeight: 44,
        justifyContent: collapsed ? 'center' : 'flex-start',
        px: collapsed ? 1 : 1.5,
        '&.Mui-selected': {
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
          color: 'primary.main',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40, color: groupActive ? 'primary.main' : 'text.secondary' }}>
        {node.icon ? iconMap[node.icon] : null}
      </ListItemIcon>
      {!collapsed && (
        <>
          <ListItemText primary={node.title} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: groupActive ? 700 : 500 }} />
          <ExpandMoreRoundedIcon
            fontSize="small"
            sx={{ color: 'text.secondary', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
          />
        </>
      )}
    </ListItemButton>
  );

  return (
    <Box>
      {collapsed ? (
        <Tooltip title={node.title} placement="left">
          <Box>{header}</Box>
        </Tooltip>
      ) : (
        header
      )}
      {!collapsed && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding sx={{ pr: 2.5, mb: 0.5 }}>
            {children.map((child) => {
              const active = isActivePath(location.pathname, child.path);
              return (
                <ListItemButton
                  key={child.id}
                  selected={active}
                  onClick={() => {
                    if (child.path) navigate(child.path);
                    onNavigate?.();
                  }}
                  sx={{
                    borderRadius: 2,
                    mb: 0.25,
                    minHeight: 38,
                    '&.Mui-selected': {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      color: 'primary.main',
                    },
                  }}
                >
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: active ? 'primary.main' : 'text.disabled', ml: 1.75, mr: 0.25 }} />
                  <ListItemText primary={child.title} primaryTypographyProps={{ fontSize: '0.82rem', fontWeight: active ? 700 : 400 }} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
    </Box>
  );
}

function NavList({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const menu = useMemo(() => getNavigableMenu(user), [user]);

  return (
    <List sx={{ px: 1.25, py: 1 }}>
      {menu.map((item) => {
        if (item.children?.length) {
          return <NavGroup key={item.id} node={item} collapsed={collapsed} onNavigate={onNavigate} />;
        }
        const active = isActivePath(location.pathname, item.path);
        const button = (
          <ListItemButton
            key={item.id}
            selected={active}
            onClick={() => {
              if (item.path) navigate(item.path);
              onNavigate?.();
            }}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              minHeight: 44,
              justifyContent: collapsed ? 'center' : 'flex-start',
              px: collapsed ? 1 : 1.5,
              '&.Mui-selected': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
                color: 'primary.main',
                '&:hover': { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16) },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40, color: active ? 'primary.main' : 'text.secondary' }}>
              {item.icon ? iconMap[item.icon] : null}
            </ListItemIcon>
            {!collapsed && (
              <ListItemText primary={item.title} primaryTypographyProps={{ fontSize: '0.875rem', fontWeight: active ? 700 : 500 }} />
            )}
          </ListItemButton>
        );
        return collapsed ? (
          <Tooltip key={item.id} title={item.title} placement="left">
            <Box>{button}</Box>
          </Tooltip>
        ) : (
          button
        );
      })}
    </List>
  );
}

export function DesktopSidebar() {
  const { sidebarCollapsed, toggleSidebarCollapsed } = useUiStore();
  const width = sidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH;
  return (
    <Box
      component="nav"
      sx={{
        width,
        flexShrink: 0,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        borderInlineStart: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'width 0.2s ease',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      <Brand collapsed={sidebarCollapsed} />
      <Divider />
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <NavList collapsed={sidebarCollapsed} />
      </Box>
      <Divider />
      <Stack direction="row" justifyContent="center" py={1}>
        <IconButton size="small" onClick={toggleSidebarCollapsed}>
          {sidebarCollapsed ? <ChevronLeftRoundedIcon fontSize="small" /> : <ChevronRightRoundedIcon fontSize="small" />}
        </IconButton>
      </Stack>
    </Box>
  );
}

export function MobileSidebar() {
  const { mobileDrawerOpen, setMobileDrawerOpen } = useUiStore();
  return (
    <Drawer
      anchor="right"
      open={mobileDrawerOpen}
      onClose={() => setMobileDrawerOpen(false)}
      ModalProps={{ keepMounted: true }}
      sx={{ display: { xs: 'block', md: 'none' } }}
      PaperProps={{ sx: { width: SIDEBAR_WIDTH } }}
    >
      <Brand collapsed={false} />
      <Divider />
      <NavList collapsed={false} onNavigate={() => setMobileDrawerOpen(false)} />
    </Drawer>
  );
}
