import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import LanguageProvider from "../../lenguage/LanguageProvider";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import api from "../../utils/Api";
import GoogleButtonComponent from "../../components/login/GoogleButtonComponent";
import FacebookButtonComponent from "../../components/login/FacebookButtonComponent";
import NameComponent from "../../components/register/NameComponent";
import EnterEmailComponent from "../../components/login/EnterEmailComponent";
import EnterPasswordComponent from "../../components/login/EnterPasswordComponent";
import PhoneAndBirthdayComponent from "../../components/register/PhoneAndBirthdayComponent";
import LoaderComponent from "../../components/generals/LoaderComponent";
import CustomAlert from "../../components/generals/CustomAlertComponent";

const RegisterScreen = ({ navigation }) => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);

  // Estados para los datos del usuario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [birthday, setBirthday] = useState("");
  // Estado para mostrar el loader
  const [isLoading, setIsLoading] = useState(false);
  // Estado para mostrar el mensaje de alerta de éxito o error
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertIcon, setAlertIcon] = useState("checkmark-circle-outline");

  useEffect(() => {
    AssignLenguaje(setTextsLeng);
  }, []);

  const handleRegister = async () => {
    // Validaciones de los campos
    if (!name || !lastName || !email || !password || !tel || !birthday) {
      setAlertTitle("Error");
      setAlertMessage("Por favor, complete todos los campos");
      setAlertIcon("close-circle-outline");
      setAlertVisible(true); // Mostrar alerta de error
      return;
    }
  
    setIsLoading(true); // Activamos el loader
    try {
      // Preparar los datos para el registro
      const userData = { name, lastname: lastName, email, password, tel, birthday };
  
      // Llamada al API para crear la cuenta
      const response = await api.signUp(userData);
  
      // Verificar si la respuesta contiene un mensaje de error
      if (response.message && response.message.includes("El correo ya existe")) {
        // Si hay error (correo ya existe)
        throw new Error(response.message); // Lanzar un error explícito para manejarlo en el catch
      }
  
      // Si la cuenta fue creada correctamente
      setAlertTitle("Éxito");
      setAlertMessage(response.message || "Cuenta creada con éxito. Revisa tu correo para verificar la cuenta.");
      setAlertIcon("checkmark-circle-outline");
      setAlertVisible(true);
    } catch (error) {
      // Manejo de errores
      const errorMessage = error.response ? error.response.data.message : error.message;
  
      setAlertTitle("Error"); // Aquí aseguramos que el título es "Error"
      setAlertMessage(errorMessage || "Algo salió mal, por favor intenta nuevamente.");
      setAlertIcon("close-circle-outline"); // Icono de error
      setAlertVisible(true);
    } finally {
      setIsLoading(false); // Desactivar el loader
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <LoaderComponent
        isVisible={isLoading}
        text="Creando cuenta..."
      />

      <Text style={styles.title}>{textsLeng.RegisterScreen.createAccount}</Text>

      <GoogleButtonComponent textsLeng={textsLeng} />

      <FacebookButtonComponent textsLeng={textsLeng} />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>ó</Text>
        <View style={styles.divider} />
      </View>

      <NameComponent
        name={name}
        setName={setName}
        lastName={lastName}
        setLastName={setLastName}
      />

      <EnterEmailComponent
        value={email}
        setEmail={setEmail}
        textsLeng={textsLeng}
      />

      <PhoneAndBirthdayComponent
        tel={tel}
        setTel={setTel}
        birthday={birthday}
        setBirthday={setBirthday}
      />

      <EnterPasswordComponent
        value={password}
        setPassword={setPassword}
        textsLeng={textsLeng}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>
          {textsLeng.RegisterScreen.register}
        </Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        {textsLeng.RegisterScreen.alreadyAccount}{" "}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          {textsLeng.LoginScreen.loginButton}
        </Text>
      </Text>

      <CustomAlert
        isVisible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={alertTitle}
        message={alertMessage}
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
    marginBottom: 30,
  },
  registerButton: {
    width: "90%",
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 5,
    color: "black",
  },
  loginLink: {
    color: Colors.events,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "90%",
    marginBottom: 10,
    marginTop: 5,
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
});

export default RegisterScreen;
