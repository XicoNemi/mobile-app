import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
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
      {/* Cargar la imagen del ícono de Google desde assets */}
      <Image source={require("../../../assets/google.png")} style={styles.icon} />
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
  icon: {
    width: 27,  
    height: 27, 
  },
  socialButtonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    marginLeft: 10,
  },
});

export default GoogleButtonComponent;
