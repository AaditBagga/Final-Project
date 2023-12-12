const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const { getBudgets } = require('../controllers/budgetController');

router.post('/add', addExpense);
router.get('/', getExpenses);
router.get('/categories', getBudgets);
router.put('/update/:expenseId', updateExpense);
router.delete('/delete/:expenseId', deleteExpense);

module.exports = router;
