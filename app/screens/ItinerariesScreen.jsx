import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../components/generals/HeaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ItineraryCardComponent from '../components/ItineraryCardComponent';
import SizeConstants from '../utils/SizeConstants';
import Colors from '../utils/Colors';
import AssignLenguaje from '../lenguage/AssignLenguage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ItinerariesScreen = () => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  const itineraries = [
    { title: "Itinerario 1", date: "31-Octubre-2024" },
    { title: "Itinerario 2", date: "03-Noviembre-2024" },
  ];

  const handleCreateItinerary = () => {
    console.log('Crear Itinerario');
  };

  const handleViewDetail = () => {
    console.log('Ver detalle');
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        title={textsLeng.ItinerariesScreen.title}
        rightIcon="person-circle-outline"
      />

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateItinerary}
      >
        <Ionicons name="add-outline" size={SizeConstants.iconsCH} color="white" />
        <Text style={styles.createButtonText}>{textsLeng.ItinerariesScreen.createButtonText}</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {itineraries.map((itinerary, index) => (
          <ItineraryCardComponent
            key={index}
            title={itinerary.title}
            date={itinerary.date}
            onPress={handleViewDetail}
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
  scrollView: {
    paddingHorizontal: wp('3.75%'),
  },
});

export default ItinerariesScreen;