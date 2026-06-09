import { EXPENSE_CATEGORIES } from '../models/Expense.js';

const editableFields = ['amount', 'category', 'date', 'note'];

const sendValidationError = (res, errors) => {
  res.status(400).json({
    message: 'Expense validation failed',
    errors,
  });
};

const isFutureDate = (value) => {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) || date > new Date();
};

const hasUnknownFields = (body) =>
  Object.keys(body).filter((field) => !editableFields.includes(field));

export const validateCreateExpense = (req, res, next) => {
  const errors = [];
  const { amount, category, date } = req.body;

  if (amount === undefined) {
    errors.push('Amount is required');
  } else if (typeof amount !== 'number' || amount <= 0) {
    errors.push('Amount must be a positive number');
  }

  if (!category) {
    errors.push('Category is required');
  } else if (!EXPENSE_CATEGORIES.includes(category)) {
    errors.push('Category must be one of: Food, Transport, Bills, Entertainment, Other');
  }

  if (!date) {
    errors.push('Date is required');
  } else if (isFutureDate(date)) {
    errors.push('Date must be valid and cannot be in the future');
  }

  const unknownFields = hasUnknownFields(req.body);

  if (unknownFields.length > 0) {
    errors.push(`Unknown fields: ${unknownFields.join(', ')}`);
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};

export const validateUpdateExpense = (req, res, next) => {
  const errors = [];
  const { amount, category, date } = req.body;
  const providedFields = Object.keys(req.body);

  if (providedFields.length === 0) {
    errors.push('At least one field is required');
  }

  const unknownFields = hasUnknownFields(req.body);

  if (unknownFields.length > 0) {
    errors.push(`Unknown fields: ${unknownFields.join(', ')}`);
  }

  if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
    errors.push('Amount must be a positive number');
  }

  if (category !== undefined && !EXPENSE_CATEGORIES.includes(category)) {
    errors.push('Category must be one of: Food, Transport, Bills, Entertainment, Other');
  }

  if (date !== undefined && isFutureDate(date)) {
    errors.push('Date must be valid and cannot be in the future');
  }

  if (errors.length > 0) {
    return sendValidationError(res, errors);
  }

  return next();
};
