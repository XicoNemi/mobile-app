import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import { useSelector, useDispatch } from "react-redux";
import CustomAlertComponent from "../generals/CustomAlertComponent";
import { useNavigation } from "@react-navigation/native";
import ReviewModal from "./ReviewModal";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import api from "../../utils/Api";

const ReviewsComponent = ({ businessId }) => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const [expanded, setExpanded] = useState(true);
    const [rating, setRating] = useState(0);
    const [visibleReviews, setVisibleReviews] = useState(2);
    const [alertVisible, setAlertVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const userName = useSelector((state) => state.auth.name);
    const navigation = useNavigation();

    useEffect(() => {
        AssignLenguaje(dispatch);
    }, [dispatch]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await api.getReviewsByBusiness(businessId);
                setReviews(response);
            } catch (error) {
            } finally {
                setLoadingReviews(false);
            }
        };

        fetchReviews();
    }, [businessId]);

    const { ReviewsComponent: texts } = textsLeng;

    const toggleAccordion = () => setExpanded(!expanded);

    const handleRating = (value) => {
        if (!userName) {
            setAlertVisible(true);
            return;
        }
        setRating(value);
        setModalVisible(true);
    };

    const handleViewMore = () => setVisibleReviews(visibleReviews + 2);

    const handleViewLess = () => setVisibleReviews(Math.max(2, visibleReviews - 2));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{texts.whatDidYouThink}</Text>
            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <TouchableOpacity key={index} onPress={() => handleRating(index)}>
                        <Ionicons
                            name={index <= rating ? "star" : "star-outline"}
                            size={SizeConstants.iconsG}
                            color={Colors.star}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.ratingLabels}>
                <Text style={styles.ratingLabel}>{texts.bad}</Text>
                <Text style={styles.ratingLabel}>{texts.excellent}</Text>
            </View>

            <TouchableOpacity style={styles.header} onPress={toggleAccordion}>
                <Text style={styles.headerText}>{texts.title}</Text>
                <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={SizeConstants.iconsCH} color="black" />
            </TouchableOpacity>

            {expanded && (
                <View style={styles.reviewsContainer}>
                    {loadingReviews ? (
                        <Text>{texts.loadingReviews}</Text>
                    ) : reviews.length > 0 ? (
                        <View style={styles.reviewsContainer}>
                            {reviews.slice(0, visibleReviews).map((review, index) => (
                                <View key={index} style={styles.reviewItem}>
                                    <View style={styles.reviewRatingContainer}>
                                        {[...Array(5)].map((_, starIndex) => (
                                            <Ionicons
                                                key={starIndex}
                                                name={starIndex < Math.round(review.rating) ? "star" : "star-outline"}
                                                size={SizeConstants.iconsCH}
                                                color={Colors.star}
                                            />
                                        ))}
                                    </View>
                                    <Text>{review.comment}</Text>
                                </View>
                            ))}
                            {visibleReviews < reviews.length && (
                                <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
                                    <Text style={styles.viewMoreText}>{texts.viewMoreReviews}</Text>
                                </TouchableOpacity>
                            )}
                            {visibleReviews > 2 && (
                                <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewLess}>
                                    <Text style={styles.viewMoreText}>{texts.viewLessReviews}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ) : (
                        <View style={styles.noEventsContainer}>
                            <Ionicons name="chatbubble-ellipses-outline" size={50} color={Colors.primary} />
                            <Text style={styles.noEventsText}>{texts.noReviewsMessage}</Text>
                        </View>
                    )}
                </View>
            )}

            <CustomAlertComponent
                isVisible={alertVisible}
                onClose={() => setAlertVisible(false)}
                title={texts.accessRequired}
                message={texts.accessMessage}
                primaryButton={{
                    text: texts.loginButton,
                    onPress: () => {
                        setAlertVisible(false);
                        navigation.navigate("LoginScreen");
                    },
                }}
                secondaryButton={{
                    text: texts.cancelButton,
                    onPress: () => setAlertVisible(false),
                }}
            />

            <ReviewModal visible={modalVisible} onClose={() => setModalVisible(false)} rating={rating} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: wp("4%"),
        backgroundColor: "white",
        borderRadius: 10,
    },
    title: {
        fontSize: SizeConstants.textsM,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: hp("1%"),
    },
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: hp("1%"),
    },
    reviewRatingContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: hp("1%"),
    },
    ratingLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: hp("2%"),
    },
    ratingLabel: {
        flex: 1,
        textAlign: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: hp("1%"),
    },
    headerText: {
        fontSize: SizeConstants.titles,
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
        borderColor: Colors.eventsLight,
        borderRadius: 20,
        alignItems: "center",
    },
    viewMoreText: {
        color: Colors.primary,
        fontSize: SizeConstants.texts,
        fontWeight: "bold",
    },
    noEventsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1%'),
        padding: wp('5%'),
    },
    noEventsText: {
        fontSize: SizeConstants.texts,
        color: Colors.primary,
        textAlign: 'center',
        marginTop: hp('1%'),
    },
});

export default ReviewsComponent;
