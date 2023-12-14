import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import { AuthContext } from '../AuthContext'; 

function BudgetPage() {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [budgets, setBudgets] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle adding a new budget category
  const addBudgetCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://157.245.132.124:3001/api/budget/add', {
        userId: currentUser.uid,
        category,
        amount
      });
      setBudgets([...budgets, response.data]);
    } catch (error) {
      console.error('Error adding budget category:', error);
    }
  };

  // Handle removing a budget category
  const removeBudgetCategory = async (categoryId) => {
    try {
      await axios.delete(`http://157.245.132.124:3001/api/budget/delete/${categoryId}`);
      setBudgets(budgets.filter(budget => budget._id !== categoryId));
    } catch (error) {
      console.error('Error removing budget category:', error);
    }
  };

  // Handle logout
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
      <h1>Budget Categories</h1>
      <form onSubmit={addBudgetCategory}>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Monthly Budget Amount"
          required
        />
        <button type="submit">Add Category</button>
      </form>
      <ul>
        {budgets.map(budget => (
          <li key={budget._id}>
            {budget.category}: ${budget.amount}
            <button onClick={() => removeBudgetCategory(budget._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BudgetPage;
