import mongoose from 'mongoose';
import Expense, { EXPENSE_CATEGORIES } from '../models/Expense.js';

const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const parseDateFilter = (value, fieldName) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    const error = new Error(`${fieldName} must be a valid date`);
    error.statusCode = 400;
    throw error;
  }

  return date;
};

const buildExpenseFilters = ({ category, from, to }) => {
  const filters = {};

  if (category) {
    if (!EXPENSE_CATEGORIES.includes(category)) {
      const error = new Error(
        'Category must be one of: Food, Transport, Bills, Entertainment, Other',
      );
      error.statusCode = 400;
      throw error;
    }

    filters.category = category;
  }

  const fromDate = parseDateFilter(from, 'from');
  const toDate = parseDateFilter(to, 'to');

  if (fromDate || toDate) {
    filters.date = {};
  }

  if (fromDate) {
    filters.date.$gte = fromDate;
  }

  if (toDate) {
    toDate.setHours(23, 59, 59, 999);
    filters.date.$lte = toDate;
  }

  if (fromDate && toDate && fromDate > toDate) {
    const error = new Error('from date cannot be after to date');
    error.statusCode = 400;
    throw error;
  }

  return filters;
};

export const getExpenses = async (req, res) => {
  try {
    const filters = buildExpenseFilters(req.query);
    const expenses = await Expense.find(filters).sort({ date: -1, createdAt: -1 });

    res.status(200).json({ expenses });
  } catch (error) {
    sendError(res, error.statusCode ?? 500, error.message);
  }
};

export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json({ expense });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendError(res, 400, error.message);
    }

    return sendError(res, 500, error.message);
  }
};

export const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid expense id');
    }

    const expense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!expense) {
      return sendError(res, 404, 'Expense not found');
    }

    return res.status(200).json({ expense });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return sendError(res, 400, error.message);
    }

    return sendError(res, 500, error.message);
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return sendError(res, 400, 'Invalid expense id');
    }

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return sendError(res, 404, 'Expense not found');
    }

    return res.status(200).json({ expense });
  } catch (error) {
    return sendError(res, 500, error.message);
  }
};
