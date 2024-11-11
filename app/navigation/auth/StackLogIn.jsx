import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/authScreens/LoginScreen";
import RegisterScreen from "../../screens/authScreens/RegisterScreen";
import PasswordRecoveryScreen from "../../screens/authScreens/PasswordRecoveryScreen";

const Stack = createNativeStackNavigator();

const StackLogin = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        name="PasswordRecoveryScreen"
        component={PasswordRecoveryScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackLogin;
