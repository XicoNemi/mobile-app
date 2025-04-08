import { createSlice } from '@reduxjs/toolkit';
import { saveValue, deleteValue } from '../utils/localStorage';

// Estado inicial para el token de Expo
const initState = {
  token: null,
};

// Slice de expoToken
export const expoTokenSlice = createSlice({
  name: 'expoToken',
  initialState: initState,
  reducers: {
    setExpoToken: (state, action) => {
      state.token = action.payload; // Guardar el token en el estado
      saveValue('expoToken', action.payload); // Guardar el token en el almacenamiento local
    },
    clearExpoToken: () => {
      deleteValue('expoToken'); // Eliminar el token del almacenamiento local
      return initState; // Restaurar el estado inicial
    },
  },
});

// Exportar las acciones
export const { setExpoToken, clearExpoToken } = expoTokenSlice.actions;
export default expoTokenSlice.reducer;