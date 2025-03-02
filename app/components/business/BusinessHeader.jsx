import React, { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";

const BusinessHeader = ({ business }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);

    useEffect(() => {
        AssignLenguaje(dispatch);
    }, [dispatch]);

    const { BusinessHeader: texts } = textsLeng;

    return (
        <View>
            {/* Imagen de fondo */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: business.url_image }} style={styles.image} />
                <View style={styles.imageOverlay} />
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                {/* Contenido sobre la imagen sin tarjeta blanca */}
                <View style={styles.overlayContainer}>
                    <Text style={styles.title}>{business.name}</Text>
                    <Text style={styles.category}>{business.category}</Text>
                </View>
                <TouchableOpacity style={styles.itineraryButton}>
                    <Ionicons name="calendar-outline" size={SizeConstants.iconsCH} color={Colors.primary} />
                    <Text style={styles.itineraryText}>{texts.addToItinerary}</Text>
                </TouchableOpacity>
            </View>
            {/* Información debajo de la imagen */}
            <View style={styles.infoContainer}>
                <Text style={styles.description}>{business.description}</Text>
                <Text style={styles.address}>{business.address}</Text>
                <Text style={styles.phone}>{texts.phone}: {business.tel}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height: hp("40%"),
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    backButton: {
        position: "absolute",
        top: hp("5%"),
        left: wp("2.75%"),
        backgroundColor: "#fff",
        padding: wp('2.3%'),
        borderRadius: 50,
    },
    overlayContainer: {
        position: "absolute",
        bottom: 60,
        left: 20,
    },
    title: {
        fontSize: SizeConstants.titles,
        fontWeight: "bold",
        color: "white",
    },
    category: {
        fontSize: SizeConstants.textsM,
        color: "white",
        marginBottom: 5,
    },
    itineraryButton: {
        position: "absolute",
        bottom: 20,
        left: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        padding: 8,
        borderRadius: 5,
    },
    itineraryText: {
        color: "#000",
        marginLeft: 5,
    },
    infoContainer: {
        padding: 20,
        alignItems: "center",
    },
    description: {
        fontSize: SizeConstants.texts,
        textAlign: "center",
        color: "black",
        marginBottom: 10,
    },
    address: {
        fontSize: SizeConstants.subtitles,
        color: "black",
        textAlign: "center",
        marginBottom: 5,
    },
    phone: {
        fontSize: SizeConstants.textsM,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
    },
});

export default BusinessHeader;
