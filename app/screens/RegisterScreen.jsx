import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../utils/Colors";
import SizeConstants from "../utils/SizeConstants";
import LanguageProvider from "../lenguage/LanguageProvider";
import AssignLenguaje from "../lenguage/AssignLenguage";
import {signUp} from "../utils/Api"

const RegisterScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);

  useEffect(() => {
    AssignLenguaje(setTextsLeng); // Cargar el idioma
  }, []);

  const handleRegister = () => {
    // Aquí iría la lógica para registrarse, como enviar los datos al servidor
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{textsLeng.RegisterScreen.createAccount}</Text>

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons
          name="logo-google"
          size={SizeConstants.iconsCH}
          color="white"
        />
        <Text style={styles.socialButtonText}>
          {textsLeng.LoginScreen.signGoogle}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Ionicons
          name="logo-facebook"
          size={SizeConstants.iconsCH}
          color="white"
        />
        <Text style={styles.socialButtonText}>
          {textsLeng.LoginScreen.signFacebook}
        </Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>ó</Text>
        <View style={styles.divider} />
      </View>

      <Text style={styles.label}>{textsLeng.RegisterScreen.name}</Text>
      <TextInput style={styles.input} placeholderTextColor="#AAAAAA" />

      <Text style={styles.label}>{textsLeng.RegisterScreen.lastName}</Text>
      <TextInput style={styles.input} placeholderTextColor="#AAAAAA" />

      <Text style={styles.label}>{textsLeng.LoginScreen.email}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#AAAAAA"
        keyboardType="email-address"
      />

      <Text style={styles.label}>{textsLeng.LoginScreen.password}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholderTextColor="#AAAAAA"
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>

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
    marginBottom: 30,
  },
  label: {
    width: "90%",
    color: Colors.primaryText,
    marginBottom: 5,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: SizeConstants.texts,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 85,
    borderRadius: 22,
    marginBottom: 10,
    width: "95%",
    height: 50,
  },
  socialButtonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    marginLeft: 10,
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
    marginTop: 20,
    color: "black",
  },
  loginLink: {
    color: Colors.events,
  },
  footerText: {
    position: "static",
    top: 90,
    color: "black",
  },
});

export default RegisterScreen;
