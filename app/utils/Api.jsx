import axios from 'axios';

const api = axios.create({
  baseURL: 'https://available-karlotta-ethdev11-59ebf81c.koyeb.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para manejar las respuestas de error
const handleError = (error) => {
  if (error.response) {
    // Error con la respuesta de la API, devolvemos el mensaje de error específico
    return {
      message: error.response.data.message || 'Algo salió mal',
      status: error.response.status || 500, // Código de estado del error
    };
  } else if (error.request) {
    // No se recibió respuesta, retornamos un mensaje de error genérico
    return {
      message: 'No se pudo conectar con el servidor',
      status: 503, // Error de servicio no disponible
    };
  } else {
    // Otro tipo de error, retornamos el mensaje del error
    return {
      message: error.message || 'Error desconocido',
      status: 500,
    };
  }
};

// Función para registrar un nuevo usuario
const signUp = async (userData) => {
  try {
    const response = await api.post('/api/auth/sign-up', userData);
    console.log(response.data); // Si todo es correcto, mostrar la data (usuario creado) con fines de depuracion por el momento
    return response.data; 
  } catch (error) {
    const { message, status } = handleError(error);
    const customError = new Error(message);
    customError.status = status;
    throw customError;
  }
};

// Función para iniciar sesión
const signIn = async (email, password) => {
  try {
    const response = await api.post('/api/auth/sign-in-common', { email, password });
    const { user, token } = response.data;
    return { user, token }; 
  } catch (error) {
    const { message, status } = handleError(error);
    const customError = new Error(message);
    customError.status = status;
    throw customError;
  }
};

// Función para obtener un usuario por ID (requiere token)
const getUser = async (id, token) => {
  try {
    const response = await api.get(`/api/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    const { message, status } = handleError(error);
    const customError = new Error(message);
    customError.status = status;
    throw customError;
  }
};

// Función para obtener la lista de negocios públicos (no requiere token)
const getPublicBusinesses = async (category) => {
  try {
    const response = await api.get(`/api/businesses/public?category=${category}`);
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

export default {
  signUp,
  signIn,
  getUser,
  getPublicBusinesses, 
  getEventsByBusiness,
};
