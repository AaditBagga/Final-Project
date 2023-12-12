const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  userId: String,
  category: String,
  amount: Number,
});

module.exports = mongoose.model('Budget', BudgetSchema);
