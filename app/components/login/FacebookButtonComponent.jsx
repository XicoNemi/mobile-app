import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SizeConstants from "../../utils/SizeConstants";
import LanguageProvider from "../../lenguage/LanguageProvider";
import AssignLenguaje from "../../lenguage/AssignLenguage";

const FacebookButtonComponent = ({ onPress }) => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);

  useEffect(() => {
    AssignLenguaje(setTextsLeng);
  }, []);

  return (
    <TouchableOpacity style={styles.facebookButton} onPress={onPress}>
      <Ionicons name="logo-facebook" size={SizeConstants.iconsCH} color="white" />
      <Text style={styles.socialButtonText}>{textsLeng.LoginScreen.signFacebook}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 85,
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

export default FacebookButtonComponent;
