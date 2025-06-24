import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerRequest, loginRequest, fetchUserProfile } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const loadStorageData = async () => {
      const MIN_LOADING_TIME = 2000;
      const startTime = Date.now();

      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');

        if (storedToken) {
          setToken(storedToken);
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }

          const userData = await fetchUserProfile(storedToken);
          setUser(userData);
        }
      } catch (e) {
        console.log('Error al cargar el token', e);
      } finally {
        const elapsed = Date.now() - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsed;
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const saveStorageData = async (token, userData) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (e) {
      console.log('Error al guardar en AsyncStorage', e);
    }
  };

  const clearStorageData = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (e) {
      console.log('Error al limpiar AsyncStorage', e);
    }
  };

  const signup = async (userInfo) => {
    setErrors(null);
    try {
      const res = await registerRequest(userInfo);
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      //await saveStorageData(token, user);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const signin = async ({ email, password, rememberMe }) => {
    setErrors(null);
    try {
      const res = await loginRequest({ email, password });
      const { token, user } = res.data;
      setToken(token);
      setUser(user);

      if (rememberMe) {
        await saveStorageData(token, user);
      }
      return true;
    } catch (error) {
      console.log('Error completo:', error.response?.data); // Para que veas qué trae

      if (error.response && error.response.data && error.response.data.message) {
        // Acá está el mensaje real del backend
        setErrors([{ message: error.response.data.message }]);
      } else {
        // Si no vino un message del backend, mensaje genérico
        setErrors([{ message: 'Email o contraseña incorrectos' }]);
      }
      return false;
    }
  };

  const logout = async (navigation) => {
  setToken(null);
  setUser(null);
  setErrors(null);
  await clearStorageData();

  navigation.reset({
    index: 0,
    routes: [{ name: 'WelcomeScreen' }],
  });
};


  const handleError = (error) => {
    console.log('Error completo en handleError:', error);

    if (error.response && error.response.data) {
      console.log('Error.response.data:', error.response.data);
      // Tomamos el mensaje o todo el objeto si no hay mensaje
      const data = error.response.data;
      const mensajes = [];

      if (Array.isArray(data)) {
        data.forEach(item => {
          if (typeof item === 'string') mensajes.push(item);
          else if (item.message) mensajes.push(item.message);
          else mensajes.push(JSON.stringify(item));
        });
      } else if (typeof data === 'string') {
        mensajes.push(data);
      } else if (data.message) {
        mensajes.push(data.message);
      } else {
        mensajes.push(JSON.stringify(data));
      }

      setErrors(mensajes);
    } else if (error.message) {
      // Puede ser error de red u otro tipo
      setErrors([error.message]);
    } else {
      setErrors(['Email o contraseña incorrectos.']);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        errors,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
