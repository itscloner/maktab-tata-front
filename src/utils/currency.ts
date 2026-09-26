import { toFaDigits } from './date';

export function formatCurrency(amount: number, withSuffix = true): string {
  const formatted = new Intl.NumberFormat('en-US').format(Math.round(amount));
  const fa = toFaDigits(formatted);
  return withSuffix ? `${fa} تومان` : fa;
}

export function formatCompactCurrency(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1_000_000_000) {
    return `${toFaDigits((amount / 1_000_000_000).toFixed(1))} میلیارد تومان`;
  }
  if (abs >= 1_000_000) {
    return `${toFaDigits((amount / 1_000_000).toFixed(1))} میلیون تومان`;
  }
  return formatCurrency(amount);
}

export function formatNumber(value: number): string {
  return toFaDigits(new Intl.NumberFormat('en-US').format(Math.round(value)));
}

export function parseCurrencyInput(value: string): number {
  const normalized = value
    .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    .replace(/[^\d]/g, '');
  return normalized ? Number(normalized) : 0;
}
