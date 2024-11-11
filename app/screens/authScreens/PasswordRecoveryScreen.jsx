import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import LanguageProvider from "../../lenguage/LanguageProvider";
import LoaderComponent from "../../components/generals/LoaderComponent"; // Import LoaderComponent

const PasswordRecoveryScreen = ({}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false); // State for loader visibility
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);

  useEffect(() => {
    AssignLenguaje(setTextsLeng);
  }, []);

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
      setLoading(true); // Show loader
      setTimeout(() => {
        setLoading(false); // Hide loader after sending link
        setShowMessage(true);
      }, 2000); // Simulate a delay for sending the link
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
    paddingHorizontal: 30,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: SizeConstants.subtitles,
    color: Colors.primaryText,
    textAlign: "center",
    marginBottom: 55,
    marginTop: 60,
  },
  label: {
    fontSize: SizeConstants.texts,
    color: Colors.primary,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: SizeConstants.texts,
    color: Colors.primaryText,
    marginBottom: 8,
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 5,
    marginTop: -4,
    marginBottom: 8,
  },
  messageContainer: {
    backgroundColor: Colors.primaryLight,
    padding: 30,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 20,
  },
  messageText: {
    color: "white",
    fontSize: SizeConstants.texts,
    textAlign: "auto",
    marginBottom: 10,
  },
  messageText1: {
    color: "white",
    fontSize: SizeConstants.texts,
    marginTop: 10,
    textAlign: "auto",
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
    marginTop: 25,
  },
  buttonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
});

export default PasswordRecoveryScreen;
