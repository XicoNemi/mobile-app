import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // Agregar otros reducers si es necesario
    },
});
