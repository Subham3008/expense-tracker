const summaryCards = [
  { label: 'Total Spent', value: 'Rs 0', detail: 'No expenses yet' },
  { label: 'This Month', value: 'Rs 0', detail: 'Ready for tracking' },
  { label: 'Top Category', value: '-', detail: 'Appears after expenses' },
];

const DashboardPage = () => {
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
            <strong>{card.value}</strong>
            <span>{card.detail}</span>
          </article>
        ))}
      </div>

      <section className="panel">
        <div>
          <p className="section-kicker">Activity</p>
          <h3>Recent spending</h3>
        </div>
        <div className="empty-panel">
          <p>No expense activity is available yet.</p>
        </div>
      </section>
    </section>
  );
};

export default DashboardPage;
