import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AssignLenguaje from "../lenguage/AssignLenguage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../utils/Colors";
import SizeConstants from "../utils/SizeConstants";
import ChangePasswordComponent from "../components/register/ChangePasswordComponent";
import CustomAlert from "../components/generals/CustomAlertComponent";
import { logOut } from "../features/authSlice";

const ProfileScreen = ({ navigation }) => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  const toggleDarkMode = () => setIsDarkMode((prevState) => !prevState);

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
      {/* Botón de regresar */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={SizeConstants.iconsCH} color="#FFF" />
      </TouchableOpacity>

      {/* Avatar y nombre */}
      <View style={styles.profileHeader}>
        <Image
          source={require("../../assets/avatar.png")}
          style={styles.avatar}
        />
        <Text style={styles.userName}>Eli Haziel, 19</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            !isEditingPassword && styles.activeTabButton,
          ]}
          onPress={() => setIsEditingPassword(false)}
        >
          <Ionicons
            name="person-circle-outline"
            size={SizeConstants.iconsM}
            color={!isEditingPassword ? "#000" : "#808080"}
            style={styles.icon}
          />
          <Text
            style={[
              styles.tabText,
              !isEditingPassword && styles.activeTabText,
            ]}
          >
            {textsLeng.ProfileScreen.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            isEditingPassword && styles.activeTabButton,
          ]}
          onPress={() => setIsEditingPassword(true)}
        >
          <Ionicons
            name="settings-sharp"
            size={SizeConstants.iconsM}
            color={isEditingPassword ? "#000" : "#808080"}
            style={styles.icon}
          />
          <Text
            style={[
              styles.tabText,
              isEditingPassword && styles.activeTabText,
            ]}
          >
            {textsLeng.ProfileScreen.changePasswordTitle}
          </Text>
        </TouchableOpacity>
      </View>

      {!isEditingPassword ? (
        <View style={styles.profileDetails}>
          {/* Contenido de "Perfil" */}
          <View style={styles.detailRow}>
            <Ionicons name="mail" size={SizeConstants.iconsCH} color="#000" />
            <View style={styles.detailColumn}>
              <Text style={styles.label}>{textsLeng.ProfileScreen.email}</Text>
              <Text style={styles.value}>jfosadoanimas@gmail.com</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="call-sharp" size={SizeConstants.iconsCH} color="#000" />
            <View style={styles.detailColumn}>
              <Text style={styles.label}>
                {textsLeng.ProfileScreen.phoneNum}
              </Text>
              <Text style={styles.value}>76476476476</Text>
            </View>
          </View>
          <View style={styles.switchRow}>
            <Ionicons
              name="globe-sharp"
              size={SizeConstants.iconsCH}
              color="#000"
            />
            <Text style={styles.labelLenguage}>
              {textsLeng.ProfileScreen.changeLenguage}
            </Text>
            <View style={styles.switchContainer}>
              <Switch
                trackColor={{ false: "#767577", true: Colors.primary }}
                thumbColor={isDarkMode ? "#000" : "#000"}
                onValueChange={toggleDarkMode}
                value={isDarkMode}
                style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>
              {textsLeng.ProfileScreen.logout}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.changePasswordContainer}>
          <ChangePasswordComponent />
        </View>
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
    left: 10,
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
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
  },
  tabButton: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
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
  profileDetails: { paddingHorizontal: 22, marginTop: 35 },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 15,
  },
  detailColumn: {
    marginLeft: 20
  },
  label: {
    fontSize: SizeConstants.textsM,
    color: "#000",
    marginBottom: 5,
  },
  labelLenguage: {
    color: "#000",
    marginStart: 20,
    fontSize: SizeConstants.textsM,
  },
  value: {
    fontSize: SizeConstants.texts,
    color: Colors.primary,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
    marginEnd: 100,
  },

  switchContainer: {
    marginStart: 100,
  },

  changePasswordContainer: { paddingHorizontal: 22, marginTop: 35 },
  logoutButton: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    paddingVertical: 10,
    width: "45%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: 100,
  },
  logoutButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: SizeConstants.texts,
  },
});

export default ProfileScreen;
