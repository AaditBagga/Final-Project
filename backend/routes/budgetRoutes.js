const express = require('express');
const router = express.Router();
const { addBudgetCategory, getBudgets, getBudget, updateBudgetCategory, deleteBudgetCategory } = require('../controllers/budgetController');

router.post('/add', addBudgetCategory);
router.get('/categories', getBudgets);
router.get('/', getBudget);
router.put('/update/:categoryId', updateBudgetCategory);
router.delete('/delete/:categoryId', deleteBudgetCategory);

module.exports = router;
