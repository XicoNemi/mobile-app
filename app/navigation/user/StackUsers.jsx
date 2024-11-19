import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/dashbordScreens/HomeScreen";
import ItinerariesScreen from "../../screens/dashbordScreens/itineraries/ItinerariesScreen";
import RoutesScreen from "../../screens/dashbordScreens/routes/RoutesScreen";
import ProfileScreen from "../../screens/dashbordScreens/profile/ProfileScreen";
import ItineraryDetailScreen from "../../screens/dashbordScreens/itineraries/ItineraryDetailScreen";
import AccommodationScreen from "../../screens/dashbordScreens/accomodation/AccommodationScreen";
import GastronomyScreen from "../../screens/dashbordScreens/gastronomy/GastronomyScreen";
import EventsScreen from "../../screens/dashbordScreens/events/EventsScreen";
import TourismScreen from "../../screens/dashbordScreens/tourism/TourismScreen";
import CreateItinerariesScreen from "../../screens/dashbordScreens/itineraries/CreateItinerariesScreen";

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