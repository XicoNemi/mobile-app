import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../../components/generals/HeaderComponent';
import AccomodationCardComponent from '../../../components/dashbord/AccomodationCardComponent';
import SearchInputComponent from '../../../components/generals/SearchInputComponent';
import AssignLenguaje from '../../../lenguage/AssignLenguage';
import SizeConstants from '../../../utils/SizeConstants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AccommodationScreen = () => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);

    useEffect(() => {
        AssignLenguaje(dispatch);
    }, [dispatch]);

    const hospedajes = [
        {
            id: '1',
            title: 'Hotel Villa de Cortez',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/hotel1.jpg'),
        },
        {
            id: '2',
            title: 'Hotel Casablanca',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/hotel2.jpg'),
        },
        {
            id: '3',
            title: 'Hotel Cafetalero',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/hotel3.jpg'),
        }
    ];

    return (
        <View style={styles.container}>
            <HeaderComponent title={textsLeng.AccommodationScreen.title} rightIcon="menu-outline" />
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <SearchInputComponent />
                <Text style={styles.message}>{textsLeng.AccommodationScreen.message}</Text>
                {hospedajes.map((hospedaje, index) => (
                    <AccomodationCardComponent
                        key={index}
                        title={hospedaje.title}
                        description={hospedaje.description}
                        image={hospedaje.image}
                        onPress={() => console.log('Hospedaje seleccionado:', hospedaje.title)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    message: {
        color: "#000",
        fontSize: SizeConstants.subtitles,
        marginTop: hp('2.5%'),
        marginBottom: hp('2%'),
        fontWeight: 'bold',
    },
    scrollView: {
        paddingHorizontal: wp('3.75%'),
    },
});

export default AccommodationScreen;
