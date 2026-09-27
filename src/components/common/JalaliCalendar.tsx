import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { alpha } from "@mui/material/styles";
import {
  JALALI_MONTHS,
  JALALI_WEEKDAYS_SHORT,
  jalaliMonthLength,
  jalaliToGregorian,
  getTodayJalali,
  toFaDigits,
} from "@/utils/date";

export interface JalaliDate {
  jy: number;
  jm: number; // ۱ تا ۱۲
  jd: number;
}

interface JalaliCalendarProps {
  value: JalaliDate | null;
  onSelect: (date: JalaliDate) => void;
  onToday?: () => void;
  onClear?: () => void;
}

// اولین روز هفته‌ی هر ماه شمسی را بر مبنای هفته‌ی ایرانی (شنبه تا جمعه) برمی‌گرداند
function getMonthStartWeekday(jy: number, jm: number): number {
  const [gy, gm, gd] = jalaliToGregorian(jy, jm, 1);
  const jsDay = new Date(gy, gm - 1, gd).getDay(); // ۰=یکشنبه ... ۶=شنبه (استاندارد جاوااسکریپت)
  return (jsDay + 1) % 7; // ۰=شنبه ... ۶=جمعه
}

export default function JalaliCalendar({
  value,
  onSelect,
  onToday,
  onClear,
}: JalaliCalendarProps) {
  const [todayJy, todayJm, todayJd] = getTodayJalali();
  const [viewYear, setViewYear] = useState(value?.jy ?? todayJy);
  const [viewMonth, setViewMonth] = useState(value?.jm ?? todayJm);

  const goPrevMonth = () => {
    if (viewMonth === 1) {
      setViewMonth(12);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };
  const goNextMonth = () => {
    if (viewMonth === 12) {
      setViewMonth(1);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const daysInMonth = jalaliMonthLength(viewYear, viewMonth);
  const startWeekday = getMonthStartWeekday(viewYear, viewMonth);

  const cells: Array<number | null> = [
    ...Array<null>(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <Box sx={{ p: 2, width: 300 }}>
      {/* راست‌به‌چپ: فلش راست = ماه قبل، فلش چپ = ماه بعد */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
      >
        <IconButton size="small" onClick={goNextMonth} aria-label="ماه بعد">
          <ChevronLeftRoundedIcon fontSize="small" />
        </IconButton>
        <Stack direction="row" spacing={0.75} alignItems="baseline">
          <Typography variant="subtitle1" fontWeight={700}>
            {JALALI_MONTHS[viewMonth - 1]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {toFaDigits(viewYear)}
          </Typography>
        </Stack>
        <IconButton size="small" onClick={goPrevMonth} aria-label="ماه قبل">
          <ChevronRightRoundedIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 0.5,
          mb: 0.5,
        }}
      >
        {JALALI_WEEKDAYS_SHORT.map((w, i) => (
          <Typography
            key={i}
            variant="caption"
            align="center"
            sx={{ color: "text.secondary", fontWeight: 600 }}
          >
            {w}
          </Typography>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 0.5,
        }}
      >
        {cells.map((day, i) => {
          if (day === null) return <Box key={i} />;
          const isSelected =
            !!value &&
            value.jy === viewYear &&
            value.jm === viewMonth &&
            value.jd === day;
          const isToday =
            todayJy === viewYear && todayJm === viewMonth && todayJd === day;
          return (
            <Box
              key={i}
              onClick={() => onSelect({ jy: viewYear, jm: viewMonth, jd: day })}
              sx={{
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                cursor: "pointer",
                userSelect: "none",
                fontSize: "0.82rem",
                fontWeight: isSelected || isToday ? 700 : 500,
                color: isSelected
                  ? "#fff"
                  : isToday
                    ? "primary.main"
                    : "text.primary",
                bgcolor: isSelected
                  ? "primary.main"
                  : isToday
                    ? (theme) => alpha(theme.palette.primary.main, 0.12)
                    : "transparent",
                "&:hover": {
                  bgcolor: isSelected
                    ? "primary.dark"
                    : (theme) => alpha(theme.palette.primary.main, 0.16),
                },
              }}
            >
              {toFaDigits(day)}
            </Box>
          );
        })}
      </Box>

      {(onToday || onClear) && (
        <>
          <Divider sx={{ my: 1.5 }} />
          <Stack direction="row" justifyContent="space-between">
            {onClear ? (
              <Button size="small" color="inherit" onClick={onClear}>
                پاک کردن
              </Button>
            ) : (
              <Box />
            )}
            {onToday && (
              <Button size="small" onClick={onToday}>
                امروز
              </Button>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
}
