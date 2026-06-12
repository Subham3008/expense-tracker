import EmptyState from './EmptyState.jsx';
import { formatCurrency, formatFullCurrency } from '../utils/formatCurrency.js';
import { buttonClasses } from '../utils/uiClasses.js';

const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

const formatDate = (date) => dateFormatter.format(new Date(date));

const ExpenseTable = ({ error, expenses, isFiltered = false, onDelete, onEdit, status }) => {
  if (status === 'loading') {
    return (
      <EmptyState
        description="Fetching the latest ledger from your API."
        title="Loading expenses"
        tone="loading"
      />
    );
  }

  if (status === 'error') {
    return (
      <EmptyState
        description={error}
        title="Expense data could not be loaded"
        tone="error"
      />
    );
  }

  if (expenses.length === 0) {
    return (
      <EmptyState
        description={
          isFiltered
            ? 'Try a different category or search term to widen the ledger.'
            : 'Add your first expense above to start building the ledger.'
        }
        title={isFiltered ? 'No matching expenses' : 'No expenses yet'}
      />
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-500/20 dark:bg-white/[0.035]">
      <table className="w-full min-w-[760px] border-collapse bg-white dark:bg-transparent">
        <thead>
          <tr>
            <th className="border-b border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-xs font-extrabold uppercase tracking-normal text-slate-500 dark:border-slate-500/15 dark:bg-white/[0.045] dark:text-slate-400" scope="col">Date</th>
            <th className="border-b border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-xs font-extrabold uppercase tracking-normal text-slate-500 dark:border-slate-500/15 dark:bg-white/[0.045] dark:text-slate-400" scope="col">Category</th>
            <th className="border-b border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-xs font-extrabold uppercase tracking-normal text-slate-500 dark:border-slate-500/15 dark:bg-white/[0.045] dark:text-slate-400" scope="col">Note</th>
            <th className="border-b border-slate-200 bg-slate-50 px-4 py-3.5 text-right text-xs font-extrabold uppercase tracking-normal text-slate-500 dark:border-slate-500/15 dark:bg-white/[0.045] dark:text-slate-400" scope="col">
              Amount
            </th>
            <th className="w-[168px] border-b border-slate-200 bg-slate-50 px-4 py-3.5 text-right text-xs font-extrabold uppercase tracking-normal text-slate-500 dark:border-slate-500/15 dark:bg-white/[0.045] dark:text-slate-400" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr className="hover:bg-slate-50 dark:hover:bg-zinc-900" key={expense._id}>
              <td className="border-b border-slate-200 px-4 py-3.5 text-left text-slate-700 dark:border-slate-500/15 dark:text-slate-100" data-label="Date">{formatDate(expense.date)}</td>
              <td className="border-b border-slate-200 px-4 py-3.5 text-left text-slate-700 dark:border-slate-500/15 dark:text-slate-100" data-label="Category">
                <span className="inline-flex min-h-7 items-center rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-extrabold text-emerald-800 dark:bg-zinc-900 dark:text-zinc-200">{expense.category}</span>
              </td>
              <td className="border-b border-slate-200 px-4 py-3.5 text-left text-slate-700 dark:border-slate-500/15 dark:text-slate-100" data-label="Note">{expense.note || '-'}</td>
              <td className="max-w-36 whitespace-nowrap border-b border-slate-200 px-4 py-3.5 text-right text-slate-700 dark:border-slate-500/15 dark:text-slate-100" data-label="Amount">
                <span className="inline-block max-w-full truncate align-bottom" title={formatFullCurrency(expense.amount)}>
                  {formatCurrency(expense.amount, { compact: true })}
                </span>
              </td>
              <td className="w-[168px] whitespace-nowrap border-b border-slate-200 px-4 py-3.5 text-right dark:border-slate-500/15" data-label="Actions">
                <div className="inline-flex justify-end gap-2">
                  <button className={buttonClasses.text} onClick={() => onEdit(expense)} type="button">
                    Edit
                  </button>
                  <button className={buttonClasses.danger} onClick={() => onDelete(expense._id)} type="button">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
