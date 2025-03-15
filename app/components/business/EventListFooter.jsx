import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EventCard from "./EventCardForBusiness";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";

const EventListFooter = ({ events }) => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const [visibleEvents, setVisibleEvents] = useState(2);
    const [expanded, setExpanded] = useState(true);

    useEffect(() => {
        AssignLenguaje(dispatch);
    }, [dispatch]);

    const { EventListFooter: texts } = textsLeng;

    const handleToggleAccordion = () => {
        setExpanded(!expanded);
    };

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
                <TouchableOpacity onPress={handleToggleAccordion}>
                    <Ionicons 
                        name={expanded ? "chevron-up-outline" : "chevron-down-outline"} 
                        size={SizeConstants.iconsXG} 
                        color={Colors.eventsLight} 
                    />
                </TouchableOpacity>
            </View>

            {expanded && (
                <>
                    {events.slice(0, visibleEvents).map((event) => (
                        <View key={event.event.id}>
                            <EventCard event={event.event} />
                            <View style={styles.separator} />
                        </View>
                    ))}
                    <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
                        <Text style={styles.viewMoreText}>
                            {visibleEvents >= events.length ? texts.viewLessEvents : texts.viewMoreEvents}
                        </Text>
                    </TouchableOpacity>
                </>
            )}
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
        color: Colors.primary,
        fontSize: SizeConstants.texts,
        fontWeight: "bold",
    },
});

export default EventListFooter;
