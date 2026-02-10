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
      const newState = { ...state, ...action.payload, session: true };
      // Guarda los datos completos del usuario en almacenamiento seguro
      saveValue("tokenUser", JSON.stringify({
        id: newState.id,
        name: newState.name,
        token: newState.token,
        type: newState.type,
      }));
      return newState;
    },
    logOut: () => {
      deleteValue("tokenUser");
      return initState;
    },
  },
});

// Exportar las acciones
export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
