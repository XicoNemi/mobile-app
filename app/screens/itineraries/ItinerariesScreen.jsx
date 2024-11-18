import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../components/generals/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItineraryCardComponent from '../../components/itinerary/ItineraryCardComponent';
import SizeConstants from '../../utils/SizeConstants';
import Colors from '../../utils/Colors';
import AssignLenguaje from '../../lenguage/AssignLenguage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const ItinerariesScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const textsLeng = useSelector((state) => state.language.texts);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  const itineraries = [
    {
      title: "Participacion XicoBike",
      date: "Lun., 25 de nov - Vie., 29 de nov. ",
      days: "5 días, en 19 días",
      image: require('../../../assets/background.png'),
    },
    {
      title: "Visita a Xico",
      date: "Lun., 25 de nov - Vie., 29 de nov.",
      days: "3 días, en 22 días",
      image: require('../../../assets/route2.jpg'),
    },
    {
      title: "Recorrido por la ciudad",
      date: "Lun., 25 de nov - Vie., 29 de nov.",
      days: "2 días, en 25 días",
      image: require('../../../assets/visit2.webp'),
    },
    {
      title: "Tour por la ciudad",
      date: "Lun., 25 de nov - Vie., 29 de nov.",
      days: "4 días, en 30 días",
      image: require('../../../assets/visit1.jpeg'),
    },
  ];

  const handleCreateItinerary = () => {
    navigation.navigate('CreateItinerariesScreen');
  };

  const handleViewDetail = (itinerary) => {
    navigation.navigate('ItineraryDetailScreen', { itinerary });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        title={textsLeng.ItinerariesScreen.title}
        rightIcon="person-circle-outline"
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateItinerary}
        >
          <Ionicons name="add-outline" size={SizeConstants.iconsCH} color="white" />
          <Text style={styles.createButtonText}>{textsLeng.ItinerariesScreen.createButtonText}</Text>
        </TouchableOpacity>

        <Text style={styles.message}>{textsLeng.ItinerariesScreen.message}</Text>

        {itineraries.map((itinerary, index) => (
          <ItineraryCardComponent
            key={index}
            title={itinerary.title}
            date={itinerary.date}
            days={itinerary.days}
            image={itinerary.image}
            onPress={() => handleViewDetail(itinerary)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: hp('1.25%'),
    borderRadius: wp('2.5%'),
    alignSelf: 'flex-end',
    margin: wp('3.75%'),
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: wp('1.25%'),
    fontSize: SizeConstants.texts,
  },
  message: {
    color: "#000",
    fontSize: SizeConstants.subtitles,
    marginBottom: hp('2%'),
    fontWeight: 'bold',
  },
  scrollView: {
    paddingHorizontal: wp('3.75%'),
  },
});

export default ItinerariesScreen;