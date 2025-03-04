import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EventCard from "./EventCardForBusiness";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";

const events = [
    {
        id: 1,
        title: "San Valentín y Mucho Rock",
        description: "Ven y festeja con tu pareja y amigos este 14 de febrero. Artista en vivo: BLACK PISTOLS",
        date: "14 de Febrero 9:00PM",
        image: "https://raw.githubusercontent.com/XicoNemi/mobile-app/refs/heads/feature/update-app/assets/Image.png",
    },
    {
        id: 2,
        title: "Festival de Jazz Nocturno",
        description: "Una noche mágica con los mejores exponentes del jazz en vivo.",
        date: "20 de Marzo 8:00PM",
        image: "https://raw.githubusercontent.com/XicoNemi/mobile-app/refs/heads/feature/update-app/assets/Image.png",
    },
    {
        id: 3,
        title: "Feria Gastronómica Internacional",
        description: "Degusta platillos de todo el mundo en un solo lugar.",
        date: "5 de Abril 12:00PM",
        image: "https://raw.githubusercontent.com/XicoNemi/mobile-app/refs/heads/feature/update-app/assets/Image.png",
    },
];

const EventListFooter = () => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const [visibleEvents, setVisibleEvents] = useState(2);

    useEffect(() => {
        AssignLenguaje(dispatch);
    }, [dispatch]);

    const { EventListFooter: texts } = textsLeng;

    const handleViewMore = () => {
        if (visibleEvents >= events.length) {
            setVisibleEvents(2);
        } else {
            setVisibleEvents((prev) => prev + 2);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{texts.upcomingEvents}</Text>
                <TouchableOpacity>
                    <Text style={styles.arrow}>→</Text>
                </TouchableOpacity>
            </View>

            {events.slice(0, visibleEvents).map((event) => (
                <View key={event.id}>
                    <EventCard event={event} />
                    <View style={styles.separator} />
                </View>
            ))}

            <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
                <Text style={styles.viewMoreText}>
                    {visibleEvents >= events.length ? texts.viewLessEvents : texts.viewMoreEvents}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: hp("-3%"),
        padding: wp("3%"),
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
        fontSize: SizeConstants.iconsXG,
        color: Colors.eventsLight,
    },
    separator: {
        height: hp("2%"),
    },
    viewMoreButton: {
        marginTop: hp("2%"),
        paddingVertical: hp("1.5%"),
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: Colors.eventsLight,
        borderRadius: 20,
        alignItems: "center",
        marginTop: hp("1%"),
    },
    viewMoreText: {
        color: Colors.eventsLight,
        fontSize: SizeConstants.texts,
        fontWeight: "bold",
    },
});

export default EventListFooter;
