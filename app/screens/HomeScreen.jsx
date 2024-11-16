import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MenuDropdown from "../components/menus/MenuDropdownComponent";
import ProfileMenuDropdown from "../components/menus/ProfileMenuDropdown";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AssignLenguaje from "../lenguage/AssignLenguage";
import SkeletonComponent from "../components/generals/SkeletonComponent";
import SizeConstants from "../utils/SizeConstants";
import Colors from "../utils/Colors";
import RoutesList from "../components/dashbord/RoutesList";
import VisitList from "../components/dashbord/VisitList";
import RecommendationsList from "../components/dashbord/RecommendationsList";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const userName = useSelector((state) => state.auth.name);
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuVisibleProfile, setMenuVisibleProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const toggleMenuProfile = () => setMenuVisibleProfile(!menuVisibleProfile);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Cargar el idioma
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
      {menuVisibleProfile && <ProfileMenuDropdown navigation={navigation} />}

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Barra de búsqueda */}
        <View style={styles.searchBar}>
          {loading ? (
            <SkeletonComponent width="100%" height={40} />
          ) : (
            <>
              <TextInput
                placeholder={textsLeng.HomeScreen.search}
                style={styles.searchInput}
              />
              <Ionicons
                name="search-outline"
                size={SizeConstants.iconsCH}
                color="black"
              />
            </>
          )}
        </View>

        <Text style={styles.welcomeText}>
          {loading ? (
            <SkeletonComponent width="50%" height={40} />
          ) : (
            <>
              {textsLeng.HomeScreen.welcomeText},{" "}
              <Text style={styles.userName}>{userName}</Text>
            </>
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {loading ? (
            <SkeletonComponent width="70%" height={30} />
          ) : (
            textsLeng.HomeScreen.sectionTitleItineraries
          )}
        </Text>

        <RoutesList loading={loading} />

        <Text style={styles.sectionSubtitle}>
          {loading ? (
            <SkeletonComponent width="70%" height={30} />
          ) : (
            textsLeng.HomeScreen.sectionSubtitleVisit
          )}
        </Text>

        <VisitList loading={loading} />

        <Text style={styles.sectionTitle}>
          {loading ? (
            <SkeletonComponent width="70%" height={30} />
          ) : (
            textsLeng.HomeScreen.sectionTitleContinue
          )}
        </Text>

        <RecommendationsList loading={loading} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    marginTop: 35,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: SizeConstants.subtitles,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: SizeConstants.titles,
    fontWeight: "bold",
    marginVertical: 20,
  },
  userName: {
    color: Colors.primary,
  },
  sectionTitle: {
    fontSize: SizeConstants.subtitles,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: SizeConstants.subtitles,
    marginVertical: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    fontSize: SizeConstants.texts,
  },
});

export default HomeScreen;