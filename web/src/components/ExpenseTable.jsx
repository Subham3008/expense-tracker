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
      <div className="empty-panel">
        <p>Loading expenses...</p>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="empty-panel error-panel">
        <p>{error}</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="empty-panel">
        <p>{isFiltered ? 'No expenses match your search.' : 'No expenses found. Add your first expense above.'}</p>
      </div>
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
              <td>{formatDate(expense.date)}</td>
              <td>
                <span className="category-pill">{expense.category}</span>
              </td>
              <td>{expense.note || '-'}</td>
              <td className="amount-cell">{currencyFormatter.format(expense.amount)}</td>
              <td className="actions-cell">
                <button className="text-button" onClick={() => onEdit(expense)} type="button">
                  Edit
                </button>
                <button className="danger-button" onClick={() => onDelete(expense._id)} type="button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
