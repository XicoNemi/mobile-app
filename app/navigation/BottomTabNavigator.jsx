import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/dashbordScreens/HomeScreen';
import ProfileScreen from '../screens/dashbordScreens/profile/ProfileScreen';
import FavoritesScreen from '../screens/dashbordScreens/FavoritesScreen';
import { Text } from 'react-native';
import Colors from '../utils/Colors';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Favorites') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarLabel: ({ focused, color }) => {
                    let label;
                    if (route.name === 'Home') {
                        label = 'Home';
                    } else if (route.name === 'Profile') {
                        label = 'Profile';
                    } else if (route.name === 'Favorites') {
                        label = 'Favorites';
                    }
                    return <Text style={{ color }}>{label}</Text>;
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;
