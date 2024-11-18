import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AssignLenguaje from "../lenguage/AssignLenguage";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={SizeConstants.iconsCH} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.profileHeader}>
          {loading ? (
            <View style={{ width: wp('45%'), height: wp('45%'), borderRadius: wp('22.5%'), overflow: 'hidden' }}>
              <SkeletonComponent width={wp('45%')} height={wp('45%')} borderRadius={wp('22.5%')} />
            </View>
          ) : (
            <Image
              source={require("../../assets/avatar.png")}
              style={styles.avatar}
            />
          )}
          {loading ? (
            <View style={{ width: wp('62.5%'), height: hp('4%'), borderRadius: wp('2.5%'), overflow: 'hidden', marginTop: hp('1%') }}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: hp('3%'),
    padding: wp('5%'),
  },
  backButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: hp('1%'),
    left: wp('2.75%'),
    zIndex: 10,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: hp('10%'),
    marginBottom: hp('2.5%'),
  },
  avatar: {
    width: wp('45%'),
    height: wp('45%'),
    borderRadius: wp('10%'),
  },
  userName: {
    marginTop: hp('1%'),
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
    paddingVertical: hp('1.25%'),
    flexDirection: "row",
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    marginLeft: wp('1.25%'),
    fontSize: SizeConstants.texts,
    color: "#808080",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },
  icon: { marginRight: wp('1.25%') },
});

export default ProfileScreen;