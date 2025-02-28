import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MenuDropdown from "../../components/menus/MenuDropdownComponent";
import ProfileMenuDropdown from "../../components/menus/ProfileMenuDropdown";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import SkeletonComponent from "../../components/generals/SkeletonComponent";
import SizeConstants from "../../utils/SizeConstants";
import Colors from "../../utils/Colors";
import RoutesList from "../../components/dashbord/RoutesList";
import VisitList from "../../components/dashbord/VisitList";
import RecommendationsList from "../../components/dashbord/RecommendationsList";
import SearchInputComponent from "../../components/generals/SearchInputComponent";
import CustomAlertComponent from "../../components/generals/CustomAlertComponent";
import { logOut } from "../../features/authSlice";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const userName = useSelector((state) => state.auth.name);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuVisibleProfile, setMenuVisibleProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    if (!menuVisible) {
      setTimeout(() => {
        setMenuVisible(false);
      }, 10000); // Cierra el menú después de 5 segundos
    }
  };

  const toggleMenuProfile = () => {
    if (!userName) {
      setAlertVisible(true);
    } else {
      setMenuVisibleProfile(!menuVisibleProfile);
      if (!menuVisibleProfile) {
        setTimeout(() => {
          setMenuVisibleProfile(false);
        }, 10000); 
      }
    }
  };

  const handleLogout = () => {
    setMenuVisibleProfile(false); // Cerrar el menú inmediatamente
    dispatch(logOut());
    setTimeout(() => {
        navigation.navigate("HomeScreen");
    }, 0); // Navegar después de cerrar sesión
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);
    AssignLenguaje(dispatch);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons
            name="menu-outline"
            size={SizeConstants.iconsG}
            color="black"
          />
        </TouchableOpacity>

        <Text style={styles.title}>{textsLeng.HomeScreen.start}</Text>

        <TouchableOpacity onPress={toggleMenuProfile}>
          <Ionicons
            name="person-circle-outline"
            size={SizeConstants.iconsG}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {menuVisible && <MenuDropdown navigation={navigation} />}
      {menuVisibleProfile && (
        <ProfileMenuDropdown
          navigation={navigation}
          onLogout={handleLogout}
        />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{ width: wp('90%'), height: hp('7%'), borderRadius: wp('3%'), overflow: 'hidden' }}>
            <SkeletonComponent />
          </View>) : (
          <SearchInputComponent />
        )}

        <Text style={styles.welcomeText}>
          {loading ? (
            <View style={{ width: wp('90%'), height: hp('6%'), borderRadius: wp('1%'), overflow: 'hidden' }}>
              <SkeletonComponent />
            </View>) : (
            <>
              {textsLeng.HomeScreen.welcomeText}{" "}
              <Text style={styles.userName}>{userName ? userName : "a XicoNemi"}</Text>
            </>
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {loading ? (
            <SkeletonComponent width="70%" height={hp('3.75%')} />
          ) : (
            textsLeng.HomeScreen.sectionTitleItineraries
          )}
        </Text>

        <RoutesList loading={loading} />

        <Text style={styles.sectionSubtitle}>
          {loading ? (
            <SkeletonComponent width="70%" height={hp('3.75%')} />
          ) : (
            textsLeng.HomeScreen.sectionSubtitleVisit
          )}
        </Text>

        <VisitList loading={loading} />

        <Text style={styles.sectionTitle}>
          {loading ? (
            <SkeletonComponent width="70%" height={hp('3.75%')} />
          ) : (
            textsLeng.HomeScreen.sectionTitleContinue
          )}
        </Text>

        <RecommendationsList loading={loading} />
      </ScrollView>

      <CustomAlertComponent
        isVisible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title={textsLeng.CustomAlertComponent.accessRequired}
        message={textsLeng.CustomAlertComponent.accessMessage}
        primaryButton={{
          text: textsLeng.CustomAlertComponent.loginButton,
          onPress: () => navigation.navigate("LoginScreen"),
        }}
        secondaryButton={{
          text: textsLeng.CustomAlertComponent.cancelButton,
          onPress: () => setAlertVisible(false),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: wp('4%'),
    marginTop: hp('3%'),
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp('1.25%'),
  },
  title: {
    fontSize: SizeConstants.subtitles,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: SizeConstants.titles,
    fontWeight: "bold",
    marginVertical: hp('2.5%'),
    textAlign: "center",
  },
  userName: {
    color: Colors.primary,
    fontSize: SizeConstants.titles,
    flexWrap: 'nowrap ',
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: SizeConstants.subtitles,
    fontWeight: "bold",
    marginBottom: hp('1.25%'),
  },
  sectionSubtitle: {
    fontSize: SizeConstants.subtitles,
    marginVertical: hp('1.25%'),
    fontWeight: "bold"
  },
});

export default HomeScreen;
