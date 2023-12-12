import axios from 'axios';

const API_URL = 'http://localhost:3001/api/expenses'; // Replace with your actual API endpoint

// Fetch all expenses for a user
export const getExpenses = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return [];
  }
};

// Add a new expense
export const addExpense = async (userId, category, amount, date) => {
  try {
    const response = await axios.post(`${API_URL}/add`, { userId, category, amount, date });
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    return null;
  }
};

// Update an existing expense
export const updateExpense = async (expenseId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${expenseId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    return null;
  }
};

// Delete an expense
export const deleteExpense = async (expenseId) => {
  try {
    await axios.delete(`${API_URL}/delete/${expenseId}`);
    return true;
  } catch (error) {
    console.error('Error deleting expense:', error);
    return false;
  }
};
