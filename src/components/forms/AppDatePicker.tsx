import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';
import { formatPersianDate } from '@/utils/date';

// انتخاب‌گر تاریخ ساده: ورودی تقویم میلادی بومی مرورگر + نمایش معادل شمسی
// (برای جایگزینی با یک تقویم شمسی کامل در آینده، فقط کافیست همین Component تغییر کند)
interface AppDatePickerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
}

export default function AppDatePicker<T extends FieldValues>({ name, control, label }: AppDatePickerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          type="date"
          label={label}
          fullWidth
          value={field.value ? String(field.value).slice(0, 10) : ''}
          onChange={(e) => field.onChange(new Date(e.target.value).toISOString())}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? (field.value ? `معادل شمسی: ${formatPersianDate(field.value)}` : ' ')}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EventRoundedIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
