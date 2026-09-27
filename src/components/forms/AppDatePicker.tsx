import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import {
  formatPersianDate,
  gregorianToJalali,
  jalaliToGregorian,
  getTodayJalali,
} from "@/utils/date";
import JalaliCalendar, {
  type JalaliDate,
} from "@/components/common/JalaliCalendar";

// انتخاب‌گر تاریخ شمسی — یک تقویم جلالی کامل (بدون وابستگی خارجی) که با کلیک روی
// فیلد باز می‌شود. مقدار ذخیره‌شده در فرم همچنان ISO String میلادی است (سازگار با
// بقیه‌ی سیستم)، فقط نمایش و انتخاب آن به‌طور کامل شمسی است.
interface AppDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export default function AppDatePicker<T extends FieldValues>({
  name,
  control,
  label,
}: AppDatePickerProps<T>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const date = field.value ? new Date(field.value as string) : null;
        const isValidDate = !!date && !Number.isNaN(date.getTime());
        let jalaliValue: JalaliDate | null = null;
        if (isValidDate && date) {
          const [jy, jm, jd] = gregorianToJalali(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
          );
          jalaliValue = { jy, jm, jd };
        }

        const close = () => setAnchorEl(null);

        const handleSelect = (picked: JalaliDate) => {
          const [gy, gm, gd] = jalaliToGregorian(
            picked.jy,
            picked.jm,
            picked.jd,
          );
          field.onChange(new Date(gy, gm - 1, gd).toISOString());
          close();
        };

        const handleToday = () => {
          const [jy, jm, jd] = getTodayJalali();
          handleSelect({ jy, jm, jd });
        };

        const handleClear = () => {
          field.onChange("");
          close();
        };

        return (
          <>
            <TextField
              label={label}
              fullWidth
              value={isValidDate ? formatPersianDate(date!) : ""}
              placeholder="انتخاب تاریخ"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? " "}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
                sx: { cursor: "pointer" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={(e) => setAnchorEl(e.currentTarget)}
                      edge="end"
                    >
                      <EventRoundedIcon
                        fontSize="small"
                        sx={{ color: "text.secondary" }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{ readOnly: true, style: { cursor: "pointer" } }}
            />
            <Popover
              open={!!anchorEl}
              anchorEl={anchorEl}
              onClose={close}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <JalaliCalendar
                value={jalaliValue}
                onSelect={handleSelect}
                onToday={handleToday}
                onClear={handleClear}
              />
            </Popover>
          </>
        );
      }}
    />
  );
}
