import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EnterPasswordComponent = ({ password, setPassword, textsLeng }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const handlePasswordChange = (value) => {
    setPassword(value);

    if (typingTimeout) clearTimeout(typingTimeout);

    if (error) {
      setError("");
    }

    setTypingTimeout(
      setTimeout(() => {
        verifyPassword(value);
      }, 1500)
    );
  };

  const verifyPassword = (value) => {
    if (!value || value.length < 6) {
      setError(textsLeng.LoginScreen.loginPassword.texts.passwordError);
      setIsValidPassword(false);
    } else {
      setError("");
      setIsValidPassword(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{textsLeng.LoginScreen.password}</Text>
      <View
        style={[
          styles.passwordContainer,
          { borderColor: isValidPassword ? Colors.routes : Colors.primary },
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholderTextColor="#AAAAAA"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={handlePasswordChange}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={SizeConstants.iconsCH}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginTop: hp('-1.875%'),
  },
  label: {
    color: Colors.primary,
    marginBottom: hp('0.625%'),
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: wp('1.25%'),
    paddingHorizontal: wp('2.5%'),
  },
  passwordInput: {
    flex: 1,
    height: hp('6.25%'),
    fontSize: SizeConstants.texts,
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 5,
    marginTop: hp('0.25%'),
    marginBottom: hp('1.25%'),
  },
});

export default EnterPasswordComponent;