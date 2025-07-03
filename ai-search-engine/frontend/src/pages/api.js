import axios from 'axios';

// Use VITE_ env var, properly exposed by Vite
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = async (data) => {
  try {
    const res = await api.post('/users/signup', data);
    return res.data;
  } catch (err) {
    console.error('Signup error:', err?.response?.data || err.message);
    throw err;
  }
};

export const login = async (data) => {
  try {
    const res = await api.post('/users/login', data);
    return res.data;
  } catch (err) {
    console.error('Login error:', err?.response?.data || err.message);
    throw err;
  }
};

export const getCurrentUser = async (token) => {
  try {
    const res = await api.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error('Fetch current user error:', err?.response?.data || err.message);
    throw err;
  }
};

export default api;
