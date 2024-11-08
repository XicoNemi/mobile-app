import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import LanguageProvider from "../lenguage/LanguageProvider";
import Colors from "../utils/Colors";
import LanguageSwitcher from "../lenguage/LanguageSwitcher";
import SizeConstants from "../utils/SizeConstants";
import AssignLenguaje from "../lenguage/AssignLenguage";
import api from "../utils/Api";
import LoaderComponent from "../components/generals/LoaderComponent";
import EnterEmailComponent from "../components/login/EnterEmailComponent";
import EnterPasswordComponent from "../components/login/EnterPasswordComponent";
import GoogleButtonComponent from "../components/login/GoogleButtonComponent";
import FacebookButtonComponent from "../components/login/FacebookButtonComponent";

const LoginScreen = ({ navigation }) => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AssignLenguaje(setTextsLeng);
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const { user, token } = await api.signIn(email, password);
      Alert.alert("Login exitoso", `Bienvenido ${user.name}`);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
    marginBottom: 50,
  },
  title: {
    fontSize: SizeConstants.subtitles,
    color: Colors.primaryText,
    textAlign: "center",
    marginBottom: 50,
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
  footerText: {
    position: "static",
    top: 150,
    color: "black",
  },
  languageSwitcher: {
    position: "static",
    bottom: 65,
    left: 120,
    zIndex: 1,
  },
});

export default LoginScreen;
