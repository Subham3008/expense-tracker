import { formatCurrency, formatFullCurrency } from '../utils/formatCurrency.js';

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
    <div className="insights-grid">
      {insightCards.map((card) => (
        <article className={`insight-card ${card.tone}`} key={card.label}>
          <p>{card.label}</p>
          <strong className="money-value" title={card.title}>
            {card.value}
          </strong>
          <span>{card.detail}</span>
        </article>
      ))}
    </div>
  );
};

export default MonthlyInsights;
