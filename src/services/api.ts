import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecoleta-oficial.herokuapp.com',
});

export default api;
