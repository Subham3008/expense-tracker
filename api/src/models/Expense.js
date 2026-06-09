import mongoose from 'mongoose';

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transport',
  'Bills',
  'Entertainment',
  'Other',
];

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    category: {
      type: String,
      enum: {
        values: EXPENSE_CATEGORIES,
        message: 'Category must be one of: Food, Transport, Bills, Entertainment, Other',
      },
      required: [true, 'Category is required'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      validate: {
        validator(value) {
          return value <= new Date();
        },
        message: 'Date cannot be in the future',
      },
    },
    note: {
      type: String,
      trim: true,
      maxlength: [240, 'Note cannot exceed 240 characters'],
      default: '',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

expenseSchema.index({ date: -1, createdAt: -1 });
expenseSchema.index({ category: 1, date: -1 });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
