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
import DateTimePicker from "@react-native-community/datetimepicker";

const UserDataComponent = ({
  name,
  setName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  tel,
  setTel,
  birthday,
  setBirthday,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState({});
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [isValidName, setIsValidName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidTel, setIsValidTel] = useState(false);
  const [isValidBirthday, setIsValidBirthday] = useState(false);

  const handleInputChange = (field, value) => {
    if (typingTimeout) clearTimeout(typingTimeout);

    switch (field) {
      case "name":
        setName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "tel":
        setTel(value);
        break;
      case "birthday":
        setBirthday(value);
        break;
      default:
        break;
    }

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

      case "tel":
        const telPattern = /^[0-9]{10}$/;
        const isValidTel = value && telPattern.test(value);
        setIsValidTel(isValidTel);
        setError((prevError) => ({
          ...prevError,
          tel: isValidTel ? "" : "El número de teléfono debe tener 10 dígitos.",
        }));
        break;

      case "birthday":
        let formattedDate = value;
        // Añadir un cero al inicio del día o mes si son de un solo dígito
        const [day, month, year] = value.split("-");
        if (day && day.length === 1) {
          formattedDate = `0${day}-${month}-${year}`;
        }
        if (month && month.length === 1) {
          formattedDate = `${day}-${"0" + month}-${year}`;
        }

        const datePattern = /^\d{2}-\d{2}-\d{4}$/;
        const isValidBirthday =
          formattedDate && datePattern.test(formattedDate);

        // Validar si la fecha es válida y no es una fecha futura
        if (isValidBirthday) {
          const [formattedDay, formattedMonth, formattedYear] = formattedDate
            .split("-")
            .map((num) => parseInt(num, 10));
          const enteredDate = new Date(
            formattedYear,
            formattedMonth - 1,
            formattedDay
          );
          const currentDate = new Date();
          if (enteredDate > currentDate) {
            setIsValidBirthday(false);
            setError((prevError) => ({
              ...prevError,
              birthday: "La fecha de nacimiento no puede ser una fecha futura.",
            }));
          } else {
            setIsValidBirthday(true);
            setError((prevError) => ({
              ...prevError,
              birthday: "",
            }));
          }
        } else {
          setIsValidBirthday(false);
          setError((prevError) => ({
            ...prevError,
            birthday: "La fecha debe tener el formato DD-MM-AAAA.",
          }));
        }
        break;

      default:
        break;
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = `${selectedDate.getDate()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getFullYear()}`;
      setBirthday(formattedDate);
      verifyInput("birthday", formattedDate);
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
      />
      {error.email && <Text style={styles.errorText}>{error.email}</Text>}

      {/* Fila de Teléfono y Fecha de Nacimiento */}
      <View style={styles.rowContainer}>
        {/* Teléfono */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: isValidTel ? Colors.routes : Colors.primary },
            ]}
            placeholderTextColor="#AAAAAA"
            keyboardType="phone-pad"
            value={tel}
            onChangeText={(value) => handleInputChange("tel", value)}
          />
          {error.tel && <Text style={styles.errorText}>{error.tel}</Text>}
        </View>

        {/* Fecha de Nacimiento */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha de Nacimiento</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: isValidBirthday ? Colors.routes : Colors.primary,
                },
              ]}
              placeholderTextColor="#AAAAAA"
              value={birthday}
              editable={false}
            />
          </TouchableOpacity>
          {error.birthday && (
            <Text style={styles.errorText}>{error.birthday}</Text>
          )}
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: -5,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputContainer: {
    width: "48%",
  },
  label: {
    color: Colors.primary,
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    height: 45,
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 3,
    marginTop: -12,
    marginBottom: 10,
  },
});

export default UserDataComponent;
