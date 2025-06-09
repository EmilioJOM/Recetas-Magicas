// src/api/apiClient.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://recetas-magicas-api.onrender.com',
  // No seteamos Content-Type para que axios lo maneje según corresponda
});
