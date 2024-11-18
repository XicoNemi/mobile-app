import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import ItinerariesScreen from "../../screens/itineraries/ItinerariesScreen";
import RoutesScreen from "../../screens/RoutesScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import ItineraryDetailScreen from "../../screens/itineraries/ItineraryDetailScreen";
import AccommodationScreen from "../../screens/AccommodationScreen";
import GastronomyScreen from "../../screens/GastronomyScreen";
import EventsScreen from "../../screens/EventsScreen";
import TourismScreen from "../../screens/TourismScreen";
import CreateItinerariesScreen from "../../screens/itineraries/CreateItinerariesScreen";

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
      <Stack.Screen
        name="AccommodationScreen"
        component={AccommodationScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        name="GastronomyScreen"
        component={GastronomyScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        name="TourismScreen"
        component={TourismScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
      <Stack.Screen
        name="CreateItinerariesScreen"
        component={CreateItinerariesScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackUser;