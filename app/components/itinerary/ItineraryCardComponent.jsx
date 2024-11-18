import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from 'react-redux';
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ItineraryCardComponent = ({ title, date, days, onPress, image, style }) => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  return (
    <View style={[styles.cardContainer, style]}>
      {/* Imagen de la tarjeta */}
      <Image
        source={image}
        style={styles.image}
      />
      {/* Contenido de texto */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.date} numberOfLines={1}>{date}</Text>
        <View style={styles.daysContainer}>
          <Ionicons name="time-outline" size={wp('5%')} color={Colors.primary} />
          <Text style={styles.daysText}>{days}</Text>
        </View>
      </View>
      {/* Botón de detalle */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{textsLeng.ItinerariesScreen.details}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: wp('4%'),
    padding: wp('2.5%'),
    marginBottom: hp('0.7%'),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
    width: wp('92%'),
    height: hp('20%'),
  },
  image: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('4%'),
    marginRight: wp('3%'),
  },
  content: {
    flex: 1,
    justifyContent: "center",
    marginRight: wp('4%'),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: SizeConstants.subtitles,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: hp('0.5%'),
    flexWrap: 'nowrap',
  },
  date: {
    fontSize: wp('4%'),
    color: "gray",
    marginBottom: hp('0.5%'),
    flexWrap: 'nowrap',
  },
  daysContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp('1%'),
  },
  daysText: {
    marginLeft: wp('1%'),
    fontSize: wp('4%'),
    color: "gray",
  },
  button: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: hp('1.2%'), // Ajusta el tamaño
    paddingHorizontal: wp('4%'),
    borderRadius: wp('4%'),
    position: 'absolute',
    right: wp('2%'),
    top: hp('13%'), // Alinea el botón a la altura de daysContainer
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp('4%'),
  },
});

export default ItineraryCardComponent;
