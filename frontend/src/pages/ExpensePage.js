import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import { AuthContext } from '../AuthContext'; 

function ExpensePage() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
       // Fetch categories from the backend
       fetchCategories();
       fetchExpenses(); // Fetch expenses on component mount
     }, [currentUser.uid]);

    // Fetch categories from the backend
    const fetchCategories = () => {
    axios.get('http://localhost:3001/api/budget/categories', { params: { userId: currentUser.uid } })
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  };

  const fetchExpenses = () => {
    axios.get('http://localhost:3001/api/expenses', { params: { userId: currentUser.uid } })
      .then(response => setExpenses(response.data))
      .catch(error => console.error('Error fetching expenses:', error));
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/expenses/add', {
        userId: currentUser.uid,
        category: selectedCategory,
        amount,
        month: selectedMonth
      });
      setExpenses([...expenses, response.data]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'right' }}>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h1>Add Expense</h1>
      <form onSubmit={handleAddExpense}>
        <label>
          Month:
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            required
          />
        </label>
        <label>
          Category:
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            {categories.map(category => (
              <option key={category._id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Expense</button>
      </form>
      <div>
        <h2>Expenses</h2>
        <ul>
          {expenses.map(expense => (
            <li key={expense._id}>
              {expense.category}: ${expense.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpensePage;
