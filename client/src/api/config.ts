// API Configuration
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://hotwings-api.vercel.app/api'
  : 'http://localhost:5000/api';

export default API_URL; 