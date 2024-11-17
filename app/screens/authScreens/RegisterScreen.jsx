import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);

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
    AssignLenguaje(dispatch);
  }, [dispatch]);

  const handleRegister = async () => {
    // Validaciones de los campos
    if (!name || !lastName || !email || !password || !tel || !birthday) {
      setAlertTitle("Error");
      setAlertMessage("Por favor, complete todos los campos");
      setAlertIcon("close-circle-outline");
      setAlertVisible(true); // Mostrar alerta de error
      return;
    }

    setIsLoading(true); 
    try {
      // Preparar los datos para el registro
      const userData = {
        name,
        lastname: lastName,
        email,
        password,
        tel,
        birthday,
      };
      console.log(userData);
      // Llamada al API para crear la cuenta
      const response = await api.signUp(userData);

      if (
        response.message &&
        response.message.includes("El correo ya existe")
      ) {
        // Si hay error (correo ya existe)
        throw new Error(response.message); 
      }

      // Si la cuenta fue creada correctamente
      setAlertTitle("Éxito");
      setAlertMessage(
        response.message ||
          "Cuenta creada con éxito. Revisa tu correo para verificar la cuenta."
      );
      setAlertIcon("checkmark-circle-outline");
      setAlertVisible(true);

      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setTel("");
      setBirthday("");
    } catch (error) {
      // Manejo de errores
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;

      setAlertTitle("Error"); // Aquí aseguramos que el título es "Error"
      setAlertMessage(
        errorMessage || "Algo salió mal, por favor intenta nuevamente."
      );
      setAlertIcon("close-circle-outline"); // Icono de error
      setAlertVisible(true);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <LoaderComponent isVisible={isLoading} text="Creando cuenta..." />

      <Text style={styles.title}>{textsLeng.RegisterScreen.createAccount}</Text>

      <GoogleButtonComponent />

      <FacebookButtonComponent />

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
    paddingHorizontal: wp('5%'),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('1%'),
  },
  title: {
    fontSize: SizeConstants.subtitles,
    color: Colors.primaryText,
    textAlign: "center",
    marginBottom: hp('3.75%'),
  },
  registerButton: {
    width: "90%",
    backgroundColor: Colors.primary,
    borderRadius: wp('5%'),
    paddingVertical: hp('1.875%'),
    alignItems: "center",
    marginVertical: hp('1.25%'),
    marginTop: hp('3.75%'),
  },
  buttonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: hp('1.25%'),
    color: "black",
  },
  loginLink: {
    color: Colors.events,
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