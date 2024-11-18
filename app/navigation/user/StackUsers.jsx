import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import ItinerariesScreen from "../../screens/itineraries/ItinerariesScreen";
import RoutesScreen from "../../screens/RoutesScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import ItineraryDetailScreen from "../../screens/itineraries/ItineraryDetailScreen";
const Stack = createNativeStackNavigator();

const StackUser = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
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
        name="ItineraryDetailScreen"
        component={ItineraryDetailScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackUser;
