import { formatCurrency, formatFullCurrency } from '../utils/formatCurrency.js';
import { cx } from '../utils/uiClasses.js';

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
});

const formatPercent = (value) => `${Math.abs(value).toFixed(1)}%`;

const MonthlyInsights = ({ averageDailySpend, insights, monthlySpent }) => {
  const monthChange = insights.monthOverMonthChange;
  const hasPreviousMonth = monthChange !== null;
  const changeDirection = monthChange > 0 ? 'higher' : 'lower';
  const busiestDay = insights.busiestDay;

  const insightCards = [
    {
      detail: hasPreviousMonth
        ? `${formatPercent(monthChange)} ${changeDirection} than last month`
        : 'Add previous-month expenses for comparison',
      label: 'Month Trend',
      title: hasPreviousMonth ? formatFullCurrency(monthlySpent) : undefined,
      tone: hasPreviousMonth && monthChange > 0 ? 'warning' : 'good',
      value: hasPreviousMonth ? formatCurrency(monthlySpent, { compact: true, maximumFractionDigits: 0 }) : 'No baseline',
    },
    {
      detail: 'Based on spending so far this month',
      label: 'Projected Spend',
      title: formatFullCurrency(insights.projectedMonthlySpend),
      tone: 'neutral',
      value: formatCurrency(insights.projectedMonthlySpend, { compact: true, maximumFractionDigits: 0 }),
    },
    {
      detail: 'Average per elapsed day',
      label: 'Daily Pace',
      title: formatFullCurrency(averageDailySpend),
      tone: 'neutral',
      value: formatCurrency(averageDailySpend, { compact: true, maximumFractionDigits: 0 }),
    },
    {
      detail: busiestDay
        ? `${dateFormatter.format(new Date(busiestDay.date))} had the highest spend`
        : 'Appears after current-month expenses',
      label: 'Busiest Day',
      title: busiestDay ? formatFullCurrency(busiestDay.amount) : undefined,
      tone: 'neutral',
      value: busiestDay ? formatCurrency(busiestDay.amount, { compact: true, maximumFractionDigits: 0 }) : '-',
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {insightCards.map((card) => (
        <article
          className={cx(
            'grid min-h-36 min-w-0 content-start gap-2.5 rounded-lg border p-4 hover:-translate-y-0.5 dark:hover:border-emerald-400/30',
            card.tone === 'good'
              ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-400/30 dark:bg-emerald-400/10'
              : card.tone === 'warning'
                ? 'border-amber-200 bg-amber-50 dark:border-amber-300/30 dark:bg-amber-300/10'
                : 'border-slate-200 bg-slate-50 dark:border-slate-500/20 dark:bg-white/[0.035]',
          )}
          key={card.label}
        >
          <p className="m-0 text-sm font-bold text-slate-500 dark:text-slate-400">{card.label}</p>
          <strong
            className="block break-words font-display text-2xl font-black leading-tight text-slate-950 sm:text-[clamp(1.35rem,1.1rem+0.65vw,1.8rem)] dark:text-slate-50"
            title={card.title}
          >
            {card.value}
          </strong>
          <span className="max-w-60 text-sm font-bold leading-6 text-slate-500 dark:text-slate-400">
            {card.detail}
          </span>
        </article>
      ))}
    </div>
  );
};

export default MonthlyInsights;
