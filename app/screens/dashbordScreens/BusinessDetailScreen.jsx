import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import SizeConstants from "../../utils/SizeConstants";
import Colors from "../../utils/Colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HeaderComponent from "../../components/generals/HeaderComponent";

const BusinessDetailScreen = ({ route }) => {
    const { business } = route.params;

    return (
        <View style={styles.container}>
            <HeaderComponent title="Detalle del Negocio" />
            <ScrollView contentContainerStyle={styles.content}>
                <Image source={{ uri: business.url_image }} style={styles.image} />
                <Text style={styles.name}>{business.name}</Text>
                <Text style={styles.description}>{business.description}</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Categoría:</Text>
                    <Text style={styles.info}>{business.category}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Dirección:</Text>
                    <Text style={styles.info}>{business.address}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoTitle}>Teléfono:</Text>
                    <Text style={styles.info}>{business.tel}</Text>
                </View>
                {business.web_site && (
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Sitio Web:</Text>
                        <Text style={styles.info}>{business.web_site}</Text>
                    </View>
                )}
                {business.social_networks && (
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTitle}>Redes Sociales:</Text>
                        <Text style={styles.info}>{business.social_networks}</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    content: {
        flexGrow: 1,
        padding: wp('4%'),
    },
    image: {
        width: "100%",
        height: hp('40%'),
        borderRadius: wp('3%'),
        marginBottom: hp('2%'),
    },
    name: {
        fontSize: SizeConstants.titles,
        fontWeight: "bold",
        color: Colors.primary,
        marginBottom: hp('1%'),
        textAlign: "center",
    },
    description: {
        fontSize: SizeConstants.texts,
        color: Colors.text,
        marginBottom: hp('2%'),
        textAlign: "center",
    },
    infoContainer: {
        marginBottom: hp('1.5%'),
    },
    infoTitle: {
        fontSize: SizeConstants.subtitles,
        fontWeight: "bold",
        color: Colors.primary,
    },
    info: {
        fontSize: SizeConstants.texts,
        color: Colors.text,
    },
});

export default BusinessDetailScreen;
