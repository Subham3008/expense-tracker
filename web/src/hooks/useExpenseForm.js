import { useMemo, useState } from 'react';
import { createExpense, updateExpense } from '../services/expenseApi.js';

export const EXPENSE_CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

const today = () => new Date().toISOString().slice(0, 10);

const emptyForm = {
  amount: '',
  category: 'Food',
  date: today(),
  note: '',
};

const toFormValues = (expense) => {
  if (!expense) {
    return emptyForm;
  }

  return {
    amount: String(expense.amount ?? ''),
    category: expense.category ?? 'Food',
    date: expense.date ? new Date(expense.date).toISOString().slice(0, 10) : today(),
    note: expense.note ?? '',
  };
};

const validateExpense = (values) => {
  const errors = {};
  const amount = Number(values.amount);

  if (!values.amount) {
    errors.amount = 'Enter an amount';
  } else if (!Number.isFinite(amount) || amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!EXPENSE_CATEGORIES.includes(values.category)) {
    errors.category = 'Choose a valid category';
  }

  if (!values.date) {
    errors.date = 'Choose a date';
  } else if (new Date(values.date) > new Date()) {
    errors.date = 'Date cannot be in the future';
  }

  if (values.note.length > 240) {
    errors.note = 'Note must be 240 characters or less';
  }

  return errors;
};

export const useExpenseForm = ({ initialExpense, onSuccess } = {}) => {
  const [values, setValues] = useState(() => toFormValues(initialExpense));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const isEditing = Boolean(initialExpense?._id);
  const maxDate = useMemo(() => today(), []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }));
  };

  const resetForm = () => {
    setValues(toFormValues(initialExpense));
    setErrors({});
    setMessage('');
    setStatus('idle');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateExpense(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('error');
      setMessage('Please fix the highlighted fields.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    const payload = {
      amount: Number(values.amount),
      category: values.category,
      date: values.date,
      note: values.note.trim(),
    };

    try {
      const savedExpense = isEditing
        ? await updateExpense(initialExpense._id, payload)
        : await createExpense(payload);

      setStatus('success');
      setMessage(isEditing ? 'Expense updated.' : 'Expense added.');
      onSuccess?.(savedExpense);

      if (!isEditing) {
        setValues(emptyForm);
      }
    } catch (error) {
      const apiMessage = error.response?.data?.message;

      setStatus('error');
      setMessage(apiMessage ?? 'Unable to save expense. Please try again.');
    }
  };

  return {
    errors,
    handleChange,
    handleSubmit,
    isEditing,
    maxDate,
    message,
    resetForm,
    status,
    values,
  };
};
