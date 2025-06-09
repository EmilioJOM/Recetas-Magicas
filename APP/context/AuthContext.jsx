// src/context/AuthContext.js
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
  const [user, setUser] = useState(null);           // Datos usuario (nombre, email, etc)
  const [token, setToken] = useState(null);         // JWT token
  const [loading, setLoading] = useState(true);     // Para saber si estamos chequeando el token al iniciar app
  const [errors, setErrors] = useState(null);       // Errores generales

  // Cargar token y usuario de AsyncStorage cuando se inicia la app
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          // Opcional: validar token y cargar perfil usuario
          const userData = await fetchUserProfile(storedToken);
          setUser(userData);
        }
      } catch (e) {
        console.log('Error al cargar el token', e);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  // Guardar token y usuario en AsyncStorage
  const saveStorageData = async (token, userData) => {
    try {
      await AsyncStorage.setItem('token', token);
      // Si querés guardar usuario completo (opcional)
      await AsyncStorage.setItem('user', JSON.stringify(userData));
    } catch (e) {
      console.log('Error al guardar en AsyncStorage', e);
    }
  };

  // Limpiar AsyncStorage (logout)
  const clearStorageData = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    } catch (e) {
      console.log('Error al limpiar AsyncStorage', e);
    }
  };

  // Signup
  const signup = async (userInfo) => {
    setErrors(null); // limpiar errores previos
    try {
      const res = await registerRequest(userInfo); // llamá a la API para registrar
      const { token, user } = res.data; // asumo que el backend devuelve token y usuario
      setToken(token);
      setUser(user);
      await saveStorageData(token, user);
    } catch (error) {
      // Mejor manejo de errores, que puede ser un array o mensaje simple
      if (error.response?.data) {
        setErrors(
          Array.isArray(error.response.data)
            ? error.response.data
            : [error.response.data]
        );
      } else {
        setErrors(['Error inesperado, intenta más tarde']);
      }
    }
  };

  // Signin
  const signin = async (credentials) => {
    setErrors(null);
    try {
      const res = await loginRequest(credentials); // llamá a la API para login
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      await saveStorageData(token, user);
    } catch (error) {
      if (error.response?.data) {
        setErrors(
          Array.isArray(error.response.data)
            ? error.response.data
            : [error.response.data]
        );
      } else {
        setErrors(['Error inesperado, intenta más tarde']);
      }
    }
  };

  // Logout
  const logout = async () => {
    setToken(null);
    setUser(null);
    setErrors(null);
    await clearStorageData();
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
