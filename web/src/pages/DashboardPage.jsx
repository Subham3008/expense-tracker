import { Link } from 'react-router-dom';
import BudgetTracker from '../components/BudgetTracker.jsx';
import CategoryChart from '../components/CategoryChart.jsx';
import EmptyState from '../components/EmptyState.jsx';
import MonthlyInsights from '../components/MonthlyInsights.jsx';
import { useDashboardSummary } from '../hooks/useDashboardSummary.js';
import { formatCurrency, formatFullCurrency } from '../utils/formatCurrency.js';

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const monthLabel = new Intl.DateTimeFormat('en-IN', {
  month: 'long',
  year: 'numeric',
}).format(new Date());

const DashboardPage = () => {
  const { error, status, summary } = useDashboardSummary();
  const isLoading = status === 'loading';
  const isError = status === 'error';

  const summaryCards = [
    {
      detail: `${summary.transactionCount} recorded transactions`,
      label: 'Total Spent',
      title: formatFullCurrency(summary.totalSpent),
      value: formatCurrency(summary.totalSpent, { compact: true }),
    },
    {
      detail: monthLabel,
      label: 'This Month',
      title: formatFullCurrency(summary.monthlySpent),
      value: formatCurrency(summary.monthlySpent, { compact: true }),
    },
    {
      detail: 'All-time expense count',
      label: 'Transactions',
      value: String(summary.transactionCount),
    },
    {
      detail: summary.topCategory
        ? formatCurrency(summary.topCategory.amount, { compact: true })
        : 'Appears after expenses',
      label: 'Top Category',
      title: summary.topCategory ? formatFullCurrency(summary.topCategory.amount) : undefined,
      value: summary.topCategory?.category ?? '-',
    },
  ];

  return (
    <section className="page dashboard-page">
      <header className="page-header">
        <div>
          <p className="section-kicker">Overview</p>
          <h2>Dashboard</h2>
          <span className="page-subtitle">Current spending health, budgets, and category movement.</span>
        </div>
        <Link className="primary-button page-header-action" to="/expenses">
          Add expense
        </Link>
      </header>

      <div className="summary-grid" aria-label="Expense summary">
        {summaryCards.map((card) => (
          <article className="metric-card" key={card.label}>
            <p>{card.label}</p>
            <strong className="money-value" title={card.title}>
              {isLoading ? '...' : card.value}
            </strong>
            <span>{card.detail}</span>
          </article>
        ))}
      </div>

      <section className="panel insights-panel">
        <div>
          <p className="section-kicker">Insights</p>
          <h3>Monthly spending signals</h3>
        </div>
        {isLoading ? (
          <EmptyState
            description="Calculating monthly pace, projection, and trend."
            title="Loading monthly insights"
            tone="loading"
          />
        ) : null}
        {isError ? (
          <EmptyState description={error} title="Insights are unavailable" tone="error" />
        ) : null}
        {!isLoading && !isError ? (
          <MonthlyInsights
            averageDailySpend={summary.averageDailySpend}
            insights={summary.insights}
            monthlySpent={summary.monthlySpent}
          />
        ) : null}
      </section>

      <section className="panel activity-panel">
        <div>
          <p className="section-kicker">Activity</p>
          <h3>Recent spending</h3>
        </div>
        {isLoading ? (
          <EmptyState
            description="Fetching recent transactions from the expense API."
            title="Loading recent spending"
            tone="loading"
          />
        ) : null}
        {isError ? (
          <EmptyState description={error} title="Recent spending is unavailable" tone="error" />
        ) : null}
        {!isLoading && !isError && summary.recentExpenses.length === 0 ? (
          <EmptyState
            description="Add expenses from the Expenses page and the latest activity will appear here."
            title="No recent spending"
          />
        ) : null}
        {!isLoading && !isError && summary.recentExpenses.length > 0 ? (
          <div className="recent-list">
            {summary.recentExpenses.map((expense) => (
              <article className="recent-item" key={expense._id}>
                <div>
                  <strong>{expense.category}</strong>
                  <span>{expense.note || dateFormatter.format(new Date(expense.date))}</span>
                </div>
                <p className="money-value" title={formatFullCurrency(expense.amount)}>
                  {formatCurrency(expense.amount, { compact: true })}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="panel chart-panel">
        <div>
          <p className="section-kicker">Categories</p>
          <h3>Spending by category</h3>
        </div>
        {isLoading ? (
          <EmptyState description="Preparing category totals." title="Loading chart" tone="loading" />
        ) : null}
        {isError ? (
          <EmptyState description={error} title="Chart is unavailable" tone="error" />
        ) : null}
        {!isLoading && !isError ? <CategoryChart data={summary.categoryBreakdown} /> : null}
      </section>

      <section className="panel budget-panel">
        <div>
          <p className="section-kicker">Budgets</p>
          <h3>Monthly category limits</h3>
        </div>
        {isLoading ? (
          <EmptyState
            description="Comparing current-month spending with saved budgets."
            title="Loading budget progress"
            tone="loading"
          />
        ) : null}
        {isError ? (
          <EmptyState description={error} title="Budget progress is unavailable" tone="error" />
        ) : null}
        {!isLoading && !isError ? (
          <BudgetTracker monthlyCategoryBreakdown={summary.monthlyCategoryBreakdown} />
        ) : null}
      </section>
    </section>
  );
};

export default DashboardPage;
