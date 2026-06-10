const csvHeaders = ['Date', 'Category', 'Amount', 'Note'];

const formatDate = (date) => new Date(date).toISOString().slice(0, 10);

const escapeCsvValue = (value) => {
  const stringValue = String(value ?? '');

  if (!/[",\n\r]/.test(stringValue)) {
    return stringValue;
  }

  return `"${stringValue.replaceAll('"', '""')}"`;
};

const buildCsv = (expenses) => {
  const rows = expenses.map((expense) => [
    formatDate(expense.date),
    expense.category,
    expense.amount,
    expense.note ?? '',
  ]);

  return [csvHeaders, ...rows]
    .map((row) => row.map(escapeCsvValue).join(','))
    .join('\n');
};

export const exportExpensesCsv = (expenses) => {
  const csv = buildCsv(expenses);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `expenses-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
