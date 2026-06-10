import { useEffect, useMemo, useState } from 'react';
import { getExpenses } from '../services/expenseApi.js';

const currentMonthKey = () => new Date().toISOString().slice(0, 7);

const getMonthKey = (date) => new Date(date).toISOString().slice(0, 7);

const sortNewestFirst = (expenses) =>
  [...expenses].sort((firstExpense, secondExpense) => {
    const firstDate = new Date(firstExpense.date).getTime();
    const secondDate = new Date(secondExpense.date).getTime();

    if (firstDate === secondDate) {
      return new Date(secondExpense.createdAt).getTime() - new Date(firstExpense.createdAt).getTime();
    }

    return secondDate - firstDate;
  });

const getTopCategory = (expenses) => {
  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] ?? 0) + expense.amount;

    return totals;
  }, {});

  const [category, amount] =
    Object.entries(categoryTotals).sort((firstCategory, secondCategory) => {
      return secondCategory[1] - firstCategory[1];
    })[0] ?? [];

  return category ? { amount, category } : null;
};

export const useDashboardSummary = () => {
  const [expenses, setExpenses] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSummary = async () => {
      setStatus('loading');
      setError('');

      try {
        const nextExpenses = await getExpenses();

        setExpenses(sortNewestFirst(nextExpenses));
        setStatus('success');
      } catch (requestError) {
        setError(requestError.response?.data?.message ?? 'Unable to load dashboard summary.');
        setStatus('error');
      }
    };

    loadSummary();
  }, []);

  const summary = useMemo(() => {
    const monthKey = currentMonthKey();
    const totalSpent = expenses.reduce((total, expense) => total + expense.amount, 0);
    const monthlySpent = expenses
      .filter((expense) => getMonthKey(expense.date) === monthKey)
      .reduce((total, expense) => total + expense.amount, 0);

    return {
      monthlySpent,
      recentExpenses: expenses.slice(0, 4),
      topCategory: getTopCategory(expenses),
      totalSpent,
      transactionCount: expenses.length,
    };
  }, [expenses]);

  return {
    error,
    status,
    summary,
  };
};
