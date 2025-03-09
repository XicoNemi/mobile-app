import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";
import BusinessHeader from "../../components/business/BusinessHeader";
import EventListFooter from "../../components/business/EventListFooter";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SkeletonComponent from "../../components/generals/SkeletonComponent"; // Importar SkeletonComponent
import Colors from "../../utils/Colors"; // Importar Colors
import api from "../../utils/Api";

const BusinessDetailScreen = ({ route }) => {
    const { business } = route.params;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.getEventsByBusiness(business.id, token);
                setEvents(response);
            } catch (error) {
                // Manejar el error
            } finally {
                setTimeout(() => {
                    setLoading(false); // Finalizar carga después de 5 segundos
                }, 15000);
            }
        };

        fetchEvents();
    }, [business.id, token]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BusinessHeader business={business} />
            {loading ? (
                <View style={styles.skeletonContainer}>
                    <View style={styles.skeletonWrapper}>
                        <SkeletonComponent />
                    </View>
                    <View style={styles.skeletonWrapper}>
                        <SkeletonComponent />
                    </View>
                    <View style={styles.skeletonWrapperBottom}>
                        <SkeletonComponent />
                    </View>
                </View>
            ) : (
                events.length > 0 ? (
                    <EventListFooter events={events} />
                ) : (
                    <Text style={styles.noEventsText}>Por el momento {business.name} no tiene eventos disponibles</Text>
                )
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "white",
    },
    skeletonContainer: {
        alignItems: 'center',
        marginTop: hp('9%'),

    },
    skeletonWrapper: {
        width: wp('90%'),
        height: hp('20%'),
        borderRadius: wp('2.5%'),
        overflow: 'hidden',
        marginTop: hp('-2%'),
    },
    skeletonWrapperBottom: {
        width: wp('90%'),
        height: hp('6%'),
        borderRadius: wp('5%'),
        overflow: 'hidden',
        marginTop: hp('-1%'),
    },
    noEventsText: {
        textAlign: "center",
        color: Colors.primary,
        fontSize: 16,
        marginTop: hp('2%'),
    },
});

export default BusinessDetailScreen;
