import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getNotifications } from "@/api/mock/notification.service";
import type { AppNotification, NotificationLevel } from "@/types";
import { formatPersianDate } from "@/utils/date";
import EmptyState from "@/components/common/EmptyState";

const levelColor: Record<NotificationLevel, string> = {
  success: "#0F6E5C",
  warning: "#C68F2C",
  error: "#C1543F",
  info: "#2E6E8E",
};

export default function NotificationsMenu({
  anchorEl,
  onClose,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) {
  const [items, setItems] = useState<AppNotification[]>([]);

  useEffect(() => {
    getNotifications().then(setItems);
  }, []);

  return (
    <Menu
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={onClose}
      PaperProps={{ sx: { width: 360, maxHeight: 420 } }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle1">اعلان‌ها</Typography>
      </Box>
      <Divider />
      {items.length === 0 ? (
        <EmptyState title="اعلانی وجود ندارد" />
      ) : (
        items.map((n) => (
          <Box
            key={n.id}
            sx={{ px: 2, py: 1.25, "&:hover": { bgcolor: "action.hover" } }}
          >
            <Stack direction="row" spacing={1.25} alignItems="flex-start">
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  mt: 0.7,
                  flexShrink: 0,
                  bgcolor: levelColor[n.level],
                  boxShadow: n.read
                    ? "none"
                    : `0 0 0 4px ${alpha(levelColor[n.level], 0.18)}`,
                }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" fontWeight={600} noWrap>
                  {n.title}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block" }}
                >
                  {n.message}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  {formatPersianDate(n.date)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ))
      )}
    </Menu>
  );
}
