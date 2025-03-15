import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";

const ReviewModal = ({ visible, onClose, rating }) => {
    const [reviewText, setReviewText] = useState("");

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>¿Qué te pareció?</Text>
                    <View style={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((index) => (
                            <Ionicons
                                key={index}
                                name={index <= rating ? "star" : "star-outline"}
                                size={32}
                                color="gold"
                            />
                        ))}
                    </View>
                    <View style={styles.ratingLabels}>
                        <Text>Malo</Text>
                        <Text>Excelente</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Cuéntanos tu experiencia"
                        value={reviewText}
                        onChangeText={setReviewText}
                        multiline
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={onClose}>
                        <Text style={styles.saveButtonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: wp("80%"),
        backgroundColor: "white",
        borderRadius: 10,
        padding: wp("5%"),
        alignItems: "center",
    },
    closeButton: {
        alignSelf: "flex-end",
    },
    title: {
        fontSize: SizeConstants.titles,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: hp("2%"),
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: hp("1%"),
    },
    ratingLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: hp("2%"),
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: hp("1%"),
        minHeight: hp("10%"),
        textAlignVertical: "top",
    },
    saveButton: {
        backgroundColor: Colors.primary,
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("10%"),
        borderRadius: 20,
        marginTop: hp("2%"),
    },
    saveButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default ReviewModal;
