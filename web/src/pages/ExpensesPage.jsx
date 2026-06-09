import { useState } from 'react';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseTable from '../components/ExpenseTable.jsx';
import { useExpenses } from '../hooks/useExpenses.js';

const ExpensesPage = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const { error, expenses, removeExpense, status, upsertExpense } = useExpenses();

  const handleSavedExpense = (expense) => {
    upsertExpense(expense);
    setSelectedExpense(null);
  };

  const handleDeleteExpense = async (id) => {
    await removeExpense(id);

    if (selectedExpense?._id === id) {
      setSelectedExpense(null);
    }
  };

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
          <p className="section-kicker">Capture</p>
          <h3>{selectedExpense ? 'Edit expense' : 'Add expense'}</h3>
        </div>
        <ExpenseForm
          initialExpense={selectedExpense}
          onCancel={() => setSelectedExpense(null)}
          onSuccess={handleSavedExpense}
        />
      </section>

      <section className="panel">
        <div>
          <p className="section-kicker">Ledger</p>
          <h3>Expense list</h3>
        </div>
        <ExpenseTable
          error={error}
          expenses={expenses}
          onDelete={handleDeleteExpense}
          onEdit={setSelectedExpense}
          status={status}
        />
      </section>
    </section>
  );
};

export default ExpensesPage;
