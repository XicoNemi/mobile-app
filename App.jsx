import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store/store";
import StackApp from "./app/navigation/StackApp";
import { logIn } from "./app/features/authSlice";
import { getValueFor } from "./app/utils/localStorage";
import LocalDatabase from "./app/utils/LocalDatabase";

function AppContent() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const verifyLogin = async () => {
    try {
      const tokenUser = await getValueFor("tokenUser");
      if (tokenUser) {
        try {
          const userData = JSON.parse(tokenUser);
          dispatch(logIn(userData));
        } catch (parseError) {
          console.warn("Datos de sesión corruptos, limpiando...");
          const { deleteValue } = await import("./app/utils/localStorage");
          await deleteValue("tokenUser");
        }
      }
    } catch (error) {
      console.error("Error al verificar el login:", error);
    }
  };

  useEffect(() => {
    LocalDatabase.initialize().then(() => verifyLogin());
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
