const fullCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  currency: 'INR',
  maximumFractionDigits: 2,
  style: 'currency',
});

const compactUnits = [
  { suffix: 'Cr', value: 10000000 },
  { suffix: 'L', value: 100000 },
  { suffix: 'K', value: 1000 },
];

const trimTrailingZero = (value) => value.replace(/\.0$/, '');

export const formatCurrency = (amount, options = {}) => {
  const { compact = false, maximumFractionDigits = 2 } = options;
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return fullCurrencyFormatter.format(0);
  }

  if (!compact || Math.abs(numericAmount) < 1000) {
    return new Intl.NumberFormat('en-IN', {
      currency: 'INR',
      maximumFractionDigits,
      style: 'currency',
    }).format(numericAmount);
  }

  const unit = compactUnits.find((item) => Math.abs(numericAmount) >= item.value);
  const scaledValue = numericAmount / unit.value;
  const fractionDigits = Math.abs(scaledValue) >= 100 ? 0 : 1;

  return `Rs ${trimTrailingZero(scaledValue.toFixed(fractionDigits))}${unit.suffix}`;
};

export const formatFullCurrency = (amount) => fullCurrencyFormatter.format(Number(amount) || 0);
