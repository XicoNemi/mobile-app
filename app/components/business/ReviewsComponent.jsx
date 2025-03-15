import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";

const ReviewsComponent = () => {
    const [expanded, setExpanded] = useState(true);
    const [rating, setRating] = useState(0);

    const reviews = [
        { rating: 5, text: "¡Excelente servicio!" },
        { rating: 4, text: "Muy bueno, pero puede mejorar." },
        { rating: 3, text: "Aceptable, pero esperaba más." }
    ];

    const toggleAccordion = () => setExpanded(!expanded);

    const handleRating = (value) => setRating(value);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Qué te pareció?</Text>
            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <TouchableOpacity key={index} onPress={() => handleRating(index)}>
                        <Ionicons
                            name={index <= rating ? "star" : "star-outline"}
                            size={SizeConstants.iconsG}
                            color="gold"
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.ratingLabels}>
                <Text>Malo</Text>
                <Text>Excelente</Text>
            </View>

            <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
                <Text style={styles.headerText}>Reseñas</Text>
                <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={SizeConstants.iconsCH} color="black" />
            </TouchableOpacity>

            {expanded && (
                <View style={styles.reviewsContainer}>
                    {reviews.slice(0, 2).map((review, index) => (
                        <View key={index} style={styles.reviewItem}>
                            <View style={styles.reviewRatingContainer}>
                                {[...Array(5)].map((_, starIndex) => (
                                    <Ionicons
                                        key={starIndex}
                                        name={starIndex < review.rating ? "star" : "star-outline"}
                                        size={SizeConstants.iconsCH}
                                        color="gold"
                                    />
                                ))}
                            </View>
                            <Text>{review.text}</Text>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.viewMoreButton}>
                        <Text style={styles.viewMoreText}>Ver más reseñas</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: wp("4%"),
        backgroundColor: "#F8F4F9",
        borderRadius: 10,
    },
    title: {
        fontSize: SizeConstants.titles,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: hp("1%"),
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "center", // Mantener centrado
        marginBottom: hp("1%"),
    },
    reviewRatingContainer: {
        flexDirection: "row",
        justifyContent: "flex-start", // Alinear al inicio
        marginBottom: hp("1%"),
    },
    ratingLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: hp("2%"),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: hp("1%"),
    },
    headerText: {
        fontSize: SizeConstants.texts,
        fontWeight: "bold",
    },
    reviewsContainer: {
        marginTop: hp("1%"),
    },
    reviewItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: hp("1%"),
    },
    viewMoreButton: {
        marginTop: hp("2%"),
        paddingVertical: hp("1.5%"),
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 20,
        alignItems: "center",
    },
    viewMoreText: {
        color: Colors.primary,
        fontSize: SizeConstants.texts,
        fontWeight: "bold",
    },
});

export default ReviewsComponent;
