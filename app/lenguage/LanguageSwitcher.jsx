import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, setTextsLeng } from "../features/languageSlice";
import { saveValue, getValueFor } from "../utils/localStorage";
import SizeConstants from "../utils/SizeConstants";
import LanguageProvider from "../lenguage/LanguageProvider";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await getValueFor("lenguage");
      if (savedLanguage) {
        dispatch(setLanguage(savedLanguage));
        dispatch(setTextsLeng(LanguageProvider[savedLanguage]));
      }
    };

    loadLanguage();
  }, [dispatch]);

  const changeLanguage = async () => {
    const newLanguage = language === "spa" ? "en" : "spa";
    await saveValue("lenguage", newLanguage);
    dispatch(setLanguage(newLanguage));
    dispatch(setTextsLeng(LanguageProvider[newLanguage]));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.translator} onPress={changeLanguage}>
        <Ionicons
          name="language-sharp"
          size={SizeConstants.iconsCH}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.text}>
          {language === "spa" ? "Cambiar idioma" : "Change language"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  translator: {
    flexDirection: "row",
    backgroundColor: "#F4F4F4",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  text: {
    marginLeft: 5,
    color: "black",
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
});

export default LanguageSwitcher;
