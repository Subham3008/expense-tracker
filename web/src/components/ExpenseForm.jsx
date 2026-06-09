import { EXPENSE_CATEGORIES, useExpenseForm } from '../hooks/useExpenseForm.js';

const ExpenseForm = ({ initialExpense, onSuccess }) => {
  const {
    errors,
    handleChange,
    handleSubmit,
    isEditing,
    maxDate,
    message,
    resetForm,
    status,
    values,
  } = useExpenseForm({ initialExpense, onSuccess });

  const isSubmitting = status === 'submitting';

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="field">
          <span>Amount</span>
          <input
            aria-invalid={Boolean(errors.amount)}
            inputMode="decimal"
            min="0.01"
            name="amount"
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            type="number"
            value={values.amount}
          />
          {errors.amount ? <small>{errors.amount}</small> : null}
        </label>

        <label className="field">
          <span>Category</span>
          <select
            aria-invalid={Boolean(errors.category)}
            name="category"
            onChange={handleChange}
            value={values.category}
          >
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? <small>{errors.category}</small> : null}
        </label>

        <label className="field">
          <span>Date</span>
          <input
            aria-invalid={Boolean(errors.date)}
            max={maxDate}
            name="date"
            onChange={handleChange}
            type="date"
            value={values.date}
          />
          {errors.date ? <small>{errors.date}</small> : null}
        </label>

        <label className="field field-wide">
          <span>Note</span>
          <textarea
            aria-invalid={Boolean(errors.note)}
            maxLength={240}
            name="note"
            onChange={handleChange}
            placeholder="Optional details"
            rows="4"
            value={values.note}
          />
          {errors.note ? <small>{errors.note}</small> : null}
        </label>
      </div>

      <div className="form-footer">
        <p className={`form-message ${status}`} role="status">
          {message}
        </p>
        <div className="form-actions">
          <button className="secondary-button" onClick={resetForm} type="button">
            Reset
          </button>
          <button className="primary-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Saving...' : isEditing ? 'Update expense' : 'Add expense'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
