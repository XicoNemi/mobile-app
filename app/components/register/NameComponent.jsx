import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const NameComponent = ({ name, setName, lastName, setLastName }) => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const [error, setError] = useState({});
  const [isValidName, setIsValidName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  const handleInputChange = (field, value) => {
    if (field === "name") {
      setName(value);
    } else {
      setLastName(value);
    }

    if (typingTimeout) clearTimeout(typingTimeout);

    setError((prevError) => ({
      ...prevError,
      [field]: "",
    }));

    setTypingTimeout(
      setTimeout(() => {
        verifyInput(field, value);
      }, 1500)
    );
  };

  const verifyInput = (field, value) => {
    switch (field) {
      case "name":
        const isValidName = value && value.length >= 5;
        setIsValidName(isValidName);
        setError((prevError) => ({
          ...prevError,
          name: isValidName ? "" : textsLeng.RegisterScreen.nameError,
        }));
        break;
      case "lastName":
        const isValidLastName = value && value.length >= 5;
        setIsValidLastName(isValidLastName);
        setError((prevError) => ({
          ...prevError,
          lastName: isValidLastName
            ? ""
            : textsLeng.RegisterScreen.lastNameError,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Nombre */}
      <Text style={styles.label}>{textsLeng.RegisterScreen.name}</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: isValidName ? Colors.routes : Colors.primary },
        ]}
        placeholderTextColor="#AAAAAA"
        value={name}
        onChangeText={(value) => handleInputChange("name", value)}
      />
      {error.name && <Text style={styles.errorText}>{error.name}</Text>}

      {/* Apellido */}
      <Text style={styles.label}>{textsLeng.RegisterScreen.lastName}</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: isValidLastName ? Colors.routes : Colors.primary },
        ]}
        placeholderTextColor="#AAAAAA"
        value={lastName}
        onChangeText={(value) => handleInputChange("lastName", value)}
      />
      {error.lastName && <Text style={styles.errorText}>{error.lastName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: hp('1%'),
  },
  label: {
    color: Colors.primary,
    marginBottom: hp('0.625%'),
  },
  input: {
    height: hp('6%'),
    borderWidth: 1,
    borderRadius: wp('1.25%'),
    paddingHorizontal: wp('2.5%'),
    marginBottom: hp('1.875%'),
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 5,
    marginTop: hp('-1.25%'),
    marginBottom: hp('1.25%'),
  },
});

export default NameComponent;