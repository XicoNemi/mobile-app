import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import LanguageProvider from "../lenguage/LanguageProvider";
import Colors from "../utils/Colors";
import LanguageSwitcher from "../lenguage/LanguageSwitcher";
import SizeConstants from "../utils/SizeConstants";
import AssignLenguaje from "../lenguage/AssignLenguage";
import api from "../utils/Api"; 
import LoaderComponent from "../components/LoaderComponent"; 

const LoginScreen = ({ navigation }) => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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
      <LoaderComponent isVisible={isLoading} text={textsLeng.LoginScreen.messageLog} />

      <View style={styles.languageSwitcher}>
        <LanguageSwitcher setTextsLeng={setTextsLeng} />
      </View>

      <Text style={styles.title}>{textsLeng.LoginScreen.title}</Text>

      <Text style={styles.label}>{textsLeng.LoginScreen.email}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#AAAAAA"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>{textsLeng.LoginScreen.password}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholderTextColor="#AAAAAA"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
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

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>
          {textsLeng.LoginScreen.rememberMe}
        </Text>
      </TouchableOpacity>

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

      <TouchableOpacity style={styles.googleButton}>
        <Ionicons
          name="logo-google"
          size={SizeConstants.iconsCH}
          color="white"
        />
        <Text style={styles.socialButtonText}>
          {textsLeng.LoginScreen.signGoogle}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facebookButton}>
        <Ionicons
          name="logo-facebook"
          size={SizeConstants.iconsCH}
          color="white"
        />
        <Text style={styles.socialButtonText}>
          {textsLeng.LoginScreen.signFacebook}
        </Text>
      </TouchableOpacity>

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
    marginBottom: 100,
  },
  title: {
    fontSize: SizeConstants.subtitles,
    color: Colors.primaryText,
    textAlign: "center",
    marginBottom: 50,
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
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: SizeConstants.texts,
  },
  forgotPasswordText: {
    color: Colors.events,
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 10,
    marginTop: 15,
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
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderRadius: 22,
    marginBottom: 10,
    width: "95%",
    height: 50,
  },
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 93,
    borderRadius: 22,
    width: "95%",
    height: 50,
  },
  socialButtonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    marginLeft: 10,
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
    top: 170,
    color: "black",
  },
  languageSwitcher: {
    position: "static",
    bottom: 30,
    left: 120,
    zIndex: 1,
  },
});

export default LoginScreen;
