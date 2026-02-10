import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import api from "../../utils/Api";
import GoogleButtonComponent from "../../components/login/GoogleButtonComponent";
import FacebookButtonComponent from "../../components/login/FacebookButtonComponent";
import NameGenderComponent from "../../components/register/NameGenderComponent";
import EnterEmailComponent from "../../components/login/EnterEmailComponent";
import EnterPasswordComponent from "../../components/login/EnterPasswordComponent";
import PhoneAndBirthdayComponent from "../../components/register/PhoneAndBirthdayComponent";
import LoaderComponent from "../../components/generals/LoaderComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);

  // Estados para los datos del usuario
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [birthday, setBirthday] = useState("");
  // Estado para mostrar el loader
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  const handleRegister = async () => {
    if (!name || !lastName || !gender || !email || !password || !tel || !birthday) {
      Alert.alert("Error", "Por favor, complete todos los campos");
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        name,
        lastname: lastName,
        gender,
        email,
        password,
        tel,
        birthday,
        type: "Common"
      };
      console.log(userData);
      const response = await api.signUp(userData);

      if (
        response.message &&
        response.message.includes("El correo ya existe")
      ) {
        throw new Error(response.message);
      }

      setIsLoading(false);
      Alert.alert(
        "Éxito",
        response.message || "Cuenta creada con éxito.",
        [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
      );
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;

      Alert.alert(
        "Error",
        errorMessage || "Algo salió mal, por favor intenta nuevamente."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
      <LoaderComponent isVisible={isLoading} text="Creando cuenta..." />

      <Text style={styles.title}>{textsLeng.RegisterScreen.createAccount}</Text>

      <GoogleButtonComponent />

      <FacebookButtonComponent />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>ó</Text>
        <View style={styles.divider} />
      </View>

      <NameGenderComponent
        name={name}
        setName={setName}
        lastName={lastName}
        setLastName={setLastName}
        gender={gender}
        setGender={setGender}
      />

      <EnterEmailComponent
        email={email}
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
        password={password}
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
    marginBottom: hp('1.5%'),
    fontWeight: "bold"
  },
  registerButton: {
    width: "90%",
    backgroundColor: Colors.primary,
    borderRadius: wp('5%'),
    paddingVertical: hp('1.875%'),
    alignItems: "center",
    marginVertical: hp('1.25%'),
    marginTop: hp('2.5%'),
  },
  buttonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: hp('1.25%'),
    color: "black",
    fontWeight: "bold"
  },
  loginLink: {
    color: Colors.events,
    fontWeight: "bold"
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp('2.5%'),
    width: "90%",
    marginBottom: hp('2.5%'),
    marginTop: hp('1.25%'),
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
});

export default RegisterScreen;
