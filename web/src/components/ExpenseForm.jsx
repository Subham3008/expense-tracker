import { EXPENSE_CATEGORIES, useExpenseForm } from '../hooks/useExpenseForm.js';
import { buttonClasses, cx, formClasses } from '../utils/uiClasses.js';

const ExpenseForm = ({ initialExpense, onCancel = () => {}, onSuccess }) => {
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
  const messageClass = cx(
    'min-h-6 m-0 text-sm font-bold text-slate-500 dark:text-slate-400',
    status === 'success' && 'text-emerald-700 dark:text-zinc-200',
    status === 'error' && 'text-red-700 dark:text-red-300',
  );

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-4 lg:grid-cols-3">
        <label className={formClasses.field}>
          <span className={formClasses.label}>Amount</span>
          <input
            aria-invalid={Boolean(errors.amount)}
            className={formClasses.input}
            inputMode="decimal"
            min="0.01"
            name="amount"
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            type="number"
            value={values.amount}
          />
          {errors.amount ? <small className={formClasses.errorText}>{errors.amount}</small> : null}
        </label>

        <label className={formClasses.field}>
          <span className={formClasses.label}>Category</span>
          <select
            aria-invalid={Boolean(errors.category)}
            className={formClasses.input}
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
          {errors.category ? <small className={formClasses.errorText}>{errors.category}</small> : null}
        </label>

        <label className={formClasses.field}>
          <span className={formClasses.label}>Date</span>
          <input
            aria-invalid={Boolean(errors.date)}
            className={formClasses.input}
            max={maxDate}
            name="date"
            onChange={handleChange}
            type="date"
            value={values.date}
          />
          {errors.date ? <small className={formClasses.errorText}>{errors.date}</small> : null}
        </label>

        <label className={`${formClasses.field} lg:col-span-3`}>
          <span className={formClasses.label}>Note</span>
          <textarea
            aria-invalid={Boolean(errors.note)}
            className={`${formClasses.input} min-h-28 resize-y`}
            maxLength={240}
            name="note"
            onChange={handleChange}
            placeholder="Optional details"
            rows="4"
            value={values.note}
          />
          {errors.note ? <small className={formClasses.errorText}>{errors.note}</small> : null}
        </label>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className={messageClass} role="status">
          {message}
        </p>
        <div className="flex flex-wrap justify-end gap-2.5">
          <button className={buttonClasses.secondary} onClick={isEditing ? onCancel : resetForm} type="button">
            {isEditing ? 'Cancel edit' : 'Reset'}
          </button>
          <button className={buttonClasses.primary} disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Saving...' : isEditing ? 'Update expense' : 'Add expense'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
