import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EventCard from "./EventCardForBusiness";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";

const events = [
    {
        id: 1,
        title: "San Valentín y Mucho Rock",
        description: "Ven y festeja con tu pareja y amigos este 14 de febrero. Artista en vivo: BLACK PISTOLS",
        date: "14 de Febrero 9:00PM",
        image: "https://example.com/event1.jpg",
    },
    {
        id: 2,
        title: "Festival de Jazz Nocturno",
        description: "Una noche mágica con los mejores exponentes del jazz en vivo.",
        date: "20 de Marzo 8:00PM",
        image: "https://example.com/event2.jpg",
    },
    {
        id: 3,
        title: "Feria Gastronómica Internacional",
        description: "Degusta platillos de todo el mundo en un solo lugar.",
        date: "5 de Abril 12:00PM",
        image: "https://example.com/event3.jpg",
    },
];

const EventListFooter = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Próximos Eventos</Text>
                <TouchableOpacity>
                    <Text style={styles.arrow}>→</Text>
                </TouchableOpacity>
            </View>

            {events.map((event) => (
                <View key={event.id}>
                    <EventCard event={event} />
                    <View style={styles.separator} />
                </View>
            ))}

            <TouchableOpacity style={styles.viewMoreButton}>
                <Text style={styles.viewMoreText}>Ver más eventos</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: wp("5%"),
        backgroundColor: "#FFF",
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: hp("2%"),
    },
    headerText: {
        fontSize: SizeConstants.titles,
        fontWeight: "bold",
    },
    arrow: {
        fontSize: SizeConstants.titles,
        color: Colors.primary,
    },
    separator: {
        height: hp("2%"),
    },
    viewMoreButton: {
        marginTop: hp("2%"),
        paddingVertical: hp("1.5%"),
        backgroundColor: Colors.primary,
        borderRadius: 10,
        alignItems: "center",
    },
    viewMoreText: {
        color: "white",
        fontSize: SizeConstants.texts,
        fontWeight: "bold",
    },
});

export default EventListFooter;
