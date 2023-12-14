const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    try {
        const newExpense = new Expense({
            userId: req.body.userId,
            category: req.body.category,
            amount: req.body.amount,
            date: req.body.date
        });
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const { userId, month } = req.query;
        let query = { userId: userId };

        if (month) {
            // Assuming month is in 'MM' format
            const year = new Date().getFullYear(); // Use the current year
            const startDate = new Date(`${year}-${month}-01`);
            const endDate = new Date(year, startDate.getMonth() + 1, 1);

            query.date = { $gte: startDate, $lt: endDate };
        }

        const expenses = await Expense.find(query);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.expenseId,
            req.body,
            { new: true }
        );
        res.json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.expenseId);
        res.json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
