const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const budgetRoutes = require('./routes/budgetRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://abagga1:3r7AGopREYJgkSF8@cluster0.9qiou6p.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Routes
app.use('/api/budget', budgetRoutes);
app.use('/api/expenses', expenseRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

//const PORT = process.env.PORT || 3001;
//app.listen(PORT, () => {
//  console.log(`Server is running on port ${PORT}`);
//});
