import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      }, 1500)
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
    marginBottom: hp('1.875%'),
    marginTop: hp('-1.875%'),
  },
  label: {
    color: Colors.primary,
    marginBottom: hp('0.625%'),
  },
  input: {
    height: hp('6.25%'),
    borderWidth: 1,
    borderRadius: wp('1.25%'),
    paddingHorizontal: wp('2.5%'),
    marginBottom: hp('0.625%'),
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 5,
    marginTop: hp('-0.25%'),
  },
});

export default EnterEmailComponent;