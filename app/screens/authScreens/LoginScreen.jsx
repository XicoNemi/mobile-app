import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux"; // Importar useDispatch y useSelector
import { logIn } from "../../features/authSlice"; // Importar la acción logIn del slice de auth
import LanguageProvider from "../../lenguage/LanguageProvider";
import Colors from "../../utils/Colors";
import LanguageSwitcher from "../../lenguage/LanguageSwitcher";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import api from "../../utils/Api";
import LoaderComponent from "../../components/generals/LoaderComponent";
import EnterEmailComponent from "../../components/login/EnterEmailComponent";
import EnterPasswordComponent from "../../components/login/EnterPasswordComponent";
import GoogleButtonComponent from "../../components/login/GoogleButtonComponent";
import FacebookButtonComponent from "../../components/login/FacebookButtonComponent";
import CustomAlert from "../../components/generals/CustomAlertComponent"; // Importar el componente de alerta personalizada

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Estado para mostrar el modal de alerta
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDetails, setAlertDetails] = useState("");
  const [alertIcon, setAlertIcon] = useState("alert-circle-outline");

  useEffect(() => {
    AssignLenguaje(setTextsLeng);
    // Monitorear los cambios en authData
    console.log("Datos guardados en Redux:", authData);
  }, [authData]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setAlertTitle("Error");
      setAlertMessage("Por favor, complete todos los campos");
      setAlertIcon("close-circle-outline");
      setAlertVisible(true); // Mostrar alerta de error
      return;
    }
    setIsLoading(true);
    try {
      const { user, token } = await api.signIn(email, password);
      dispatch(logIn({ id: user.id, name: user.name, token })); // Guardar datos en Redux
      navigation.navigate("HomeScreen"); // Navegar a la pantalla principal después de guardar en Redux
    } catch (error) {
      // Mostrar el mensaje de error específico que vino desde el backend
      setAlertTitle("Error");
      setAlertMessage(error.message); // Mostrar el mensaje específico desde el backend
      setAlertIcon("close-circle-outline");
      setAlertVisible(true); // Mostrar alerta de error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <LoaderComponent
        isVisible={isLoading}
        text={textsLeng.LoginScreen.messageLog}
      />

      <View style={styles.languageSwitcher}>
        <LanguageSwitcher setTextsLeng={setTextsLeng} />
      </View>

      <Text style={styles.title}>{textsLeng.LoginScreen.title}</Text>

      <EnterEmailComponent
        value={email}
        setEmail={setEmail}
        textsLeng={textsLeng}
      />

      <EnterPasswordComponent
        value={password}
        setPassword={setPassword}
        textsLeng={textsLeng}
      />

      <Text style={styles.PasswordRecoveryScreen}>
        {" "}
        <Text
          style={styles.PasswordRecoveryScreenLink}
          onPress={() => navigation.navigate("PasswordRecoveryScreen")}
        >
          {textsLeng.LoginScreen.rememberMe}{" "}
        </Text>
      </Text>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>
          {textsLeng.LoginScreen.loginButton}
        </Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>ó</Text>
        <View style={styles.divider} />
      </View>

      <GoogleButtonComponent
        onPress={() => {
          /* lógica de Google aquí */
        }}
      />
      <FacebookButtonComponent
        onPress={() => {
          /* lógica de Facebook aquí */
        }}
      />

      <Text style={styles.registerText}>
        {textsLeng.LoginScreen.dontAccount}{" "}
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          {textsLeng.LoginScreen.signUp}
        </Text>
      </Text>

      <Text style={styles.footerText}>Powered By DreamTeam-UTXJ</Text>

      <CustomAlert
        isVisible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={alertTitle}
        message={alertMessage}
        details={alertDetails}
        iconName={alertIcon}
        onConfirm={() => setAlertVisible(false)}
        showCancelButton={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  title: {
    fontSize: SizeConstants.subtitles,
    color: Colors.primaryText,
    textAlign: "center",
    marginBottom: 100,
  },
  loginButton: {
    width: "90%",
    backgroundColor: Colors.primary,
    borderRadius: 22,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 10,
    width: "95%",
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "90%",
  },
  divider: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#D3D3D3",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "black",
  },
  registerText: {
    marginTop: 20,
    color: "black",
  },
  registerLink: {
    color: Colors.events,
  },
  PasswordRecoveryScreen: {
    marginTop: 15,
    color: "black",
  },
  PasswordRecoveryScreenLink: {
    color: Colors.events,
  },
  footerText: {
    position: "static",
    top: 100,
    color: "black",
  },
  languageSwitcher: {
    position: "static",
    bottom: 70,
    left: 120,
    zIndex: 1,
  },
});

export default LoginScreen;
