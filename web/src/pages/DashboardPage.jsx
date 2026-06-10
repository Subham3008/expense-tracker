import BudgetTracker from '../components/BudgetTracker.jsx';
import CategoryChart from '../components/CategoryChart.jsx';
import EmptyState from '../components/EmptyState.jsx';
import MonthlyInsights from '../components/MonthlyInsights.jsx';
import { useDashboardSummary } from '../hooks/useDashboardSummary.js';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  currency: 'INR',
  maximumFractionDigits: 2,
  style: 'currency',
});

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const monthLabel = new Intl.DateTimeFormat('en-IN', {
  month: 'long',
  year: 'numeric',
}).format(new Date());

const formatCurrency = (value) => currencyFormatter.format(value);

const DashboardPage = () => {
  const { error, status, summary } = useDashboardSummary();
  const isLoading = status === 'loading';
  const isError = status === 'error';

  const summaryCards = [
    {
      detail: `${summary.transactionCount} recorded transactions`,
      label: 'Total Spent',
      value: formatCurrency(summary.totalSpent),
    },
    {
      detail: monthLabel,
      label: 'This Month',
      value: formatCurrency(summary.monthlySpent),
    },
    {
      detail: 'All-time expense count',
      label: 'Transactions',
      value: String(summary.transactionCount),
    },
    {
      detail: summary.topCategory
        ? formatCurrency(summary.topCategory.amount)
        : 'Appears after expenses',
      label: 'Top Category',
      value: summary.topCategory?.category ?? '-',
    },
  ];

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="section-kicker">Overview</p>
          <h2>Dashboard</h2>
          <span className="page-subtitle">Current spending health, budgets, and category movement.</span>
        </div>
      </header>

      <div className="summary-grid" aria-label="Expense summary">
        {summaryCards.map((card) => (
          <article className="metric-card" key={card.label}>
            <p>{card.label}</p>
            <strong>{isLoading ? '...' : card.value}</strong>
            <span>{card.detail}</span>
          </article>
        ))}
      </div>

      <section className="panel">
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

      <section className="panel">
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
                <p>{formatCurrency(expense.amount)}</p>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className="panel">
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

      <section className="panel">
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
