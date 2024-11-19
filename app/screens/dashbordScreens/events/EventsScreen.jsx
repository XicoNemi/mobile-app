import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../../components/generals/HeaderComponent';
import AssignLenguaje from '../../../lenguage/AssignLenguage';
import SizeConstants from '../../../utils/SizeConstants';
import SearchInputComponent from '../../../components/generals/SearchInputComponent';
import EventsCardComponent from '../../../components/dashbord/EventsCardComponent';
import SkeletonComponent from '../../../components/generals/SkeletonComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EventsScreen = () => {
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
            title: 'Feria de la Primavera',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/feria.png'),
        },
        {
            id: 2,
            title: '1 Molotiza',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/molotisa.png'),
        },
        {
            id: 3,
            title: 'Tour del cafe y catacion',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../../assets/tourCafe.png'),
        },
    ];

    const skeletonNumber = [1, 2, 3];

    return (
        <View style={styles.container}>
            <HeaderComponent title={textsLeng.EventsScreen.title} rightIcon="menu-outline" />
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <SearchInputComponent />
                <Text style={styles.message}>{textsLeng.EventsScreen.message}</Text>

                {loading ? (
                    skeletonNumber.map((skeleton) => (
                        <View key={skeleton} style={{ marginBottom: hp('2.5%') }}>
                            <SkeletonComponent width={wp('90%')} height={hp('35.8%')} />
                        </View>
                    ))
                ) : (
                    tourismData.map((item) => (
                        <EventsCardComponent
                            key={item.id}
                            title={item.title}
                            description={item.description}
                            image={item.image}
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
        marginBottom: hp('2%'),
        fontWeight: 'bold',
    },
    scrollView: {
        paddingHorizontal: wp('3.75%'),
    },
});

export default EventsScreen;
