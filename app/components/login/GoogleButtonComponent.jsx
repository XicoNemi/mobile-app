import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SizeConstants from "../../utils/SizeConstants";
import LanguageProvider from "../../lenguage/LanguageProvider";
import AssignLenguaje from "../../lenguage/AssignLenguage";

const GoogleButtonComponent = ({ onPress }) => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa); // Idioma predeterminado

  useEffect(() => {
    AssignLenguaje(setTextsLeng); // Cargar el idioma seleccionado
  }, []);

  return (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      <Ionicons name="logo-google" size={SizeConstants.iconsCH} color="white" />
      <Text style={styles.socialButtonText}>{textsLeng.LoginScreen.signGoogle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 93,
    borderRadius: 22,
    marginBottom: 10,
    width: "95%",
    height: 50,
  },
  socialButtonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    marginLeft: 10,
  },
});

export default GoogleButtonComponent;
