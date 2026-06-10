import { useMemo, useState } from 'react';

export const BUDGET_CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const storageKey = 'expense-tracker-category-budgets';

const defaultBudgets = {
  Bills: 10000,
  Entertainment: 3000,
  Food: 8000,
  Other: 2500,
  Transport: 4000,
};

const readStoredBudgets = () => {
  try {
    const storedBudgets = window.localStorage.getItem(storageKey);

    return storedBudgets ? { ...defaultBudgets, ...JSON.parse(storedBudgets) } : defaultBudgets;
  } catch {
    return defaultBudgets;
  }
};

export const useCategoryBudgets = (monthlyCategoryBreakdown) => {
  const [budgets, setBudgets] = useState(readStoredBudgets);

  const updateBudget = (category, value) => {
    const amount = Math.max(0, Number(value) || 0);
    const nextBudgets = {
      ...budgets,
      [category]: amount,
    };

    setBudgets(nextBudgets);
    window.localStorage.setItem(storageKey, JSON.stringify(nextBudgets));
  };

  const budgetRows = useMemo(() => {
    const spendingByCategory = monthlyCategoryBreakdown.reduce((totals, item) => {
      totals[item.category] = item.amount;

      return totals;
    }, {});

    return BUDGET_CATEGORIES.map((category) => {
      const budget = budgets[category] ?? 0;
      const spent = spendingByCategory[category] ?? 0;
      const percentage = budget > 0 ? Math.min((spent / budget) * 100, 999) : 0;
      const remaining = Math.max(budget - spent, 0);
      const status = percentage >= 100 ? 'over' : percentage >= 80 ? 'warning' : 'good';

      return {
        budget,
        category,
        percentage,
        remaining,
        spent,
        status,
      };
    });
  }, [budgets, monthlyCategoryBreakdown]);

  return {
    budgetRows,
    updateBudget,
  };
};
