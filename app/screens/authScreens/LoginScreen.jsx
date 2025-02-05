import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../features/authSlice";
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
import CustomAlert from "../../components/generals/CustomAlertComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const authData = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertDetails, setAlertDetails] = useState("");
  const [alertIcon, setAlertIcon] = useState("alert-circle-outline");

  useEffect(() => {
    AssignLenguaje(dispatch);
    console.log("Datos guardados en Redux:", authData);
  }, [authData, dispatch]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setAlertTitle("Error");
      setAlertMessage("Por favor, complete todos los campos");
      setAlertIcon("close-circle-outline");
      setAlertVisible(true);
      return;
    }
    setIsLoading(true);
    try {
      const { user, token } = await api.signIn(email, password);
      dispatch(logIn({ id: user.id, name: user.name, token }));
      navigation.navigate("HomeScreen");
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage(error.message);
      setAlertIcon("close-circle-outline");
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <LoaderComponent
        isVisible={isLoading}
        text={textsLeng.LoginScreen.messageLog}
      />

      <View style={styles.languageSwitcher}>
        <LanguageSwitcher />
      </View>

      <Text style={styles.title}>{textsLeng.LoginScreen.title}</Text>

      <EnterEmailComponent
        email={email}
        setEmail={setEmail}
        textsLeng={textsLeng}
      />

      <EnterPasswordComponent
        password={password}
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
    paddingHorizontal: wp('5%'),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('1%'),
  },
  title: {
    fontSize: SizeConstants.subtitles,
    color: Colors.primaryText,
    textAlign: "center",
    marginBottom: hp('11%'),
    fontWeight: "bold"
  },
  loginButton: {
    width: "90%",
    backgroundColor: Colors.primary,
    borderRadius: wp('5.5%'),
    paddingVertical: hp('1.875%'),
    alignItems: "center",
    marginVertical: hp('1.25%'),
    width: "95%",
    height: hp('6.25%'),
    marginTop: hp('2.5%'),
  },
  buttonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp('2.5%'),
    width: "90%",
  },
  divider: {
    flex: 1,
    height: hp('0.1875%'),
    backgroundColor: "#D3D3D3",
  },
  dividerText: {
    marginHorizontal: wp('2.5%'),
    color: "black",
  },
  registerText: {
    marginTop: hp('2.5%'),
    color: "black",
    fontWeight: "bold"
  },
  registerLink: {
    color: Colors.events,
  },
  PasswordRecoveryScreen: {
    marginTop: hp('1.875%'),
    color: "black",
  },
  PasswordRecoveryScreenLink: {
    color: Colors.events,
    fontWeight: "bold"
  },
  footerText: {
    position: "absolute",
    bottom: hp('4%'), 
    color: "black",
    fontSize: SizeConstants.texts - 3,
  },
  languageSwitcher: {
    position: "absolute",
    top: hp('5.2%'), 
    right: wp('5%'),
    zIndex: 1,
  },
});

export default LoginScreen;
