import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { DesktopSidebar, MobileSidebar } from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <DesktopSidebar />
      <MobileSidebar />
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flex: 1, p: { xs: 2, sm: 3 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
