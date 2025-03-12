import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/dashbordScreens/HomeScreen';
import ProfileScreen from '../screens/dashbordScreens/profile/ProfileScreen';
import FavoritesScreen from '../screens/dashbordScreens/FavoritesScreen';
import { Text, Platform } from 'react-native';
import Colors from '../utils/Colors';
import { useSelector } from 'react-redux';
import CustomAlertComponent from '../components/generals/CustomAlertComponent';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    const userName = useSelector((state) => state.auth.name);
    const textsLeng = useSelector((state) => state.language.texts);
    const [alertVisible, setAlertVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <>
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
                        return <Text style={{ color, fontSize: 12, marginBottom: 5 }}>{label}</Text>;
                    },
                    tabBarStyle: {
                        backgroundColor: 'white',
                        borderTopWidth: 1,
                        borderTopColor: '#ddd',
                        height: 65,
                        paddingBottom: Platform.OS === 'ios' ? 20 : 10, 
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                    },
                    tabBarActiveTintColor: Colors.primary,
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
                screenListeners={({ route }) => ({
                    tabPress: (e) => {
                        if (route.name === 'Profile' && !userName) {
                            e.preventDefault();
                            setAlertVisible(true);
                        }
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="Favorites" component={FavoritesScreen} />
            </Tab.Navigator>
            
            <CustomAlertComponent
                isVisible={alertVisible}
                onClose={() => setAlertVisible(false)}
                title={textsLeng.CustomAlertComponent.accessRequired}
                message={textsLeng.CustomAlertComponent.accessMessage}
                primaryButton={{
                    text: textsLeng.CustomAlertComponent.loginButton,
                    onPress: () => {
                        setAlertVisible(false);
                        navigation.navigate("LoginScreen");
                    },
                }}
                secondaryButton={{
                    text: textsLeng.CustomAlertComponent.cancelButton,
                    onPress: () => setAlertVisible(false),
                }}
            />
        </>
    );
};

export default BottomTabNavigator;
