// src/api/auth.js
import axios from 'axios';
//import API from './apiClient';

const API = axios.create({
  baseURL: 'https://recetas-magicas-api.onrender.com',
  // No seteamos Content-Type para que axios lo maneje según corresponda
});

// Función para registrar usuario primer etapa ( Alias - Email )
export const authValidate = (userData) => API.post('/auth/validate', userData);

// Función para validar el código segunda etapa ( Email - Code )
export const validateCode = (dataCode) => API.post('/auth/validateCode', dataCode);

// Función para registrar el usuario (Alias - Email - Password)
export const registerRequest = (userData) => API.post('/auth/register', userData);

// Función para subir datos y fotos del DNI (DNI, número de trámite, frente y dorso)
export const userDni = (formData) => API.post('/user/dni', formData);

// Función para subir los datos de tarjeta (Numero de tarjeta - Nombre y Apellido del titular - Fecha Nacimiento - Codigo de Seguridad)
export const tarjetasRegistrar = (cardData) => API.post('/tarjetas/registrar', cardData, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // si tu backend lo requiere
  },
});

// Función para loguear usuario ( Email - Password )
export const loginRequest = (userData) => API.post('auth/login', userData);

// Función para recuperar contraseña ( Email )
export const recoverPassword = (userData) => API.post('auth/recoverPassword', userData);

//--------recipes--------

// Función para recuperar 5 ultimas recetas ( )
export const getLatestRecipes = (limit = 5) => API.get(`/recipes/latest?n=${limit}`);
//export const getLatestRecipes = () => API.get('/recipes/latest');

// Función para recuperar todas las recetas ( )
export const getRecipes = (limit = 5) => API.get(`/recipes?n=${limit}`);

// Función para recuperar recetas porbuscador y filtros ( filterData )
export const getRecipesFilter = (filterData) => API.get('/search/search');