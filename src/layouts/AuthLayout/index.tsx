import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import { LoginHeroIllustration } from "@/components/common/illustrations";

export default function AuthLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex" }}>
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(160deg, #07372F 0%, #0F6E5C 55%, #3E8F71 100%)",
          color: "#fff",
          p: 6,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography variant="h5" fontWeight={700}>
            مکتب طه
          </Typography>
        </Stack>

        <Stack alignItems="center" spacing={4}>
          <LoginHeroIllustration />
          {/* <Stack
            spacing={1}
            alignItems="center"
            textAlign="center"
            maxWidth={380}
          >
            <Typography variant="h4" fontWeight={700}>
              همراه شما در مسیر نیکوکاری
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              مدیریت شفاف کمک‌ها، پرونده‌های مددجویان و پروژه‌های خیریه، همه در
              یک سامانه.
            </Typography>
          </Stack> */}
        </Stack>

        <Typography variant="caption" sx={{ opacity: 0.7 }}>
          © {new Date().getFullYear()} خیریه مکتب طه. تمامی حقوق محفوظ است.
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          bgcolor: "background.default",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
