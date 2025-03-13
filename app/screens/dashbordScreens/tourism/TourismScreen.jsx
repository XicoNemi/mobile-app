import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../../components/generals/HeaderComponent';
import AssignLenguaje from '../../../lenguage/AssignLenguage';
import SizeConstants from '../../../utils/SizeConstants';
import SearchInputComponent from '../../../components/generals/SearchInputComponent';
import TourismCardComponent from '../../../components/dashbord/TourismCardComponent';
import SkeletonComponent from '../../../components/generals/SkeletonComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TourismScreen = () => {
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

    const tourismData = [
        {
            id: 1,
            title: 'Museo casa de Carranza',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/museo1.jpeg'),
            rating: 3.5, 
        },
        {
            id: 2,
            title: 'Virgen de Guadalupe',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/virgen.jpg'),
            rating: 4.5, 
        },
        {
            id: 3,
            title: 'Xochipila',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/visit1.jpeg'),
            rating: 2.5, 
        },
    ];

    const skeletonNumber = [1, 2, 3];

    return (
        <View style={styles.container}>
            <HeaderComponent title={textsLeng.TourismScreen.title} rightIcon="menu-outline" />
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <SearchInputComponent />
                <Text style={styles.message}>{textsLeng.TourismScreen.message}</Text>

                {loading ? (
                    skeletonNumber.map((skeleton) => (
                        <View key={skeleton} style={{ marginBottom: hp('2.5%') }}>
                            <SkeletonComponent width={wp('90%')} height={hp('35.8%')} />
                        </View>
                    ))
                ) : (
                    tourismData.map((item) => (
                        <TourismCardComponent
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            image={item.image}
                            rating={item.rating} // Pasar la nueva propiedad
                            onSavePress={() => console.log(`Guardado: ${item.title}`)}
                            onAddPress={() => console.log(`Añadido: ${item.title}`)}
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
        color: '#000',
        fontSize: SizeConstants.subtitles,
        marginTop: hp('2.5%'),
        marginBottom: hp('1%'),
        fontWeight: 'bold',
    },
    scrollView: {
        paddingHorizontal: wp('3.75%'),
    },
});

export default TourismScreen;
