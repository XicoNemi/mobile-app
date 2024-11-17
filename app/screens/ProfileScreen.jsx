import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import AssignLenguaje from '../lenguage/AssignLenguage';
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

const ProfileScreen = ({ navigation }) => {
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  const toggleDarkMode = () => setIsDarkMode((prevState) => !prevState);

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
              <Text style={styles.label}>{textsLeng.ProfileScreen.phoneNum}</Text>
              <Text style={styles.value}>76476476476</Text>
            </View>
          </View>
          <View style={styles.switchRow}>
            <Ionicons
              name="language-outline"
              size={SizeConstants.iconsCH}
              color="#000"
            />
            <Text style={styles.label}>{textsLeng.ProfileScreen.changeLenguage}</Text>
            <Switch
              trackColor={{ false: "#767577", true: Colors.primary }}
              thumbColor={isDarkMode ? "#000" : "#000"}
              onValueChange={toggleDarkMode}
              value={isDarkMode}
            />
          </View>
        </View>
      ) : (
        <View style={styles.changePasswordContainer}>
          {/* Contenido de "Cambiar contraseña" */}
          <ChangePasswordComponent />
        </View>
      )}
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
    marginTop: 60,
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
    fontSize: 16,
    color: "#808080",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  icon: { marginRight: 5 },
  profileDetails: { paddingHorizontal: 20, marginTop: 20 },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    paddingBottom: 10,
  },
  detailColumn: { marginLeft: 10 },
  label: { fontSize: 16, fontWeight: "bold" },
  value: { fontSize: 16, color: Colors.primary },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  changePasswordContainer: { paddingHorizontal: 20, marginTop: 20 },
});

export default ProfileScreen;
