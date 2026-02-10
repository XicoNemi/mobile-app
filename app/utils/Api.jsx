import axios from 'axios';
import * as Crypto from 'expo-crypto';
import LocalDatabase from './LocalDatabase';
import { getLocalBusinesses, getLocalReviews } from '../data/LocalBusinesses';

const api = axios.create({
  baseURL: 'https://available-karlotta-ethdev11-59ebf81c.koyeb.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para manejar las respuestas de error
const handleError = (error) => {
  if (error.response) {
    return {
      message: error.response.data.message || 'Algo salió mal',
      status: error.response.status || 500,
    };
  } else if (error.request) {
    return {
      message: 'No se pudo conectar con el servidor',
      status: 503,
    };
  } else {
    return {
      message: error.message || 'Error desconocido',
      status: 500,
    };
  }
};

// Función para registrar un nuevo usuario (local)
const signUp = async (userData) => {
  try {
    const newUser = await LocalDatabase.addUser(userData);
    const { password, ...userWithoutPassword } = newUser;
    return { message: 'Cuenta creada con éxito', user: userWithoutPassword };
  } catch (error) {
    const customError = new Error(error.message);
    customError.status = 400;
    throw customError;
  }
};

// Función para iniciar sesión (local)
const signIn = async (email, password) => {
  try {
    const user = await LocalDatabase.findUserByEmail(email);
    if (!user) {
      const err = new Error('Credenciales incorrectas');
      err.status = 401;
      throw err;
    }
    const hashedPassword = await LocalDatabase.hashPassword(password);
    if (hashedPassword !== user.password) {
      const err = new Error('Credenciales incorrectas');
      err.status = 401;
      throw err;
    }
    const token = Crypto.randomUUID();
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  } catch (error) {
    if (error.status) throw error;
    const customError = new Error(error.message || 'Error desconocido');
    customError.status = 500;
    throw customError;
  }
};

// Función para obtener un usuario por ID (local)
const getUser = async (id, token) => {
  try {
    const user = await LocalDatabase.getUserById(id);
    if (!user) {
      const err = new Error('Usuario no encontrado');
      err.status = 404;
      throw err;
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    if (error.status) throw error;
    const customError = new Error(error.message || 'Error desconocido');
    customError.status = 500;
    throw customError;
  }
};

// Función para obtener la lista de negocios públicos
const getPublicBusinesses = async (category) => {
  // Primero intentar datos locales
  const localData = getLocalBusinesses(category);
  if (localData.length > 0) {
    return localData;
  }
  // Si no hay datos locales, intentar el servidor remoto
  try {
    const url = category ? `/api/businesses/public?category=${category}` : '/api/businesses/public';
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    const { message, status } = handleError(error);
    const customError = new Error(message);
    customError.status = status;
    throw customError;
  }
};

// Función para obtener eventos por negocio (no requiere token)
const getEventsByBusiness = async (businessId) => {
  try {
    const response = await api.get(`/api/events/business/${businessId}`);
    return response.data; // Retorna la lista de eventos
  } catch (error) {
    const { message, status } = handleError(error);
    const customError = new Error(message);
    customError.status = status;
    throw customError;
  }
};

// Función para obtener reseñas por negocio
const getReviewsByBusiness = async (businessId) => {
  // Primero intentar reseñas locales
  const localReviews = getLocalReviews(businessId);
  if (localReviews.length > 0) {
    return localReviews;
  }
  // Si no hay reseñas locales, intentar el servidor remoto
  try {
    const response = await api.get(`/api/reviews/business/${businessId}`);
    return response.data;
  } catch (error) {
    const { message, status } = handleError(error);
    const customError = new Error(message);
    customError.status = status;
    throw customError;
  }
};

export default {
  signUp,
  signIn,
  getUser,
  getPublicBusinesses, 
  getEventsByBusiness,
  getReviewsByBusiness,
};
