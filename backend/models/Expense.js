const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  userId: String,
  category: String,
  amount: Number,
  date: Date,
});

module.exports = mongoose.model('Expense', ExpenseSchema);
