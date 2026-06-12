import { Link } from 'react-router-dom';
import BudgetTracker from '../components/BudgetTracker.jsx';
import CategoryChart from '../components/CategoryChart.jsx';
import EmptyState from '../components/EmptyState.jsx';
import MonthlyInsights from '../components/MonthlyInsights.jsx';
import { useDashboardSummary } from '../hooks/useDashboardSummary.js';
import { formatCurrency, formatFullCurrency } from '../utils/formatCurrency.js';
import { buttonClasses, cardClasses, layoutClasses } from '../utils/uiClasses.js';

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
    <section className={`${layoutClasses.page} grid-cols-1 lg:grid-cols-12`}>
      <header className={`${layoutClasses.pageHeader} lg:col-span-12`}>
        <div>
          <p className={layoutClasses.sectionKicker}>Overview</p>
          <h2 className={layoutClasses.pageTitle}>Dashboard</h2>
          <span className={layoutClasses.pageSubtitle}>
            Current spending health, budgets, and category movement.
          </span>
        </div>
        <Link className={`${buttonClasses.primary} w-full sm:w-auto sm:min-w-32`} to="/expenses">
          Add expense
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4" aria-label="Expense summary">
        {summaryCards.map((card) => (
          <article className={cardClasses.metric} key={card.label}>
            <p className="m-0 text-sm font-bold text-slate-500 dark:text-slate-400">{card.label}</p>
            <strong
              className="inline-block max-w-full truncate align-bottom font-display text-3xl font-black leading-none text-slate-950 dark:text-slate-50"
              title={card.title}
            >
              {isLoading ? '...' : card.value}
            </strong>
            <span className="text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">{card.detail}</span>
          </article>
        ))}
      </div>

      <section className={`${layoutClasses.panel} lg:col-span-6`}>
        <div>
          <p className={layoutClasses.sectionKicker}>Insights</p>
          <h3 className={layoutClasses.panelTitle}>Monthly spending signals</h3>
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

      <section className={`${layoutClasses.panel} lg:col-span-6`}>
        <div>
          <p className={layoutClasses.sectionKicker}>Activity</p>
          <h3 className={layoutClasses.panelTitle}>Recent spending</h3>
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
          <div className="grid gap-3">
            {summary.recentExpenses.map((expense) => (
              <article
                className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-[#0d0d0d] dark:hover:border-zinc-600"
                key={expense._id}
              >
                <div className="grid min-w-0 gap-1">
                  <strong className="text-slate-950 dark:text-slate-50">{expense.category}</strong>
                  <span className="truncate text-sm font-semibold text-slate-500 dark:text-slate-400">
                    {expense.note || dateFormatter.format(new Date(expense.date))}
                  </span>
                </div>
                <p
                  className="m-0 max-w-[42%] truncate font-black text-slate-950 dark:text-slate-50"
                  title={formatFullCurrency(expense.amount)}
                >
                  {formatCurrency(expense.amount, { compact: true })}
                </p>
              </article>
            ))}
          </div>
        ) : null}
      </section>

      <section className={`${layoutClasses.panel} lg:col-span-12`}>
        <div>
          <p className={layoutClasses.sectionKicker}>Categories</p>
          <h3 className={layoutClasses.panelTitle}>Spending by category</h3>
        </div>
        {isLoading ? (
          <EmptyState description="Preparing category totals." title="Loading chart" tone="loading" />
        ) : null}
        {isError ? (
          <EmptyState description={error} title="Chart is unavailable" tone="error" />
        ) : null}
        {!isLoading && !isError ? <CategoryChart data={summary.categoryBreakdown} /> : null}
      </section>

      <section className={`${layoutClasses.panel} lg:col-span-12`}>
        <div>
          <p className={layoutClasses.sectionKicker}>Budgets</p>
          <h3 className={layoutClasses.panelTitle}>Monthly category limits</h3>
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
