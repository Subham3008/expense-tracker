import { useEffect, useMemo, useState } from 'react';
import { getExpenses } from '../services/expenseApi.js';

const currentMonthKey = () => new Date().toISOString().slice(0, 7);

const getMonthKey = (date) => new Date(date).toISOString().slice(0, 7);

const getPreviousMonthKey = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);

  return date.toISOString().slice(0, 7);
};

const getDaysElapsedInMonth = () => new Date().getDate();

const getDaysInCurrentMonth = () => {
  const date = new Date();

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

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

const getCategoryBreakdown = (expenses) => {
  const categoryTotals = expenses.reduce((totals, expense) => {
    totals[expense.category] = (totals[expense.category] ?? 0) + expense.amount;

    return totals;
  }, {});

  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({ amount, category }))
    .sort((firstCategory, secondCategory) => secondCategory.amount - firstCategory.amount);
};

const getBusiestDay = (expenses) => {
  const totalsByDay = expenses.reduce((totals, expense) => {
    const day = new Date(expense.date).toISOString().slice(0, 10);
    totals[day] = (totals[day] ?? 0) + expense.amount;

    return totals;
  }, {});

  const [date, amount] =
    Object.entries(totalsByDay).sort((firstDay, secondDay) => secondDay[1] - firstDay[1])[0] ?? [];

  return date ? { amount, date } : null;
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
    const monthlyExpenses = expenses.filter((expense) => getMonthKey(expense.date) === monthKey);
    const previousMonthKey = getPreviousMonthKey();
    const previousMonthSpent = expenses
      .filter((expense) => getMonthKey(expense.date) === previousMonthKey)
      .reduce((total, expense) => total + expense.amount, 0);
    const averageDailySpend = monthlySpent / getDaysElapsedInMonth();
    const projectedMonthlySpend = averageDailySpend * getDaysInCurrentMonth();
    const monthOverMonthChange =
      previousMonthSpent > 0 ? ((monthlySpent - previousMonthSpent) / previousMonthSpent) * 100 : null;

    return {
      averageDailySpend,
      categoryBreakdown: getCategoryBreakdown(expenses),
      insights: {
        busiestDay: getBusiestDay(monthlyExpenses),
        monthOverMonthChange,
        previousMonthSpent,
        projectedMonthlySpend,
      },
      monthlyCategoryBreakdown: getCategoryBreakdown(monthlyExpenses),
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
