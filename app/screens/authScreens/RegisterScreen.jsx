import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import LanguageProvider from "../../lenguage/LanguageProvider";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import api from "../../utils/Api";
import GoogleButtonComponent from "../../components/login/GoogleButtonComponent";
import FacebookButtonComponent from "../../components/login/FacebookButtonComponent";
import UserDataComponent from "../../components/register/UserDataComponent";

const RegisterScreen = ({ navigation }) => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [tel, setTel] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    AssignLenguaje(setTextsLeng);
  }, []);

  const handleRegister = () => {
    navigation.navigate("");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Text style={styles.title}>{textsLeng.RegisterScreen.createAccount}</Text>

      <GoogleButtonComponent textsLeng={textsLeng} />

      <FacebookButtonComponent textsLeng={textsLeng} />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.divider} />
      </View>

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
        tel={tel}
        setTel={setTel}
        birthday={birthday}
        setBirthday={setBirthday}
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
