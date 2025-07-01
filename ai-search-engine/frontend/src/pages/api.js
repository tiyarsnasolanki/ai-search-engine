import axios from 'axios';

const baseURL = import.meta.env.PROD 
  ? 'http://bananasit.com/aisearch/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL,
});

export const signup = async (data) => {
  try {
    const response = await api.post('/signup', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};