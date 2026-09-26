import TextField, { type TextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { formatNumber, parseCurrencyInput } from '@/utils/currency';

interface MoneyInputProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: number;
  onChange: (value: number) => void;
}

export default function MoneyInput({ value, onChange, ...rest }: MoneyInputProps) {
  return (
    <TextField
      {...rest}
      value={value ? formatNumber(value) : ''}
      onChange={(e) => onChange(parseCurrencyInput(e.target.value))}
      InputProps={{
        endAdornment: <InputAdornment position="end">تومان</InputAdornment>,
        ...rest.InputProps,
      }}
      inputProps={{ inputMode: 'numeric', style: { textAlign: 'left' }, ...rest.inputProps }}
    />
  );
}
