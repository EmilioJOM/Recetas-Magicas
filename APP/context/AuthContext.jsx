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
            setUser(JSON.parse(storedUser)); // carga rápido lo que había
          }

          // Intentar validar el token y obtener el perfil actualizado
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
      await saveStorageData(token, user);
    } catch (error) {
      handleError(error);
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
    } catch (error) {
      handleError(error);
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    setErrors(null);
    await clearStorageData();
    navigation.navigate('WelcomeScreen');
  };

  const handleError = (error) => {
    if (error.response?.data) {
      setErrors(
        Array.isArray(error.response.data)
          ? error.response.data
          : [error.response.data]
      );
    } else {
      setErrors(['Error inesperado, intenta más tarde']);
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
