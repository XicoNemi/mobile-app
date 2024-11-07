import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen.jsx";
import HomeScreen from "../screens/HomeScreen.jsx";
import ItinerariesScreen from "../screens/ItinerariesScreen.jsx";
import RoutesScreen from "../screens/RoutesScreen.jsx";
import ProfileScreen from "../screens/ProfileScreen.jsx";
import RegisterScreen from "../screens/RegisterScreen.jsx";

const Stack = createNativeStackNavigator();

const StackUser = () => {
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
        name="ItinerariesScreen"
        component={ItinerariesScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />

      <Stack.Screen
        name="RoutesScreen"
        component={RoutesScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
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
    </Stack.Navigator>
  );
};

export default StackUser;
