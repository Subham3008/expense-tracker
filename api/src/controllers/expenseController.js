import mongoose from 'mongoose';
import Expense from '../models/Expense.js';

const sendError = (res, statusCode, message) => {
  res.status(statusCode).json({ message });
};

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getExpenses = async (_req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 });

    res.status(200).json({ expenses });
  } catch (error) {
    sendError(res, 500, error.message);
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
