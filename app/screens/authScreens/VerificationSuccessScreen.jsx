import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/Colors';
import SizeConstants from '../../utils/SizeConstants';

const VerificationSuccessScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Has registrado tu cuenta exitosamente!</Text>
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate('LoginScreen')}
            >
                <Text style={styles.buttonText}>Ir a Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    title: {
        fontSize: SizeConstants.titles,
        fontWeight: 'bold',
        color: Colors.primaryText,
        textAlign: 'center',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: SizeConstants.texts,
        fontWeight: 'bold',
    },
});

export default VerificationSuccessScreen;
