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
export const userDni = (formData, token) => {
  console.log('Token recibido en userDni:', token); // 🔥 Verifica que llegue
  return API.post('/user/dni', formData, {
    headers: {
      Authorization: `Bearer ${token}`,

    },
  });
};

// Función para subir los datos de tarjeta (Numero de tarjeta - Nombre y Apellido del titular - Fecha Nacimiento - Codigo de Seguridad)
export const tarjetasRegistrar = (cardData) => API.post('/tarjetas/registrar', cardData, {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // si tu backend lo requiere
  },
});

// Función para loguear usuario ( Email - Password )
export const loginRequest = (userData) => API.post('auth/login', userData);

//------------- Recuperar Contraseña -------------------

// Función para recuperar contraseña ( Email )
export const recoverPassword1 = (Data) => API.post('auth/recoverPassword1', Data);

// Funcion para etapa 2 de recuperar contraseña ( Email, Code )
export const recoverPassword2 = (Data) => API.post('auth/recoverPassword2', Data);

// Funcion para etapa 3 de recuperar contraseña ( Token, NewPassword )
export const changePassword = (Data, token) =>
  API.put('user/changePassword', Data, {
    headers: {
      Authorization: `Bearer ${token}`  // o el nombre de header que tu API espere
    }
  });

//--------recipes--------

// Función para recuperar 5 ultimas recetas ( )
export const getLatestRecipes = (limit = 5) => API.get(`/recipes/latest/${limit}`);

//export const getLatestRecipes = (limit = 5) => API.get(`/recipes/latest?n=${limit}`);
//export const getLatestRecipes = () => API.get('/recipes/latest');

// Función para recuperar todas las recetas ( )
//export const getRecipes = (limit = 5) => API.get(`/recipes/${limit}`);
export const getRecipes = () => API.get('/recipes');

// Función para recuperar recetas porbuscador y filtros ( filterData )
export const getRecipesFilter = (filterData) => API.get('/search/search');

//---------- Crear Receta --------------------

// Funcion para crear receta etapa 1 ( title, description, servings, tipoId, image) ARREGLAR
export const createRecipeStepOne = (formData, token) => {
  console.log('Token recibido en createRecipeStepOne:', token);
  return API.post('/recipes/crearReceta1', formData, {
    headers: {
      Authorization: `Bearer ${token}`,

    },
  });
};
export const enviarIngredientes = async (recipeId, token, ingredients) => {
  try {
    const response = await fetch(`https://recetas-magicas-api.onrender.com/recipes/crearReceta2/${recipeId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    });

    const result = await response.text();

    if (!response.ok) {
      console.error("❌ Backend error:", result);
      Alert.alert("Error", "No se pudieron guardar los ingredientes.");
      return false;
    }

    console.log("✅ Ingredientes guardados:", result);
    return true;
  } catch (err) {
    console.error("❌ Error de red:", err);
    Alert.alert("Error", "No se pudo conectar con el servidor.");
    return false;
  }
};

//--------- Ver Receta --------------

// Funcion para buscar receta por id 
export const getRecipeById = (id) => API.get(`recipes/${id}`);

//-------- Buscar Recetas------------

//Funcion para buscar receta
export const searchReceta = (data) =>
  API.post(`search/receta`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });


//--------- Cursos --------------
// Función para recuperar 5 ultimos cursos ( )
export const getLastestCourses = (limit = 5) => API.get(`courses/latest/${limit}`);

// Función para recuperar todos los cursos ( )
export const getCourses = () => API.get('/courses');

//Función para recuperar un curso (id)
export const getCourseById = (id) => API.get(`courses/${id}`);

//------------Catedras--------------

//Funcion para recuperar catedras que den un curso especifico
export const getCatedraByCourseId = (id, token) => {
  return API.get(`courses/catedras/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,

    },
  });
};

//--------- Pagos---------------

//Funcion para mostrar datos de la factura
export const getOrdenCompra = (id, token) => {
  return API.get(`courses/catedras/${id}/ordenCompra`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};