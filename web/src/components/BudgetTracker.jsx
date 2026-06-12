import { useCategoryBudgets } from '../hooks/useCategoryBudgets.js';
import { formatCurrency, formatFullCurrency } from '../utils/formatCurrency.js';

const BudgetTracker = ({ monthlyCategoryBreakdown }) => {
  const { budgetRows, updateBudget } = useCategoryBudgets(monthlyCategoryBreakdown);

  return (
    <div className="budget-list">
      {budgetRows.map((row) => (
        <article className="budget-row" key={row.category}>
          <div className="budget-row-header">
            <div>
              <strong>{row.category}</strong>
              <span title={`${formatFullCurrency(row.spent)} spent of ${formatFullCurrency(row.budget)}`}>
                {formatCurrency(row.spent, { compact: true, maximumFractionDigits: 0 })} spent of{' '}
                {formatCurrency(row.budget, { compact: true, maximumFractionDigits: 0 })}
              </span>
            </div>
            <label className="budget-input">
              <span>Budget</span>
              <input
                min="0"
                onChange={(event) => updateBudget(row.category, event.target.value)}
                step="100"
                type="number"
                value={row.budget}
              />
            </label>
          </div>

          <div className="budget-meter" aria-label={`${row.category} budget usage`}>
            <span
              className={`budget-meter-fill ${row.status}`}
              style={{ width: `${Math.min(row.percentage, 100)}%` }}
            />
          </div>

          <div className="budget-row-footer">
            <span>{Math.round(row.percentage)}% used</span>
            <span>
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
