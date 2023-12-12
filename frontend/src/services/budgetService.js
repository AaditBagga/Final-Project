import axios from 'axios';

const API_URL = 'http://localhost:3001/api/budget'; // Replace with your actual API endpoint

// Fetch all budgets for a user
export const getBudgets = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return [];
  }
};

export const getBudget = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}`, { params: { userId } });
    return response.data;
  } catch (error) {
    console.error('Error fetching budgets:', error);
    return [];
  }
};

// Add a new budget category
export const addBudgetCategory = async (userId, category, amount) => {
  try {
    const response = await axios.post(`${API_URL}/add`, { userId, category, amount });
    return response.data;
  } catch (error) {
    console.error('Error adding budget category:', error);
    return null;
  }
};

// Update an existing budget category
export const updateBudgetCategory = async (categoryId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/update/${categoryId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating budget category:', error);
    return null;
  }
};

// Delete a budget category
export const deleteBudgetCategory = async (categoryId) => {
  try {
    await axios.delete(`${API_URL}/delete/${categoryId}`);
    return true;
  } catch (error) {
    console.error('Error deleting budget category:', error);
    return false;
  }
};
