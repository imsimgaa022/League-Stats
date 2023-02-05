import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

export const login = (data) => {
  return instance.post('/login', data);
};

export const register = (data) => {
  return instance.post('/register', data);
};