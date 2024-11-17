import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../utils/Colors";
import SizeConstants from "../utils/SizeConstants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ItineraryCardComponent = ({ title, date, onPress }) => {
  return (
    <View style={styles.container}>
      {/* Header: Título y Fecha*/}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      {/* Tarjeta principal */}
      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.iconPlaceholder}>
            <Ionicons name="shapes-outline" size={SizeConstants.iconsXG} color="gray" />
          </View>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Ver detalle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: hp('1.25%'),
    marginTop: hp('2.5%'),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp('7.5%'),
    marginBottom: hp('1.875%'),
  },
  title: {
    fontSize: SizeConstants.subtitles,
    fontWeight: "bold",
    color: Colors.primary,
  },
  date: {
    fontSize: SizeConstants.texts,
    color: "gray",
  },
  card: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: wp('3.75%'),
    padding: wp('5%'),
    marginHorizontal: wp('5%'),
  },
  content: {
    alignItems: "center",
    marginVertical: hp('1.25%'),
  },
  iconPlaceholder: {
    width: wp('67.5%'),
    height: hp('16.25%'),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: wp('2.5%'),
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('3.75%'),
    marginTop: hp('1.25%'),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: SizeConstants.texts,
  },
});

export default ItineraryCardComponent;