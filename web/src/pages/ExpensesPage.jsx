const ExpensesPage = () => {
  return (
    <section className="page">
      <header className="page-header">
        <div>
          <p className="section-kicker">Records</p>
          <h2>Expenses</h2>
        </div>
      </header>

      <section className="panel">
        <div>
          <p className="section-kicker">Ledger</p>
          <h3>Expense list</h3>
        </div>
        <div className="empty-panel">
          <p>The expense table will appear here after the table feature is added.</p>
        </div>
      </section>
    </section>
  );
};

export default ExpensesPage;
