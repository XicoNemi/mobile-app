import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import SizeConstants from '../../utils/SizeConstants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AccommodationCardComponent = ({ title, description, image, onPress }) => {
    return (
        <View style={styles.cardContainer}>
            <Image source={image} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.description} numberOfLines={2}>{description}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={onPress}>
                <Ionicons name="add" size={SizeConstants.iconsCH} color="white" />
            </TouchableOpacity>
        </View>
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
    content: {
        alignItems: 'flex-start',
        marginBottom: hp('1%'),
    },
    title: {
        fontSize: SizeConstants.textsM,
        fontWeight: 'bold',
        color: Colors.accommodation,
        marginBottom: hp('0.5%'),
        flexWrap: 'nowrap',
    },
    description: {
        fontSize: SizeConstants.texts,
        flexWrap: 'nowrap',
        color: 'gray',
    },
    addButton: {
        backgroundColor: Colors.accommodation,
        borderRadius: wp('3%'),
        padding: wp('2.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: hp('1.2%'),
        right: wp('3.5%'),
    },
});


export default AccommodationCardComponent;