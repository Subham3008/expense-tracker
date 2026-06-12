import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://expense-tracker-ftky.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

let expensesCache = null;

const sortNewestFirst = (expenses) =>
  [...expenses].sort((firstExpense, secondExpense) => {
    const firstDate = new Date(firstExpense.date).getTime();
    const secondDate = new Date(secondExpense.date).getTime();

    if (firstDate === secondDate) {
      return new Date(secondExpense.createdAt).getTime() - new Date(firstExpense.createdAt).getTime();
    }

    return secondDate - firstDate;
  });

const setExpensesCache = (expenses) => {
  expensesCache = sortNewestFirst(expenses);

  return [...expensesCache];
};

const updateCachedExpense = (expense) => {
  if (!expensesCache) {
    return;
  }

  const exists = expensesCache.some((cachedExpense) => cachedExpense._id === expense._id);
  const nextExpenses = exists
    ? expensesCache.map((cachedExpense) => (cachedExpense._id === expense._id ? expense : cachedExpense))
    : [expense, ...expensesCache];

  setExpensesCache(nextExpenses);
};

const removeCachedExpense = (id) => {
  if (!expensesCache) {
    return;
  }

  setExpensesCache(expensesCache.filter((expense) => expense._id !== id));
};

export const createExpense = async (expense) => {
  const { data } = await apiClient.post('/expenses', expense);

  updateCachedExpense(data.expense);

  return data.expense;
};

export const getExpenses = async ({ force = false } = {}) => {
  if (!force && expensesCache) {
    return [...expensesCache];
  }

  const { data } = await apiClient.get('/expenses');

  return setExpensesCache(data.expenses);
};

export const updateExpense = async (id, expense) => {
  const { data } = await apiClient.put(`/expenses/${id}`, expense);

  updateCachedExpense(data.expense);

  return data.expense;
};

export const deleteExpense = async (id) => {
  const { data } = await apiClient.delete(`/expenses/${id}`);

  removeCachedExpense(id);

  return data.expense;
};
