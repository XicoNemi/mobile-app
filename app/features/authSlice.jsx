import { createSlice } from '@reduxjs/toolkit';
import { saveValue, deleteValue } from '../utils/localStorage';

// Estado inicial para autenticación
const initState = {
    id: null,
    type: null,
    session: false,
    token: null,
    name: "",
};

// Slice de autenticación
export const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    logIn: (state, action) => {
      // Actualiza el estado con los valores pasados
      const newState = { ...state, ...action.payload, session: true };
      saveValue("token", newState.token); // Guarda el token en el almacenamiento seguro
      return newState;
    },
    logOut: () => {
      deleteValue("token"); // Elimina el token del almacenamiento seguro
      return initState; // Restaura el estado inicial
    },
  },
});

// Exportar las acciones
export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
