import API from './apiClient';

// Función para recuperar 5 ultimas recetas ( )
export const getLatestRecipes = () => API.get('/recipes/latest');