import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createExpense = async (expense) => {
  const { data } = await apiClient.post('/expenses', expense);

  return data.expense;
};

export const updateExpense = async (id, expense) => {
  const { data } = await apiClient.put(`/expenses/${id}`, expense);

  return data.expense;
};
