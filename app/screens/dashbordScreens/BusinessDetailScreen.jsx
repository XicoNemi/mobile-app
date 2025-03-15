import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";
import BusinessHeader from "../../components/business/BusinessHeader";
import EventListFooter from "../../components/business/EventListFooter";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SkeletonComponent from "../../components/generals/SkeletonComponent";
import api from "../../utils/Api";
import NoDataComponent from "../../components/generals/NoDataComponent";

const BusinessDetailScreen = ({ route }) => {
    const { business } = route.params;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.getEventsByBusiness(business.id);
                setEvents(response);
            } catch (error) {
                // Manejar el error
            } finally {
                setTimeout(() => {
                    setLoading(false); 
                }, 3000);
            }
        };

        fetchEvents();
    }, [business.id]);

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
                    <NoDataComponent />
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
        marginTop: hp('7%'),

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
        marginBottom: hp('1.6%'),
    }
});

export default BusinessDetailScreen;
