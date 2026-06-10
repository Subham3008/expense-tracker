import { useMemo, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseTable from '../components/ExpenseTable.jsx';
import { EXPENSE_CATEGORIES } from '../hooks/useExpenseForm.js';
import { useExpenses } from '../hooks/useExpenses.js';
import { exportExpensesCsv } from '../utils/exportExpensesCsv.js';

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const matchesSearch = (expense, searchTerm) => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  if (!normalizedSearch) {
    return true;
  }

  const searchableText = [
    expense.category,
    expense.note,
    String(expense.amount),
    dateFormatter.format(new Date(expense.date)),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return searchableText.includes(normalizedSearch);
};

const matchesCategory = (expense, categoryFilter) => {
  return categoryFilter === 'All' || expense.category === categoryFilter;
};

const ExpensesPage = () => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { error, expenses, removeExpense, status, upsertExpense } = useExpenses();

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      return matchesCategory(expense, categoryFilter) && matchesSearch(expense, searchTerm);
    });
  }, [categoryFilter, expenses, searchTerm]);

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
        <div className="panel-heading-row">
          <div>
            <p className="section-kicker">Ledger</p>
            <h3>Expense list</h3>
          </div>
          <div className="ledger-actions">
            <label className="search-field">
              <span>Search expenses</span>
              <input
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search note, category, amount"
                type="search"
                value={searchTerm}
              />
            </label>
            <button
              className="secondary-button"
              disabled={filteredExpenses.length === 0}
              onClick={() => exportExpensesCsv(filteredExpenses)}
              type="button"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div className="filter-row" aria-label="Filter by category">
          {['All', ...EXPENSE_CATEGORIES].map((category) => (
            <button
              className={categoryFilter === category ? 'filter-chip active' : 'filter-chip'}
              key={category}
              onClick={() => setCategoryFilter(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <ExpenseTable
          error={error}
          expenses={filteredExpenses}
          isFiltered={Boolean(searchTerm.trim()) || categoryFilter !== 'All'}
          onDelete={handleDeleteExpense}
          onEdit={setSelectedExpense}
          status={status}
        />
      </section>
    </section>
  );
};

export default ExpensesPage;
