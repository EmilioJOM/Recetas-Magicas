// src/api/auth.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://recetas-magicas-api.onrender.com', // reemplazá con tu URL real
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para registrar usuario primer etapa (Alias - Email - paidUser)
export const registerRequest = (userData) => API.post('/register', userData);

export const validateCode = (dataCode) => API.post('/validateCode', dataCode);
// Función para loguear usuario
export const loginRequest = (userData) => API.post('/login', userData);

// Otras funciones: verificar código, refrescar token, etc.
