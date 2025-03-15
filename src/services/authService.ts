import axios from 'axios';

const API_URL = '/api/auth'; // Adjust the base URL as necessary

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // Adjust based on your API response structure
};

// Other auth functions (logout, refresh token) can be added here
