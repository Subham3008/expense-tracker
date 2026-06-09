import { useCallback, useEffect, useMemo, useState } from 'react';
import { deleteExpense, getExpenses } from '../services/expenseApi.js';

const newestFirst = (expenses) =>
  [...expenses].sort((firstExpense, secondExpense) => {
    const firstDate = new Date(firstExpense.date).getTime();
    const secondDate = new Date(secondExpense.date).getTime();

    if (firstDate === secondDate) {
      return new Date(secondExpense.createdAt).getTime() - new Date(firstExpense.createdAt).getTime();
    }

    return secondDate - firstDate;
  });

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const loadExpenses = useCallback(async () => {
    setStatus('loading');
    setError('');

    try {
      const nextExpenses = await getExpenses();

      setExpenses(newestFirst(nextExpenses));
      setStatus('success');
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'Unable to load expenses.');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  const removeExpense = async (id) => {
    await deleteExpense(id);

    setExpenses((currentExpenses) => currentExpenses.filter((expense) => expense._id !== id));
  };

  const upsertExpense = (expense) => {
    setExpenses((currentExpenses) => {
      const exists = currentExpenses.some((currentExpense) => currentExpense._id === expense._id);
      const nextExpenses = exists
        ? currentExpenses.map((currentExpense) =>
            currentExpense._id === expense._id ? expense : currentExpense,
          )
        : [expense, ...currentExpenses];

      return newestFirst(nextExpenses);
    });
  };

  const sortedExpenses = useMemo(() => newestFirst(expenses), [expenses]);

  return {
    error,
    expenses: sortedExpenses,
    loadExpenses,
    removeExpense,
    status,
    upsertExpense,
  };
};
