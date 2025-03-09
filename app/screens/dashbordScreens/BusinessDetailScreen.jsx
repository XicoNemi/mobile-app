import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import BusinessHeader from "../../components/business/BusinessHeader";
import EventListFooter from "../../components/business/EventListFooter";
import api from "../../utils/Api";

const BusinessDetailScreen = ({ route }) => {
    const { business } = route.params;
    const [events, setEvents] = useState([]);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.getEventsByBusiness(business.id, token);
                setEvents(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, [business.id, token]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BusinessHeader business={business} />
            <EventListFooter events={events} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "white",
    },
});

export default BusinessDetailScreen;
