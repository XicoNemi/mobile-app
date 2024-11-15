import axios from 'axios';

const api = axios.create({
  baseURL: 'http://5.183.9.47:11111',  // La URL base del backend
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
      status: error.response.status || 500,  // Agregar el código de estado del error
    };
  } else if (error.request) {
    // No se recibió respuesta, retornamos un mensaje de error genérico
    return {
      message: 'No se pudo conectar con el servidor',
      status: 503,  // Error de servicio no disponible
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

    // Accediendo a los mensajes de la respuesta si la creación es exitosa
    console.log(response.data);  // Si todo es correcto, mostrar la data (usuario creado)
    return response.data;  // Retorna la información del usuario creado
  } catch (error) {
    const { message, status } = handleError(error);  // Captura el mensaje de error
    const customError = new Error(message);
    customError.status = status;  // Agrega el código de estado al error
    throw customError;  // Lanza un nuevo error con el mensaje y el estado
  }
};

// Función para iniciar sesión
const signIn = async (email, password) => {
  try {
    const response = await api.post('/api/auth/sign-in', { email, password });
    const token = response.headers['auth-token'];  // Obtiene el token del encabezado
    return { user: response.data, token };  // Retorna los datos del usuario y el token
  } catch (error) {
    const { message, status } = handleError(error);  // Captura el mensaje de error
    const customError = new Error(message);
    customError.status = status;  // Agrega el código de estado al error
    throw customError;  // Lanza un nuevo error con el mensaje y el estado
  }
};

export default {
  signUp,
  signIn,
};
