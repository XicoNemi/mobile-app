import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import Colors from "../utils/Colors";
import SizeConstants from "../utils/SizeConstants";
import LanguageProvider from "../lenguage/LanguageProvider";
import AssignLenguaje from "../lenguage/AssignLenguage";
import { signUp } from "../utils/Api";
import GoogleButtonComponent from "../components/login/GoogleButtonComponent";
import FacebookButtonComponent from "../components/login/FacebookButtonComponent";
import UserDataComponent from "../components/register/UserDataComponent"; // Importa el componente

const RegisterScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);

  // Estados para los datos del usuario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    AssignLenguaje(setTextsLeng); 
  }, []);

  const handleRegister = () => {
    // Aquí iría la lógica para registrarse, como enviar los datos al servidor
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{textsLeng.RegisterScreen.createAccount}</Text>

      <GoogleButtonComponent textsLeng={textsLeng} />
      
      <FacebookButtonComponent textsLeng={textsLeng} />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

      {/* Componente de datos del usuario */}
      <UserDataComponent
        name={name}
        setName={setName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        repeatPassword={repeatPassword}
        setRepeatPassword={setRepeatPassword}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: SizeConstants.subtitles,
    color: Colors.primaryText,
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    width: "90%",
    color: Colors.primaryText,
    marginBottom: 5,
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
  registerButton: {
    width: "90%",
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 15,
    color: "black",
  },
  loginLink: {
    color: Colors.events,
  },
});

export default RegisterScreen;
