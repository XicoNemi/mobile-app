import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import SizeConstants from '../../utils/SizeConstants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TourismCardComponent = ({ title, description, image, rating, onPress }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmarkToggle = () => {
        setIsBookmarked(!isBookmarked);
    };

    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
            <Image source={image} style={styles.image} />
            <View style={styles.ratingContainer}>
                {[...Array(5)].map((_, index) => {
                    const isHalfStar = rating - index === 0.5;
                    return (
                        <Ionicons
                            key={index}
                            name={isHalfStar ? "star-half" : index < rating ? "star" : "star-outline"}
                            size={SizeConstants.iconsCH}
                            color={Colors.star}
                        />
                    );
                })}
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleBookmarkToggle}>
                <Ionicons
                    name={isBookmarked ? "heart" : "heart-outline"}
                    size={SizeConstants.iconsCH}
                    color={isBookmarked ? Colors.primary : Colors.primary}
                />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.description} numberOfLines={2}>{description}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add button pressed')}>
                <Ionicons name="add" size={SizeConstants.iconsCH} color="white" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: wp('2.5%'),
        padding: wp('3%'),
        marginBottom: hp('2%'),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
        width: wp('90%'),
        height: hp('35.8%'),
        alignSelf: 'center',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: hp('20%'),
        borderRadius: wp('5%'),
        marginBottom: hp('1%'),
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: hp('1%'),
    },
    saveButton: {
        position: 'absolute',
        top: wp('5%'),
        right: wp('5%'),
        backgroundColor: "#d9d9d9",
        borderRadius: wp('50%'),
        padding: wp('2.2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'flex-start',
        marginBottom: hp('1%'),
    },
    title: {
        fontSize: SizeConstants.textsM,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: hp('0.5%'),
        flexWrap: 'nowrap',
    },
    description: {
        fontSize: SizeConstants.texts,
        flexWrap: 'nowrap',
        color: 'gray',
    },
    addButton: {
        backgroundColor: Colors.primary,
        borderRadius: wp('3%'),
        padding: wp('1.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: hp('1.2%'),
        right: wp('2%'),
    },
});

export default TourismCardComponent;
