import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../components/generals/HeaderComponent';
import AssignLenguaje from '../../lenguage/AssignLenguage';
import SizeConstants from '../../utils/SizeConstants';
import SearchInputComponent from '../../components/dashbord/SearchInputComponent';
import TourismCardComponent from '../../components/tourismComponent/TourismCardComponent'; // Importa el componente
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TourismScreen = () => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);

    useEffect(() => {
        AssignLenguaje(dispatch);
    }, [dispatch]);

    // Datos simulados para las tarjetas
    const tourismData = [
        {
            id: 1,
            title: 'Museo casa de Carranza',
            description: 'Ruta base de la competencia, con preciosas vistas de Xicotepec de Juarez.',
            image: require('../../../assets/museo1.jpeg'),
        },
        {
            id: 2,
            title: 'Virgen de Guadalupe',
            description: 'Ruta base de la competecion, con preciosas vistas de Xicotepec de Juarez. ',
            image: require('../../../assets/virgen.jpg'),
        },
        {
            id: 3,
            title: 'Xochipila',
            description: 'Ruta base de la competecion, con preciosas vistas de Xicotepec de Juarez. ',
            image: require('../../../assets/visit1.jpeg'),
        },  
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <HeaderComponent title={textsLeng.TourismScreen.title} rightIcon="menu-outline" />
                <SearchInputComponent />
                <Text style={styles.message}>{textsLeng.TourismScreen.message}</Text>
                {tourismData.map((item) => (
                    <TourismCardComponent
                        key={item.id}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                        onSavePress={() => console.log(`Guardado: ${item.title}`)}
                        onAddPress={() => console.log(`Añadido: ${item.title}`)}
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

export default TourismScreen;
