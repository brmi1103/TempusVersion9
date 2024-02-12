// client/src/services/authService.js

import axios from 'axios';

const API_URL = '/api/users/';

// Register a new user
const register = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'register', userData);
    if (response.data.token) {
      // Optionally store the token in local storage
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data; // Return response data for further handling
  } catch (error) {
    // Log error or throw custom error based on response
    throw error.response ? error.response.data : new Error('Registration failed');
  }
};

// Log in a user
const login = async (email, password) => {
  try {
    const response = await axios.get(API_URL + 'login', { email, password });
    if (response.data.token) {
      // Store the token in local storage
      localStorage.setItem('userToken', response.data.token);
    }
    return response.data; // Return response data for further handling
  } catch (error) {
    // Log error or throw custom error based on response
    throw error.response ? error.response.data : new Error('Login failed');
  }
};

// Log out the current user
const logout = () => {
  localStorage.removeItem('userToken'); // Remove the token from local storage
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem('userToken');
  return !!token; // Convert token presence to boolean
};

export default {
  register,
  login,
  logout,
  isAuthenticated,
};
