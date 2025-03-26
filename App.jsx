import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store/store";
import StackApp from "./app/navigation/StackApp";
import { logIn } from "./app/features/authSlice";
import { getValueFor } from "./app/utils/localStorage";

function AppContent() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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

  useEffect(() => {
    verifyLogin();
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
