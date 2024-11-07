import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";

const EnterEmailComponent = ({ email, setEmail, textsLeng }) => {
  const [error, setError] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(false);

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
      setError(textsLeng.LoginScreen.enterEmail.texts.invalidEmail);
      setIsValidEmail(false);
    } else if (!emailPattern.test(value)) {
      setError(textsLeng.LoginScreen.enterEmail.texts.errorNext);
      setIsValidEmail(false);
    } else {
      setError("");
      setIsValidEmail(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{textsLeng.LoginScreen.email}</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: isValidEmail ? Colors.routes : Colors.primary },
        ]}
        placeholderTextColor="#AAAAAA"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: 15,
  },
  label: {
    color: Colors.primary,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 3,
    marginTop: -2,
  },
});

export default EnterEmailComponent;
