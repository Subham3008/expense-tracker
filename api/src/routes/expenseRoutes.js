import { Router } from 'express';
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../controllers/expenseController.js';
import {
  validateCreateExpense,
  validateUpdateExpense,
} from '../middlewares/validateExpense.js';

const router = Router();

router.route('/').get(getExpenses).post(validateCreateExpense, createExpense);
router.route('/:id').put(validateUpdateExpense, updateExpense).delete(deleteExpense);

export default router;
