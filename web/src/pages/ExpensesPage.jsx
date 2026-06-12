import { useMemo, useState } from 'react';
import ExpenseForm from '../components/ExpenseForm.jsx';
import ExpenseTable from '../components/ExpenseTable.jsx';
import { EXPENSE_CATEGORIES } from '../hooks/useExpenseForm.js';
import { useExpenses } from '../hooks/useExpenses.js';
import { exportExpensesCsv } from '../utils/exportExpensesCsv.js';
import { buttonClasses, cx, formClasses, layoutClasses } from '../utils/uiClasses.js';

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
    <section className={`${layoutClasses.page} max-w-[1180px]`}>
      <header className={layoutClasses.pageHeader}>
        <div>
          <p className={layoutClasses.sectionKicker}>Records</p>
          <h2 className={layoutClasses.pageTitle}>Expenses</h2>
          <span className={layoutClasses.pageSubtitle}>Capture, review, filter, and export your expense ledger.</span>
        </div>
      </header>

      <section className={layoutClasses.panel}>
        <div>
          <p className={layoutClasses.sectionKicker}>Capture</p>
          <h3 className={layoutClasses.panelTitle}>{selectedExpense ? 'Edit expense' : 'Add expense'}</h3>
        </div>
        <ExpenseForm
          initialExpense={selectedExpense}
          onCancel={() => setSelectedExpense(null)}
          onSuccess={handleSavedExpense}
        />
      </section>

      <section className={layoutClasses.panel}>
        <div className={layoutClasses.panelHeadingRow}>
          <div>
            <p className={layoutClasses.sectionKicker}>Ledger</p>
            <h3 className={layoutClasses.panelTitle}>Expense list</h3>
          </div>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
            <label className="grid w-full gap-1.5 lg:w-80">
              <span className="text-xs font-extrabold uppercase tracking-normal text-slate-500 dark:text-slate-400">
                Search expenses
              </span>
              <input
                className={formClasses.input}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search note, category, amount"
                type="search"
                value={searchTerm}
              />
            </label>
            <button
              className={buttonClasses.secondary}
              disabled={filteredExpenses.length === 0}
              onClick={() => exportExpensesCsv(filteredExpenses)}
              type="button"
            >
              Export CSV
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5" aria-label="Filter by category">
          {['All', ...EXPENSE_CATEGORIES].map((category) => (
            <button
              className={cx(
                'min-h-9 rounded-full border px-3 py-2 text-sm font-extrabold',
                categoryFilter === category
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-800 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-zinc-800 dark:bg-[#0d0d0d] dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:bg-zinc-900 dark:hover:text-zinc-100',
              )}
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
