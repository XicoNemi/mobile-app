import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";

const NameComponent = ({ name, setName, lastName, setLastName }) => {
  const [error, setError] = useState({});
  const [isValidName, setIsValidName] = useState(false);
  const [isValidLastName, setIsValidLastName] = useState(false);

  const handleInputChange = (field, value) => {
    if (field === "name") {
      setName(value);
    } else {
      setLastName(value);
    }

    verifyInput(field, value);
  };

  const verifyInput = (field, value) => {
    switch (field) {
      case "name":
        const isValidName = value && value.length >= 2;
        setIsValidName(isValidName);
        setError((prevError) => ({
          ...prevError,
          name: isValidName ? "" : "El nombre debe tener al menos 2 caracteres.",
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
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 5,
    marginTop: -12,
    marginBottom: 10,
  },
});

export default NameComponent;
