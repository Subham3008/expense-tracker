import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://expense-tracker-ftky.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createExpense = async (expense) => {
  const { data } = await apiClient.post('/expenses', expense);

  return data.expense;
};

export const getExpenses = async () => {
  const { data } = await apiClient.get('/expenses');

  return data.expenses;
};

export const updateExpense = async (id, expense) => {
  const { data } = await apiClient.put(`/expenses/${id}`, expense);

  return data.expense;
};

export const deleteExpense = async (id) => {
  const { data } = await apiClient.delete(`/expenses/${id}`);

  return data.expense;
};
