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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const userName = useSelector((state) => state.auth.name);
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    if (!menuVisible) {
      setTimeout(() => {
        setMenuVisible(false);
      }, 10000);
    }
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
        <View style={{ width: SizeConstants.iconsG }} /> 
      </View>

      {menuVisible && <MenuDropdown navigation={navigation} />}

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
        ) : (
          <VisitList loading={loading} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: wp('4%'),
    marginTop: hp('3%'),
    marginBottom: hp('3.1%'),
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
