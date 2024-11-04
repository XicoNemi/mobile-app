import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../utils/Colors";
import SizeConstants from "../utils/SizeConstants";

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
            <Ionicons name="shapes-outline" size={50} color="gray" />
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
    marginVertical: 10,
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    marginBottom: 15,
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
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
  },
  content: {
    alignItems: "center",
    marginVertical: 10,
  },
  iconPlaceholder: {
    width: 270,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ItineraryCardComponent;
