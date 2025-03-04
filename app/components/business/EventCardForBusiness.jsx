import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";

const EventCardForBusiness = ({ event }) => {
    return (
        <View style={styles.cardContainer}>
            {/* Imagen del evento */}
            <Image source={{ uri: event.image }} style={styles.eventImage} />

            {/* Información del evento */}
            <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDescription}>{event.description}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
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
        padding: wp("3.6%"),
        alignItems: "center",
        position: "relative",
        marginBottom: hp("-1%"),
    },
    eventImage: {
        width: wp("21%"),
        height: wp("21%"),
        borderRadius: 10,
    },
    eventInfo: {
        flex: 1,
        marginLeft: wp("3%"),
    },
    eventTitle: {
        fontSize: SizeConstants.textsM,
        fontWeight: "bold",
        marginBottom: hp("1%"),
    },
    eventDescription: {
        fontSize: SizeConstants.texts,
        color: "gray",
        marginBottom: hp("1%"),
    },
    eventDate: {
        fontSize: SizeConstants.texts,
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
