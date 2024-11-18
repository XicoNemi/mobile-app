import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../components/generals/HeaderComponent';
import AssignLenguaje from '../../lenguage/AssignLenguage';

const ItineraryDetailScreen = () => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);

    useEffect(() => {
        AssignLenguaje(dispatch);
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <HeaderComponent title={textsLeng.ItinerariesScreen.itinerariesDetail} rightIcon='person-circle-outline' />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});

export default ItineraryDetailScreen;