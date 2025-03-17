import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/Colors';
import SizeConstants from '../../utils/SizeConstants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import CustomAlertComponent from '../generals/CustomAlertComponent';
import { useNavigation } from '@react-navigation/native';

const EventsCardComponent = ({ name, description, url_image, onAddPress }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const userName = useSelector((state) => state.auth.name);
    const textsLeng = useSelector((state) => state.language.texts);
    const navigation = useNavigation();

    const handleBookmarkToggle = () => {
        if (!userName) {
            setAlertVisible(true);
        } else {
            setIsBookmarked(!isBookmarked);
        }
    };

    return (
        <>
            <View style={styles.cardContainer}>
                <Image source={{ uri: url_image }} style={styles.image} />
                <TouchableOpacity style={styles.saveButton} onPress={handleBookmarkToggle}>
                    <Ionicons
                        name={isBookmarked ? "heart" : "heart-outline"}
                        size={SizeConstants.iconsCH}
                        color={isBookmarked ? Colors.events : Colors.events}
                    />
                </TouchableOpacity>
                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={1}>{name}</Text>
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                    <Ionicons name="add" size={SizeConstants.iconsCH} color="white" />
                </TouchableOpacity>
            </View>

            <CustomAlertComponent
                isVisible={alertVisible}
                onClose={() => setAlertVisible(false)}
                title={textsLeng.CustomAlertComponent.accessRequired}
                message={textsLeng.AddFavorites.addToFavoritesMessage}
                primaryButton={{
                    text: textsLeng.CustomAlertComponent.loginButton,
                    onPress: () => {
                        setAlertVisible(false);
                        navigation.navigate("LoginScreen");
                    },
                }}
                secondaryButton={{
                    text: textsLeng.CustomAlertComponent.cancelButton,
                    onPress: () => setAlertVisible(false),
                }}
            />
        </>
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
        color: Colors.events,
        marginBottom: hp('0.5%'),
        flexWrap: 'nowrap',
    },
    description: {
        fontSize: SizeConstants.texts,
        flexWrap: 'nowrap',
        color: 'gray',
    },
    addButton: {
        backgroundColor: Colors.events,
        borderRadius: wp('3%'),
        padding: wp('1.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: hp('1.2%'),
        right: wp('2%'),
    },
});

export default EventsCardComponent;
