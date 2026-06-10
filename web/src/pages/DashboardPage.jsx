import BudgetTracker from '../components/BudgetTracker.jsx';
import CategoryChart from '../components/CategoryChart.jsx';
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
          <p className="section-kicker">Activity</p>
          <h3>Recent spending</h3>
        </div>
        {isLoading ? (
          <div className="empty-panel">
            <p>Loading dashboard summary...</p>
          </div>
        ) : null}
        {isError ? (
          <div className="empty-panel error-panel">
            <p>{error}</p>
          </div>
        ) : null}
        {!isLoading && !isError && summary.recentExpenses.length === 0 ? (
          <div className="empty-panel">
            <p>No expense activity is available yet.</p>
          </div>
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
          <div className="empty-panel">
            <p>Loading category chart...</p>
          </div>
        ) : null}
        {isError ? (
          <div className="empty-panel error-panel">
            <p>{error}</p>
          </div>
        ) : null}
        {!isLoading && !isError ? <CategoryChart data={summary.categoryBreakdown} /> : null}
      </section>

      <section className="panel">
        <div>
          <p className="section-kicker">Budgets</p>
          <h3>Monthly category limits</h3>
        </div>
        {isLoading ? (
          <div className="empty-panel">
            <p>Loading budget progress...</p>
          </div>
        ) : null}
        {isError ? (
          <div className="empty-panel error-panel">
            <p>{error}</p>
          </div>
        ) : null}
        {!isLoading && !isError ? (
          <BudgetTracker monthlyCategoryBreakdown={summary.monthlyCategoryBreakdown} />
        ) : null}
      </section>
    </section>
  );
};

export default DashboardPage;
