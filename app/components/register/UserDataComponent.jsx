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

const UserDataComponent = ({
  name,
  setName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  repeatPassword,
  setRepeatPassword,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);
  const [error, setError] = useState({});
  const [typingTimeout, setTypingTimeout] = useState(null);

  // Estados de validación de cada campo
  const [isValidName, setIsValidName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidRepeatPassword, setIsValidRepeatPassword] = useState(false);

  const handleInputChange = (field, value) => {
    if (typingTimeout) clearTimeout(typingTimeout);
    if (field === "name") setName(value);
    if (field === "lastName") setLastName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "repeatPassword") setRepeatPassword(value);

    setTypingTimeout(
      setTimeout(() => {
        verifyInput(field, value);
      }, 1500)
    );
  };

  const verifyInput = (field, value) => {
    switch (field) {
      case "name":
        const isValidName = value && value.length >= 2;
        setIsValidName(isValidName);
        setError((prevError) => ({
          ...prevError,
          name: isValidName
            ? ""
            : "El nombre debe tener al menos 2 caracteres.",
        }));
        break;

      case "lastName":
        const isValidLastName = value && value.length >= 2;
        setIsValidLastName(isValidLastName);
        setError((prevError) => ({
          ...prevError,
          lastName: isValidLastName
            ? ""
            : "El apellido debe tener al menos 2 caracteres.",
        }));
        break;

      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = value && emailPattern.test(value);
        setIsValidEmail(isValidEmail);
        setError((prevError) => ({
          ...prevError,
          email: isValidEmail ? "" : "Por favor, introduce un correo válido.",
        }));
        break;

      case "password":
        const isValidPassword = value && value.length >= 6;
        setIsValidPassword(isValidPassword);
        setError((prevError) => ({
          ...prevError,
          password: isValidPassword
            ? ""
            : "La contraseña debe tener al menos 6 caracteres.",
        }));
        break;

      case "repeatPassword":
        const isValidRepeatPassword = value === password;
        setIsValidRepeatPassword(isValidRepeatPassword);
        setError((prevError) => ({
          ...prevError,
          repeatPassword: isValidRepeatPassword
            ? ""
            : "Las contraseñas no coinciden.",
        }));
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Nombre */}
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: isValidName ? Colors.routes : Colors.primary },
        ]}
        placeholderTextColor="#AAAAAA"
        value={name}
        onChangeText={(value) => handleInputChange("name", value)}
        accessibilityLabel="Nombre"
      />
      {error.name && <Text style={styles.errorText}>{error.name}</Text>}

      {/* Apellido */}
      <Text style={styles.label}>Apellido</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: isValidLastName ? Colors.routes : Colors.primary },
        ]}
        placeholderTextColor="#AAAAAA"
        value={lastName}
        onChangeText={(value) => handleInputChange("lastName", value)}
        accessibilityLabel="Apellido"
      />
      {error.lastName && <Text style={styles.errorText}>{error.lastName}</Text>}

      {/* Correo */}
      <Text style={styles.label}>Correo</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: isValidEmail ? Colors.routes : Colors.primary },
        ]}
        placeholderTextColor="#AAAAAA"
        keyboardType="email-address"
        value={email}
        onChangeText={(value) => handleInputChange("email", value)}
        accessibilityLabel="Correo electrónico"
      />
      {error.email && <Text style={styles.errorText}>{error.email}</Text>}

      {/* Contraseña */}
      <Text style={styles.label}>Contraseña</Text>
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
          onChangeText={(value) => handleInputChange("password", value)}
          accessibilityLabel="Contraseña"
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
      {error.password && <Text style={styles.errorText}>{error.password}</Text>}

      {/* Repetir Contraseña */}
      <Text style={styles.label}>Repetir Contraseña</Text>
      <View
        style={[
          styles.passwordContainer,
          {
            borderColor: isValidRepeatPassword ? Colors.routes : Colors.primary,
          },
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholderTextColor="#AAAAAA"
          secureTextEntry={!isRepeatPasswordVisible}
          value={repeatPassword}
          onChangeText={(value) => handleInputChange("repeatPassword", value)}
          accessibilityLabel="Repetir contraseña"
        />
        <TouchableOpacity
          onPress={() => setIsRepeatPasswordVisible(!isRepeatPasswordVisible)}
        >
          <Ionicons
            name={isRepeatPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {error.repeatPassword && (
        <Text style={styles.errorText}>{error.repeatPassword}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: 1,
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
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 45,
    fontSize: SizeConstants.texts,
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 3,
    marginTop: -12,
    marginBottom: 10,
  },
});

export default UserDataComponent;
