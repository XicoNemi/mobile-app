import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
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
    <>
      <StatusBar style="auto" backgroundColor="white" translucent />
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false, // Oculta el header en todas las pantallas
          animation: "simple_push", // Aplica la animación a todas las pantallas
        }}
      >
        {/* Pantallas principales */}
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
        />

        {/* Pantallas de itinerarios */}
        <Stack.Screen
          name="ItinerariesScreen"
          component={ItinerariesScreen}
        />
        <Stack.Screen
          name="ItineraryDetailScreen"
          component={ItineraryDetailScreen}
        />
        <Stack.Screen
          name="CreateItinerariesScreen"
          component={CreateItinerariesScreen}
        />

        {/* Pantallas de rutas */}
        <Stack.Screen
          name="RoutesScreen"
          component={RoutesScreen}
        />

        {/* Pantallas de alojamiento */}
        <Stack.Screen
          name="AccommodationScreen"
          component={AccommodationScreen}
        />

        {/* Pantallas de gastronomía */}
        <Stack.Screen
          name="GastronomyScreen"
          component={GastronomyScreen}
        />

        {/* Pantallas de eventos */}
        <Stack.Screen
          name="EventsScreen"
          component={EventsScreen}
        />

        {/* Pantallas de turismo */}
        <Stack.Screen
          name="TourismScreen"
          component={TourismScreen}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackUser;