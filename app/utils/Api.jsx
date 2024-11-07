import axios from 'axios';
import { Alert } from 'react-native';

const api = axios.create({
  baseURL: 'https://backend-app-84du.onrender.com',  // La URL base de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para manejar las respuestas de error
const handleError = (error) => {
  if (error.response) {
    // Error con la respuesta de la API
    Alert.alert('Error', error.response.data.message || 'Algo salió mal');
  } else if (error.request) {
    // No se recibió respuesta
    Alert.alert('Error', 'No se pudo conectar con el servidor');
  } else {
    // Otro tipo de error
    Alert.alert('Error', error.message);
  }
  throw error;
};

// Función para registrar un nuevo usuario
const signUp = async (userData) => {
  try {
    const response = await api.post('/api/auth/sing-up', userData);
    return response.data;  // Retorna la información del usuario creado
  } catch (error) {
    handleError(error);  // Maneja el error
  }
};

// Función para iniciar sesión
const signIn = async (email, password) => {
  try {
    const response = await api.post('/api/auth/sing-in', { email, password });
    const token = response.headers['auth-token'];  // Obtiene el token del encabezado
    return { user: response.data, token };  // Retorna los datos del usuario y el token
  } catch (error) {
    handleError(error);  // Maneja el error
  }
};

export default {
  signUp,
  signIn,
};
