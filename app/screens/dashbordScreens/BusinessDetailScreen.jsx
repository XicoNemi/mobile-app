import React from "react";
import { View, StyleSheet } from "react-native";
import BusinessHeader from "../../components/business/BusinessHeader";

const BusinessDetailScreen = ({ route }) => {
    const { business } = route.params;

    return (
        <View style={styles.container}>
            <BusinessHeader business={business} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});

export default BusinessDetailScreen;
