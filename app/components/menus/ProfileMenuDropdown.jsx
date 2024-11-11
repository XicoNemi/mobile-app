import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import LanguageProvider from "../../lenguage/LanguageProvider";
import { useNavigation } from "@react-navigation/native";
import LanguageSwitcher from "../../lenguage/LanguageSwitcher";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/authSlice";
import CustomAlert from "../../components/generals/CustomAlertComponent";

const ProfileMenuDropdown = () => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    AssignLenguaje(setTextsLeng);
  }, []);

  const handleLogout = () => {
    setIsModalVisible(true);
  };

  const confirmLogout = () => {
    setIsModalVisible(false);
    dispatch(logOut());
  };

  const cancelLogout = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.menu}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate("ProfileScreen");
        }}
      >
        <Ionicons
          name="person-outline"
          size={SizeConstants.iconsCH}
          color="black"
        />
        <Text style={styles.menuText}>
          {textsLeng.components.menuItems.myProfile}
        </Text>
      </TouchableOpacity>

      <View style={styles.languageSwitcherContainer}>
        <LanguageSwitcher setTextsLeng={setTextsLeng} />
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Ionicons
          name="log-out-outline"
          size={SizeConstants.iconsCH}
          color="black"
        />
        <Text style={styles.menuText}>
          {textsLeng.components.menuItems.logOut}
        </Text>
      </TouchableOpacity>

      <CustomAlert
        isVisible={isModalVisible}
        title={textsLeng.AlertMessagelogOut.title}
        message={textsLeng.AlertMessagelogOut.message}
        iconName="alert-circle-outline"
        onClose={cancelLogout}
        onConfirm={confirmLogout}
        primaryButton={{
          text: textsLeng.AlertMessagelogOut.confirmButtonTitle,
          onPress: confirmLogout,
        }}
        secondaryButton={{
          text: textsLeng.AlertMessagelogOut.cancelButtonTitle,
          onPress: cancelLogout,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "#F4F4F4",
    padding: 20,
    borderRadius: 5,
    position: "absolute",
    top: 50,
    right: 10,
    zIndex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  menuText: {
    marginLeft: 12,
    fontSize: SizeConstants.texts,
  },
  languageSwitcherContainer: {
    marginVertical: 8,
    marginLeft: -8,
  },
});

export default ProfileMenuDropdown;
