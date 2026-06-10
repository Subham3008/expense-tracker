import { useCategoryBudgets } from '../hooks/useCategoryBudgets.js';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  currency: 'INR',
  maximumFractionDigits: 0,
  style: 'currency',
});

const BudgetTracker = ({ monthlyCategoryBreakdown }) => {
  const { budgetRows, updateBudget } = useCategoryBudgets(monthlyCategoryBreakdown);

  return (
    <div className="budget-list">
      {budgetRows.map((row) => (
        <article className="budget-row" key={row.category}>
          <div className="budget-row-header">
            <div>
              <strong>{row.category}</strong>
              <span>
                {currencyFormatter.format(row.spent)} spent of {currencyFormatter.format(row.budget)}
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
                ? `${currencyFormatter.format(row.spent - row.budget)} over`
                : `${currencyFormatter.format(row.remaining)} left`}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BudgetTracker;
