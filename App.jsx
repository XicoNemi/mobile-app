import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackUser from './app/navigation/StackUsers';

export default function App() {
    return (
        <NavigationContainer>
            <StackUser />
        </NavigationContainer>
    );
}
