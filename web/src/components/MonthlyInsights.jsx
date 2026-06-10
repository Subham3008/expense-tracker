const currencyFormatter = new Intl.NumberFormat('en-IN', {
  currency: 'INR',
  maximumFractionDigits: 0,
  style: 'currency',
});

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
      tone: hasPreviousMonth && monthChange > 0 ? 'warning' : 'good',
      value: hasPreviousMonth ? currencyFormatter.format(monthlySpent) : 'No baseline',
    },
    {
      detail: 'Based on spending so far this month',
      label: 'Projected Spend',
      tone: 'neutral',
      value: currencyFormatter.format(insights.projectedMonthlySpend),
    },
    {
      detail: 'Average per elapsed day',
      label: 'Daily Pace',
      tone: 'neutral',
      value: currencyFormatter.format(averageDailySpend),
    },
    {
      detail: busiestDay
        ? `${dateFormatter.format(new Date(busiestDay.date))} had the highest spend`
        : 'Appears after current-month expenses',
      label: 'Busiest Day',
      tone: 'neutral',
      value: busiestDay ? currencyFormatter.format(busiestDay.amount) : '-',
    },
  ];

  return (
    <div className="insights-grid">
      {insightCards.map((card) => (
        <article className={`insight-card ${card.tone}`} key={card.label}>
          <p>{card.label}</p>
          <strong>{card.value}</strong>
          <span>{card.detail}</span>
        </article>
      ))}
    </div>
  );
};

export default MonthlyInsights;
