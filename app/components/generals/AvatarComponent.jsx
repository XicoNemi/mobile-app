import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../utils/Colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const AvatarComponent = ({ name }) => {
    const initial = name ? name.charAt(0).toUpperCase() : '?';

    return (
        <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{initial}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        width: wp('45%'),
        height: wp('45%'),
        borderRadius: wp('22.5%'),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: wp('20%'),
        fontWeight: 'bold',
    },
});

export default AvatarComponent;
