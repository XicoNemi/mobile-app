import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";

// Función para convertir timestamp a fecha legible
const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${day} de ${month} ${formattedHours}:${minutes}${period}`;
};

const EventCardForBusiness = ({ event }) => {
    return (
        <View style={styles.cardContainer}>
            {/* Imagen del evento */}
            <Image source={{ uri: event.url_image || "/assets/Image.png" }} style={styles.eventImage} />

            {/* Información del evento */}
            <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.name}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
                <Text style={styles.eventDate}>{formatDate(event.startDate)}</Text>
            </View>

            {/* Botones de acción */}
            <TouchableOpacity style={styles.favoriteButton}>
                <Ionicons name="heart-outline" size={SizeConstants.iconsCH} color={Colors.eventsLight} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton}>
                <Ionicons name="add" size={SizeConstants.iconsCH} color={Colors.eventsLight} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: "row",
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        height: wp("32%"),
        width: "100%",
        padding: wp("3.2%"),
        alignItems: "center",
        position: "relative",
        marginBottom: hp("-1%"),
    },
    eventImage: {
        width: wp("27%"),
        height: wp("27%"),
        borderRadius: 10,
    },
    eventInfo: {
        flex: 1,
        marginLeft: wp("3%"),
    },
    eventTitle: {
        fontSize: SizeConstants.texts,
        fontWeight: "bold",
        marginBottom: hp("1%"),
    },
    eventDescription: {
        fontSize: SizeConstants.smallTexts,
        color: "gray",
        marginBottom: hp("1%"),
    },
    eventDate: {
        fontSize: SizeConstants.smallTexts,
        fontWeight: "bold",
    },
    favoriteButton: {
        position: "absolute",
        top: hp("1%"),
        right: wp("3%"),
    },
    addButton: {
        position: "absolute",
        bottom: hp("1%"),
        right: wp("3%"),
    },
});

export default EventCardForBusiness;
