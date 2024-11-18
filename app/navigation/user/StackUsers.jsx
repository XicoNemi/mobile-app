import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/dashbord/HomeScreen";
import ItinerariesScreen from "../../screens/itineraries/ItinerariesScreen";
import RoutesScreen from "../../screens/routes/RoutesScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import ItineraryDetailScreen from "../../screens/itineraries/ItineraryDetailScreen";
import AccommodationScreen from "../../screens/accomodation/AccommodationScreen";
import GastronomyScreen from "../../screens/GastronomyScreen";
import EventsScreen from "../../screens/events/EventsScreen";
import TourismScreen from "../../screens/tourism/TourismScreen";
import CreateItinerariesScreen from "../../screens/itineraries/CreateItinerariesScreen";

const Stack = createNativeStackNavigator();

const StackUser = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      {/* Pantallas principales */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
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

      {/* Pantallas de itinerarios */}
      <Stack.Screen
        name="ItinerariesScreen"
        component={ItinerariesScreen}
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
        name="CreateItinerariesScreen"
        component={CreateItinerariesScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />

      {/* Pantallas de rutas */}
      <Stack.Screen
        name="RoutesScreen"
        component={RoutesScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />

      {/* Pantallas de alojamiento */}
      <Stack.Screen
        name="AccommodationScreen"
        component={AccommodationScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />

      {/* Pantallas de gastronomía */}
      <Stack.Screen
        name="GastronomyScreen"
        component={GastronomyScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />

      {/* Pantallas de eventos */}
      <Stack.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />

      {/* Pantallas de turismo */}
      <Stack.Screen
        name="TourismScreen"
        component={TourismScreen}
        options={{
          headerShown: false,
          animation: "simple_push",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackUser;