import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackUser from './app/navigation/StackUsers'; // Asegúrate de que esta ruta sea correcta

export default function App() {
    return (
        <NavigationContainer>
            <StackUser />
        </NavigationContainer>
    );
}
