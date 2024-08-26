// src/api/auth.js

import axios from 'axios';

const VITE_API_USER_AUTH_URL = import.meta.env.VITE_API_USER_AUTH_URL;


export const login = async (credentials) => {
  try {
    const response = await axios.post(`${VITE_API_USER_AUTH_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
export const register = async (credentials) => {
  try {
    const response = await axios.post(`${VITE_API_USER_AUTH_URL}/register`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error registering in:', error);
    throw error;
  }
};


export const updateProfile = async (credentials, token) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_USER_AUTH_URL}/update_profile`,
      credentials,
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
