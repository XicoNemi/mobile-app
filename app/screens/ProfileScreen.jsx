import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AssignLenguaje from "../lenguage/AssignLenguage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../utils/Colors";
import SizeConstants from "../utils/SizeConstants";
import ChangePasswordComponent from "../components/ProfileComponents/ChangePasswordComponent";
import ProfileDetailsComponent from "../components/ProfileComponents/ProfileDetailsComponent";
import CustomAlert from "../components/generals/CustomAlertComponent";
import { logOut } from "../features/authSlice";
import { setLanguage, setTextsLeng } from "../features/languageSlice";
import { saveValue } from "../utils/localStorage";
import LanguageProvider from "../lenguage/LanguageProvider";
import SkeletonComponent from "../components/generals/SkeletonComponent";

const ProfileScreen = ({ navigation }) => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const language = useSelector((state) => state.language.language);

  useEffect(() => {
    AssignLenguaje(dispatch);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  const toggleLanguage = async () => {
    const newLanguage = language === "spa" ? "en" : "spa";
    await saveValue("lenguage", newLanguage);
    dispatch(setLanguage(newLanguage));
    dispatch(setTextsLeng(LanguageProvider[newLanguage]));
  };

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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={SizeConstants.iconsCH} color="#FFF" />
      </TouchableOpacity>
      <View style={styles.profileHeader}>
        {loading ? (
          <View style={{ width: 180, height: 180, borderRadius: 90, overflow: 'hidden' }}>
            <SkeletonComponent width={180} height={180} borderRadius={90} />
          </View>
        ) : (
          <Image
            source={require("../../assets/avatar.png")}
            style={styles.avatar}
          />
        )}
        {loading ? (
          <View style={{ width: 250, height: 30, borderRadius: 10, overflow: 'hidden', marginTop: 10 }}>
            <SkeletonComponent />
          </View>
        ) : (
          <Text style={styles.userName}>Neftali Arturo</Text>
        )}
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, !isEditingPassword && styles.activeTabButton]}
          onPress={() => setIsEditingPassword(false)}
        >
          <Ionicons
            name="person-circle-outline"
            size={SizeConstants.iconsM}
            color={!isEditingPassword ? "#000" : "#808080"}
            style={styles.icon}
          />
          <Text style={[styles.tabText, !isEditingPassword && styles.activeTabText]}>
            {textsLeng.ProfileScreen.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, isEditingPassword && styles.activeTabButton]}
          onPress={() => setIsEditingPassword(true)}
        >
          <Ionicons
            name="settings-sharp"
            size={SizeConstants.iconsM}
            color={isEditingPassword ? "#000" : "#808080"}
            style={styles.icon}
          />
          <Text style={[styles.tabText, isEditingPassword && styles.activeTabText]}>
            {textsLeng.ProfileScreen.changePasswordTitle}
          </Text>
        </TouchableOpacity>
      </View>
      {!isEditingPassword ? (
        <ProfileDetailsComponent
          toggleLanguage={toggleLanguage}
          handleLogout={handleLogout}
        />
      ) : (
        <ChangePasswordComponent />
      )}

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
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 30,
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    left: 11,
    zIndex: 10,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 75,
    marginBottom: 20,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 40,
  },
  userName: {
    marginTop: 10,
    fontSize: SizeConstants.iconsG,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#D3D3D3",
  },
  tabButton: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    marginLeft: 5,
    fontSize: SizeConstants.texts,
    color: "#808080",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  icon: { marginRight: 5 },
});

export default ProfileScreen;
