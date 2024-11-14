import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
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

const HomeScreen = () => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
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
            textsLeng.HomeScreen.welcomeText
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {loading ? (
            <SkeletonComponent width="70%" height={30} />
          ) : (
            textsLeng.HomeScreen.sectionTitleItineraries
          )}
        </Text>

        <FlatList
          horizontal
          data={loading ? [1, 2, 3] : [1, 2, 3]} // Mantener el mismo número de elementos para la carga
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <View style={styles.itineraryBox}>
              {loading ? (
                <SkeletonComponent width={250} height={200} />
              ) : (
                <Text style={styles.itineraryText}>
                  {textsLeng.HomeScreen.itineraryText} {item}
                </Text>
              )}
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.itineraryList}
        />

        <Text style={styles.sectionSubtitle}>
          {loading ? (
            <SkeletonComponent width="70%" height={30} />
          ) : (
            textsLeng.HomeScreen.sectionSubtitleVisit
          )}
        </Text>

        <FlatList
          horizontal
          data={loading ? [1, 2, 3, 4] : [1, 2, 3, 4]}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <View style={styles.visitBox}>
              {loading ? (
                <SkeletonComponent width={120} height={120} borderRadius={90} />
              ) : (
                <>
                  <Ionicons
                    name="beer-outline"
                    size={SizeConstants.iconsM}
                    color="black"
                  />
                  <Text style={styles.visitText}>Mr Cheve</Text>
                </>
              )}
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.visitList}
        />

        <Text style={styles.sectionTitle}>
          {loading ? (
            <SkeletonComponent width="70%" height={30} />
          ) : (
            textsLeng.HomeScreen.sectionTitleContinue
          )}
        </Text>

        <FlatList
          horizontal
          data={loading ? [1, 2, 3] : [1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <View style={styles.continueBox}>
              {loading ? (
                <SkeletonComponent width={200} height={150} />
              ) : (
                <>
                  <View style={styles.itineraryBoxSmall} />
                  <Text style={styles.continueText}>
                    {textsLeng.HomeScreen.continueText} {item}
                  </Text>
                </>
              )}
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.itineraryList}
        />
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
  sectionTitle: {
    fontSize: SizeConstants.subtitles,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itineraryList: {
    marginBottom: 20,
  },
  itineraryBox: {
    width: 250,
    height: 200,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  itineraryText: {
    fontSize: SizeConstants.texts,
  },
  sectionSubtitle: {
    fontSize: SizeConstants.subtitles,
    marginVertical: 10,
  },
  visitList: {
    marginBottom: 20,
  },
  visitBox: {
    width: 120,
    height: 120,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 90,
    marginRight: 10,
  },
  visitText: {
    marginTop: 5,
    fontSize: SizeConstants.texts,
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
  continueBox: {
    alignItems: "center",
    marginRight: 10,
  },
  itineraryBoxSmall: {
    width: 200,
    height: 150,
    backgroundColor: "#d0d0d0",
    borderRadius: 10,
  },
  continueText: {
    marginTop: 8,
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
});

export default HomeScreen;