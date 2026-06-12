import { useCategoryBudgets } from '../hooks/useCategoryBudgets.js';
import { formatCurrency, formatFullCurrency } from '../utils/formatCurrency.js';
import { cx, formClasses } from '../utils/uiClasses.js';

const BudgetTracker = ({ monthlyCategoryBreakdown }) => {
  const { budgetRows, updateBudget } = useCategoryBudgets(monthlyCategoryBreakdown);

  return (
    <div className="grid gap-3">
      {budgetRows.map((row) => (
        <article
          className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 hover:-translate-y-0.5 dark:border-slate-500/20 dark:bg-white/[0.035] dark:hover:border-emerald-400/30"
          key={row.category}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid min-w-0 gap-1">
              <strong className="text-slate-950 dark:text-slate-50">{row.category}</strong>
              <span
                className="text-sm font-bold text-slate-500 [overflow-wrap:anywhere] dark:text-slate-400"
                title={`${formatFullCurrency(row.spent)} spent of ${formatFullCurrency(row.budget)}`}
              >
                {formatCurrency(row.spent, { compact: true, maximumFractionDigits: 0 })} spent of{' '}
                {formatCurrency(row.budget, { compact: true, maximumFractionDigits: 0 })}
              </span>
            </div>
            <label className="grid min-w-36 gap-1.5">
              <span className="text-xs font-extrabold uppercase tracking-normal text-slate-500 dark:text-slate-400">
                Budget
              </span>
              <input
                className={`${formClasses.input} w-36`}
                min="0"
                onChange={(event) => updateBudget(row.category, event.target.value)}
                step="100"
                type="number"
                value={row.budget}
              />
            </label>
          </div>

          <div
            className="relative h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-500/20"
            aria-label={`${row.category} budget usage`}
          >
            <span
              className={cx(
                'absolute inset-y-0 left-0 rounded-full',
                row.status === 'over'
                  ? 'bg-red-600 dark:bg-gradient-to-r dark:from-red-400 dark:to-red-300'
                  : row.status === 'warning'
                    ? 'bg-amber-500 dark:bg-gradient-to-r dark:from-amber-300 dark:to-amber-200'
                    : 'bg-emerald-700 dark:bg-gradient-to-r dark:from-emerald-400 dark:to-emerald-300',
              )}
              style={{ width: `${Math.min(row.percentage, 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {Math.round(row.percentage)}% used
            </span>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
              {row.status === 'over'
                ? `${formatCurrency(row.spent - row.budget, { compact: true, maximumFractionDigits: 0 })} over`
                : `${formatCurrency(row.remaining, { compact: true, maximumFractionDigits: 0 })} left`}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BudgetTracker;
