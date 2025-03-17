import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import { useNavigation } from "@react-navigation/native";
import LanguageSwitcher from "../../lenguage/LanguageSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/authSlice";
import CustomAlert from "../../components/generals/CustomAlertComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ProfileMenuDropdown = ({ onLogout }) => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  const handleLogout = () => {
    setIsModalVisible(true);
  };

  const confirmLogout = () => {
    setIsModalVisible(false);
    onLogout(); // Llamar a la función onLogout pasada como prop
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
        <LanguageSwitcher />
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
    padding: wp('5%'),
    borderRadius: wp('1.25%'),
    position: "absolute",
    top: hp('6.25%'),
    right: wp('2.5%'),
    zIndex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp('1%'),
  },
  menuText: {
    marginLeft: wp('3%'),
    fontSize: SizeConstants.texts,
  },
  languageSwitcherContainer: {
    marginVertical: hp('1%'),
    marginLeft: wp('-2%'),
  },
});

export default ProfileMenuDropdown;
