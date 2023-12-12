const Budget = require('../models/Budget');

exports.addBudgetCategory = async (req, res) => {
    try {
        const newBudget = new Budget({
            userId: req.body.userId,
            category: req.body.category,
            amount: req.body.amount
        });
        const savedBudget = await newBudget.save();
        res.status(201).json(savedBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.query.userId }).select('category');
        res.json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBudget = async (req, res) => {
    try {
        const budget = await Budget.find({ userId: req.query.userId });
        res.json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBudgetCategory = async (req, res) => {
    try {
        const updatedBudget = await Budget.findByIdAndUpdate(
            req.params.categoryId,
            req.body,
            { new: true }
        );
        res.json(updatedBudget);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBudgetCategory = async (req, res) => {
    try {
        await Budget.findByIdAndDelete(req.params.categoryId);
        res.json({ message: 'Budget category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
