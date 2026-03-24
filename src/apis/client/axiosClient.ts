// axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://your-api-url.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
