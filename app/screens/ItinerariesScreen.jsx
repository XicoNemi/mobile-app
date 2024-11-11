import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import HeaderComponent from "../components/generals/HeaderComponent";
import LanguageProvider from "../lenguage/LanguageProvider";
import AssignLenguaje from "../lenguage/AssignLenguage";
import Ionicons from "react-native-vector-icons/Ionicons";
import ItineraryCardComponent from "../components/ItineraryCardComponent";
import SizeConstants from "../utils/SizeConstants";
import Colors from "../utils/Colors";

const ItinerariesScreen = () => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa);

  useEffect(() => {
    AssignLenguaje(setTextsLeng);
  }, []);

  const itineraries = [
    { title: "Itinerario 1", date: "31-Octubre-2024" },
    { title: "Itinerario 2", date: "03-Noviembre-2024" },
  ];

  const handleCreateItinerary = () => {
    // Lógica para crear un nuevo itinerario
    console.log("Crear Itinerario");
  };

  const handleViewDetail = () => {
    // Lógica para ver detalle del itinerario
    console.log("Ver detalle");
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
        <Ionicons name="add-outline" size={20} color="white" />
        <Text style={styles.createButtonText}>Crear Itinerario</Text>
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
    backgroundColor: "white",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
    margin: 15,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: SizeConstants.texts,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
});

export default ItinerariesScreen;
