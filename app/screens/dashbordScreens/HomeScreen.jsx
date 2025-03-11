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
import NoDataComponent from "../../components/generals/NoDataComponent";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const userName = useSelector((state) => state.auth.name);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuVisibleProfile, setMenuVisibleProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [data, setData] = useState([]); // Suponiendo que los datos se almacenan en este estado
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    if (!menuVisible) {
      setTimeout(() => {
        setMenuVisible(false);
      }, 10000); 
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
    setLoading(true); // Activar el estado de carga
    dispatch(logOut());
    setTimeout(() => {
      navigation.navigate("HomeScreen");
      setTimeout(() => {
        setLoading(false); // Desactivar el estado de carga después de un tiempo
      }, 1300);
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
          onLogout={handleLogout} // Pasar la función handleLogout como prop
        />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={{ width: wp('90%'), height: hp('7%'), borderRadius: wp('3%'), overflow: 'hidden' }}>
            <SkeletonComponent width={wp('90%')} height={hp('7%')} />
          </View>) : (
          <SearchInputComponent />
        )}

        <View style={styles.welcomeTextContainer}>
          {loading ? (
            <View style={{ width: wp('90%'), height: hp('6%'), borderRadius: wp('1%'), overflow: 'hidden' }}>
              <SkeletonComponent width={wp('90%')} height={hp('6%')} />
            </View>) : (
            <Text style={styles.welcomeText}>
              {textsLeng.HomeScreen.welcomeText}{" "}
              <Text style={styles.userName}>{userName ? userName : "a XicoNemi"}</Text>
            </Text>
          )}
        </View>

        <Text style={styles.sectionTitle}>
          {loading ? (
            <SkeletonComponent width={wp('70%')} height={hp('3.75%')} />
          ) : (
            textsLeng.HomeScreen.sectionTitleItineraries
          )}
        </Text>

        <RoutesList loading={loading} />

        <Text style={styles.sectionSubtitle}>
          {loading ? (
            <SkeletonComponent width={wp('70%')} height={hp('3.75%')} />
          ) : (
            textsLeng.HomeScreen.sectionSubtitleVisit
          )}
        </Text>

        {loading ? (
          <View style={styles.skeletonVisitList}>
            {[...Array(3)].map((_, index) => (
              <SkeletonComponent
                key={index}
                width={wp('30%')}
                height={wp('30%')}
                borderRadius={wp('15%')}
                style={styles.skeletonVisitItem}
              />
            ))}
          </View>
        ) : data && data.length > 0 ? (
          <VisitList loading={loading} />
        ) : (
          <NoDataComponent />
        )}

        <Text style={styles.sectionTitle}>
          {loading ? (
            <SkeletonComponent width={wp('70%')} height={hp('3.75%')} />
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
  welcomeTextContainer: {
    alignItems: 'center',
    marginVertical: hp('2.5%'),
  },
  welcomeText: {
    fontSize: SizeConstants.titles,
    fontWeight: "bold",
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
  skeletonVisitList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3.75%'),
  },
  skeletonVisitItem: {
    marginRight: wp('5%'),
  },
});

export default HomeScreen;
