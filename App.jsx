import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store/store";
import StackApp from "./app/navigation/StackApp";
import { logIn } from "./app/features/authSlice";
import { setExpoToken } from "./app/features/expoTokenSlice"; // Importar la acción para guardar el token
import * as Notifications from "expo-notifications";
import Api from "./app/utils/Api"; // Importar la función para guardar el token en la API
import { getValueFor } from "./app/utils/localStorage";

function AppContent() {
  const dispatch = useDispatch();
  const expoToken = useSelector((state) => state.expoToken.token); // Obtener el token del estado global

  const verifyLogin = async () => {
    try {
      const tokenUser = await getValueFor("tokenUser");
      if (tokenUser) {
        const userData = JSON.parse(tokenUser);
        dispatch(logIn(userData));
      }
    } catch (error) {
      console.error("Error al verificar el login:", error);
    }
  };

  const requestNotificationPermission = async () => {
    if (!expoToken) { // Verificar si ya existe un token
      Alert.alert(
        "Permiso de notificaciones",
        "Esta aplicación necesita permisos para enviarte notificaciones importantes. ¿Deseas continuar?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Aceptar",
            onPress: async () => {
              try {
                const { status } = await Notifications.requestPermissionsAsync();
                if (status === "granted") {
                  const token = await Notifications.getExpoPushTokenAsync({
                    projectId: "6165499c-5e75-415f-845e-f074f96aeefc",
                  });
                  console.log("🎉 Token de Expo Push generado correctamente:", token.data);
                  dispatch(setExpoToken(token.data)); // Guardar el token en el estado global
                  const result = await Api.saveExpoToken(token.data); // Guardar el token en la API
                  console.log("✅ Token guardado en la API:", result);
                  Api.saveExpoToken(token.data); // Guardar el token en el almacenamiento local
                } else {
                  console.error("🚨 Permisos de notificación no otorgados");
                }
              } catch (error) {
                console.error("⚠️ Error al obtener el token de notificación", error);
              }
            },
          },
        ]
      );
    } else {
      console.log("✅ Token de Expo ya existe:", expoToken);
    }
  };

  useEffect(() => {
    verifyLogin();
    requestNotificationPermission();
  }, []);

  return (
    <NavigationContainer>
      <StackApp />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}