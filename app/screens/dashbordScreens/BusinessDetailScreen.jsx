import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import BusinessHeader from "../../components/business/BusinessHeader";
import EventListFooter from "../../components/business/EventListFooter";

const BusinessDetailScreen = ({ route }) => {
    const { business } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BusinessHeader business={business} />
            <EventListFooter />
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
