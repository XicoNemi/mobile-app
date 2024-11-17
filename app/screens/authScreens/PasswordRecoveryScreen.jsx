import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import LoaderComponent from "../../components/generals/LoaderComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PasswordRecoveryScreen = ({}) => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  const handleEmailChange = (value) => {
    setEmail(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    if (error) {
      setError("");
    }

    setTypingTimeout(
      setTimeout(() => {
        verifyEmail(value);
      }, 2000)
    );
  };

  const verifyEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setError(textsLeng.LoginScreen.enterEmail.texts.errorNext);
      setIsValidEmail(false);
    } else if (!emailPattern.test(value)) {
      setError(textsLeng.LoginScreen.enterEmail.texts.invalidEmail);
      setIsValidEmail(false);
    } else {
      setError("");
      setIsValidEmail(true);
    }
  };

  const handleSendLink = () => {
    if (!email.trim()) {
      setError(textsLeng.LoginScreen.enterEmail.texts.errorNext);
      return;
    }

    if (isValidEmail) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowMessage(true);
      }, 2000);
    } else {
      setError(textsLeng.LoginScreen.enterEmail.texts.invalidEmail);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {textsLeng.RegisterScreen.recoverPassword}
      </Text>

      <Text style={styles.label}>{textsLeng.LoginScreen.email}</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: isValidEmail ? Colors.routes : Colors.primary },
        ]}
        placeholderTextColor="#AAAAAA"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            {textsLeng.RegisterScreen.passwordRecoveryMessage}
          </Text>
          <Text style={styles.messageText1}>
            {textsLeng.RegisterScreen.messageRecoveryIndication}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSendLink}>
        <Text style={styles.buttonText}>
          {textsLeng.RegisterScreen.sendLink}
        </Text>
      </TouchableOpacity>

      <LoaderComponent isVisible={loading} text="Enviando link" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: wp('7.5%'),
    justifyContent: "flex-start",
  },
  title: {
    fontSize: SizeConstants.subtitles,
    color: Colors.primaryText,
    textAlign: "center",
    marginBottom: hp('6.875%'),
    marginTop: hp('7.5%'),
  },
  label: {
    fontSize: SizeConstants.texts,
    color: Colors.primary,
    marginBottom: hp('0.625%'),
  },
  input: {
    height: hp('6.25%'),
    borderWidth: 1,
    borderRadius: wp('1.25%'),
    paddingHorizontal: wp('2.5%'),
    fontSize: SizeConstants.texts,
    color: Colors.primaryText,
    marginBottom: hp('1%'),
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 5,
    marginTop: hp('-0.625%'),
    marginBottom: hp('1%'),
  },
  messageContainer: {
    backgroundColor: Colors.primaryLight,
    padding: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginBottom: hp('1.875%'),
    marginTop: hp('2.5%'),
  },
  messageText: {
    color: "white",
    fontSize: SizeConstants.texts,
    textAlign: "auto",
    marginBottom: hp('1.25%'),
  },
  messageText1: {
    color: "white",
    fontSize: SizeConstants.texts,
    marginTop: hp('1.25%'),
    textAlign: "auto",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: wp('6.25%'),
    paddingVertical: hp('1.875%'),
    alignItems: "center",
    width: "100%",
    marginTop: hp('3.125%'),
  },
  buttonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
});

export default PasswordRecoveryScreen;