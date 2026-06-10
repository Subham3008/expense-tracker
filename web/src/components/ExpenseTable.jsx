import EmptyState from './EmptyState.jsx';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  currency: 'INR',
  maximumFractionDigits: 2,
  style: 'currency',
});

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
    <div className="table-wrap">
      <table className="expense-table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Category</th>
            <th scope="col">Note</th>
            <th className="amount-cell" scope="col">
              Amount
            </th>
            <th className="actions-cell" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td data-label="Date">{formatDate(expense.date)}</td>
              <td data-label="Category">
                <span className="category-pill">{expense.category}</span>
              </td>
              <td data-label="Note">{expense.note || '-'}</td>
              <td className="amount-cell" data-label="Amount">
                {currencyFormatter.format(expense.amount)}
              </td>
              <td className="actions-cell" data-label="Actions">
                <div className="row-actions">
                  <button className="text-button" onClick={() => onEdit(expense)} type="button">
                    Edit
                  </button>
                  <button className="danger-button" onClick={() => onDelete(expense._id)} type="button">
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
