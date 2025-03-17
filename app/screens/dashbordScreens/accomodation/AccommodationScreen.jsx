import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../../components/generals/HeaderComponent';
import AccommodationCardComponent from '../../../components/dashbord/AccomodationCardComponent';
import SearchInputComponent from '../../../components/generals/SearchInputComponent';
import AssignLenguaje from '../../../lenguage/AssignLenguage';
import SizeConstants from '../../../utils/SizeConstants';
import SkeletonComponent from '../../../components/generals/SkeletonComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '../../../utils/Api';
import { useNavigation } from '@react-navigation/native';
import NoDataComponent from '../../../components/generals/NoDataComponent';

const AccommodationScreen = () => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const [loading, setLoading] = useState(true);
    const [hospedajes, setHospedajes] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        AssignLenguaje(dispatch);
        const fetchData = async () => {
            try {
                const data = await api.getPublicBusinesses('Hospedaje');
                setHospedajes(Array.isArray(data) ? data : []); // Se agregó el Array.isArray(data) ? data : [] para evitar errores en la vista, esto ayuda a que si data no es un array, se muestre un array vacío
            } catch (error) {
                console.error(error);
                setHospedajes([]); // Se agregó setHospedajes([]) para evitar errores en la vista, esto ayuda a que si hay un error, 
                // se muestre un array vacío y si no hay datos, se muestre un array vacío y si si hay datos, se muestren los datos
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchData();
    }, [dispatch]);

    const handlePress = (hospedaje) => {
        navigation.navigate("BusinessDetailScreen", { business: hospedaje });
    };

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
                ) : hospedajes.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <NoDataComponent name="hospedajes" icon="bed-outline" />
                    </View>
                ) : (
                    hospedajes.map((hospedaje) => (
                        <AccommodationCardComponent
                            key={hospedaje.id}
                            name={hospedaje.name}
                            description={hospedaje.description}
                            url_image={hospedaje.url_image}
                            averageRating={hospedaje.averageRating}
                            onPress={() => handlePress(hospedaje)}
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
    noDataContainer: {
        marginTop: hp('20%'), // Ajusta este valor según sea necesario
    },
});

export default AccommodationScreen;
