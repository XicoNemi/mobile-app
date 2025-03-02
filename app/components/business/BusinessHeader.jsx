import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/Colors";

const BusinessHeader = ({ business }) => {
    const navigation = useNavigation();

    return (
        <View>
            {/* Imagen de fondo */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: business.url_image }} style={styles.image} />
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                {/* Contenido sobre la imagen sin tarjeta blanca */}
                <View style={styles.overlayContainer}>
                    <Text style={styles.title}>{business.name}</Text>
                    <Text style={styles.category}>{business.category}</Text>
                </View>
                <TouchableOpacity style={styles.itineraryButton}>
                    <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
                    <Text style={styles.itineraryText}>Agregar a mi itinerario</Text>
                </TouchableOpacity>
            </View>
            {/* Información debajo de la imagen */}
            <View style={styles.infoContainer}>
                <Text style={styles.description}>{business.description}</Text>
                <Text style={styles.address}>{business.address}</Text>
                <Text style={styles.phone}>Teléfono: {business.tel}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height: hp("40%"),
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    backButton: {
        position: "absolute",
        top: hp("5%"),
        left: wp("5%"),
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 50,
    },
    overlayContainer: {
        position: "absolute",
        bottom: 60,
        left: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
    },
    category: {
        fontSize: 16,
        color: "white",
    },
    itineraryButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 8,
        borderRadius: 5,
    },
    itineraryText: {
        color: "#000",
        marginLeft: 5,
    },
    infoContainer: {
        padding: 20,
        alignItems: "center",
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        color: "black",
        marginBottom: 10,
    },
    address: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        marginBottom: 5,
    },
    phone: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
    },
});

export default BusinessHeader;
