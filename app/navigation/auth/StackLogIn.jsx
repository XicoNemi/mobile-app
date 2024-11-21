import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import LoginScreen from "../../screens/authScreens/LoginScreen";
import RegisterScreen from "../../screens/authScreens/RegisterScreen";
import PasswordRecoveryScreen from "../../screens/authScreens/PasswordRecoveryScreen";

const Stack = createNativeStackNavigator();

const StackLogin = () => {
  return (
    <>
      <StatusBar style="auto" backgroundColor="transparent" translucent />
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false, // Oculta el header en todas las pantallas
          animation: "simple_push", // Aplica la animación a todas las pantallas
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="PasswordRecoveryScreen"
          component={PasswordRecoveryScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackLogin;