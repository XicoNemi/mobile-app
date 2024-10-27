import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen.jsx"; // Verifica la ruta
import HomeScreen from "../screens/HomeScreen.jsx"; // Verifica la ruta

const Stack = createNativeStackNavigator();

const StackUser = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    animation: "slide_from_right",
                }}
            />
        </Stack.Navigator>
    );
};

export default StackUser;
