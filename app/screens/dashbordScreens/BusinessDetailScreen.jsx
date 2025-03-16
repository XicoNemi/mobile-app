import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import { useSelector } from "react-redux";
import BusinessHeader from "../../components/business/BusinessHeader";
import EventListFooter from "../../components/business/EventListFooter";
import ReviewsComponent from "../../components/business/ReviewsComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SkeletonComponent from "../../components/generals/SkeletonComponent";
import api from "../../utils/Api";
import Colors from "../../utils/Colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

const BusinessDetailScreen = ({ route }) => {
    const { business } = route.params;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state) => state.auth.token);
    const scrollY = new Animated.Value(0);

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
        <Animated.ScrollView
            contentContainerStyle={styles.container}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
        >
            <BusinessHeader business={business} scrollY={scrollY} />
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
                    <View style={styles.noEventsContainer}>
                        <Ionicons name="calendar-outline" size={50} color={Colors.primary} />
                        <Text style={styles.noEventsText}>Por el momento {business.name} no tiene eventos para ti</Text>
                    </View>
                )
            )}
            <ReviewsComponent />
        </Animated.ScrollView>
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
    },
    noEventsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%'),
        padding: wp('5%'),
    },
    noEventsText: {
        fontSize: wp('4%'),
        color: Colors.primary,
        textAlign: 'center',
        marginTop: hp('1%'),
    },
});

export default BusinessDetailScreen;
