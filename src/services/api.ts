import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ecoleta-api.ialexanderbrito.dev',
});

export default api;
