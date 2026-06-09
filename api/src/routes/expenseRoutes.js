import { Router } from 'express';
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../controllers/expenseController.js';

const router = Router();

router.route('/').get(getExpenses).post(createExpense);
router.route('/:id').put(updateExpense).delete(deleteExpense);

export default router;
