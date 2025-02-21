import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import HomeScreen from "../screens/dashbordScreens/HomeScreen";
import ItinerariesScreen from "../screens/dashbordScreens/itineraries/ItinerariesScreen";
import RoutesScreen from "../screens/dashbordScreens/routes/RoutesScreen";
import ProfileScreen from "../screens/dashbordScreens/profile/ProfileScreen";
import ItineraryDetailScreen from "../screens/dashbordScreens/itineraries/ItineraryDetailScreen";
import AccommodationScreen from "../screens/dashbordScreens/accomodation/AccommodationScreen";
import GastronomyScreen from "../screens/dashbordScreens/gastronomy/GastronomyScreen";
import EventsScreen from "../screens/dashbordScreens/events/EventsScreen";
import TourismScreen from "../screens/dashbordScreens/tourism/TourismScreen";
import CreateItinerariesScreen from "../screens/dashbordScreens/itineraries/CreateItinerariesScreen";
import LoginScreen from "../screens/authScreens/LoginScreen";
import RegisterScreen from "../screens/authScreens/RegisterScreen";
import PasswordRecoveryScreen from "../screens/authScreens/PasswordRecoveryScreen";

const Stack = createNativeStackNavigator();

const StackApp = () => {
    return (
        <>
            <StatusBar style="auto" backgroundColor="white" translucent />
            <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{
                    headerShown: false,
                    animation: "simple_push",
                }}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="ItinerariesScreen" component={ItinerariesScreen} />
                <Stack.Screen name="ItineraryDetailScreen" component={ItineraryDetailScreen} />
                <Stack.Screen name="CreateItinerariesScreen" component={CreateItinerariesScreen} />
                <Stack.Screen name="RoutesScreen" component={RoutesScreen} />
                <Stack.Screen name="AccommodationScreen" component={AccommodationScreen} />
                <Stack.Screen name="GastronomyScreen" component={GastronomyScreen} />
                <Stack.Screen name="EventsScreen" component={EventsScreen} />
                <Stack.Screen name="TourismScreen" component={TourismScreen} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="PasswordRecoveryScreen" component={PasswordRecoveryScreen} />
            </Stack.Navigator>
        </>
    );
};

export default StackApp;
