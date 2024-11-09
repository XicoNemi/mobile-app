import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store/store";
import StackUser from "./app/navigation/user/StackUsers";
import StackLogin from "./app/navigation/StackLogIn "; 

// Acciones y utilidades de autenticación
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

  // Verificación del token y logging
  const token = auth.token; // Asumiendo que el token está en el estado 'auth.token'
  
  if (token) {
    console.log("Siuu Ya hay token y es :",token);
  } else {
    console.log("No hay token Terrible");
  }

  return (
    <NavigationContainer>
      {auth.session ? <StackUser /> : <StackLogin />}
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
