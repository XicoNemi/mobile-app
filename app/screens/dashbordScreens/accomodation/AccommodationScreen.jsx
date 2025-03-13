import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../../components/generals/HeaderComponent';
import AccomodationCardComponent from '../../../components/dashbord/AccomodationCardComponent';
import SearchInputComponent from '../../../components/generals/SearchInputComponent';
import AssignLenguaje from '../../../lenguage/AssignLenguage';
import SizeConstants from '../../../utils/SizeConstants';
import SkeletonComponent from '../../../components/generals/SkeletonComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AccommodationScreen = () => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AssignLenguaje(dispatch);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, [dispatch]);

    const hospedajes = [
        {
            id: '1',
            title: 'Hotel Villa de Cortez',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/hotel1.jpg'),
            rating: 4.5, 
        },
        {
            id: '2',
            title: 'Hotel Casablanca',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/hotel2.jpg'),
            rating: 3.5,
        },
        {
            id: '3',
            title: 'Hotel Cafetalero',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/hotel3.jpg'),
            rating: 4.0,
        }
    ];
    const skeletonNumber = [1, 2, 3];
    return (
        <View style={styles.container}>
            <HeaderComponent title={textsLeng.AccommodationScreen.title} rightIcon="menu-outline" />
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <SearchInputComponent />
                <Text style={styles.message}>{textsLeng.AccommodationScreen.message}</Text>

                {loading ? (
                    skeletonNumber.map((skeleton) => (
                        <View key={skeleton} style={{ marginBottom: hp('2.5%') }}>
                            <SkeletonComponent width={wp('90%')} height={hp('35.8%')} />
                        </View>
                    ))
                ) : (
                    hospedajes.map((hospedaje) => (
                        <AccomodationCardComponent
                            key={hospedaje.id}
                            title={hospedaje.title}
                            description={hospedaje.description}
                            image={hospedaje.image}
                            rating={hospedaje.rating} // Pasar la nueva propiedad
                            onPress={() => console.log('Hospedaje seleccionado:', hospedaje.title)}
                        />
                    ))
                )}
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
