import axios from 'axios';

import serverAddress from './server-address';

const api = axios.create({
  baseURL: `${serverAddress}/api`,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
