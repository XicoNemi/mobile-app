import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../../components/generals/HeaderComponent';
import AssignLenguaje from '../../../lenguage/AssignLenguage';
import SizeConstants from '../../../utils/SizeConstants';
import SearchInputComponent from '../../../components/generals/SearchInputComponent';
import GastronomyCardComponent from '../../../components/dashbord/GastronomyCardComponent';
import SkeletonComponent from '../../../components/generals/SkeletonComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '../../../utils/Api';
import { useNavigation } from '@react-navigation/native';
import NoDataComponent from '../../../components/generals/NoDataComponent';

const GastronomyScreen = () => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const [loading, setLoading] = useState(true);
    const [gastronomyData, setGastronomyData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        AssignLenguaje(dispatch);
        const fetchData = async () => {
            try {
                const data = await api.getPublicBusinesses('Gastronomia');
                setGastronomyData(Array.isArray(data) ? data : []); // Se agregó el Array.isArray(data) ? data : [] para evitar errores en la vista, esto ayuda a que si data no es un array, se muestre un array vacío
            } catch (error) {
                console.error(error);
                setGastronomyData([]); // Se agregó setGastronomyData([]) para evitar errores en la vista, esto ayuda a que si hay un error,
                // se muestre un array vacío y si no hay datos, se muestre un array vacío y si si hay datos, se muestren los datos
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchData();
    }, [dispatch]);

    const handlePress = (item) => {
        navigation.navigate("BusinessDetailScreen", { business: item });
    };

    const skeletonNumber = [1, 2, 3];

    return (
        <View style={styles.container}>
            <HeaderComponent title={textsLeng.GastronomyScreen.title} rightIcon="menu-outline" />
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                <SearchInputComponent />
                <Text style={styles.message}>{textsLeng.GastronomyScreen.message}</Text>

                {loading ? (
                    skeletonNumber.map((skeleton) => (
                        <View key={skeleton} style={{ marginBottom: hp('2.5%') }}>
                            <SkeletonComponent width={wp('90%')} height={hp('35%')} />
                        </View>
                    ))
                ) : gastronomyData.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <NoDataComponent name="gastronomía" icon="restaurant-outline" />
                    </View>
                ) : (
                    gastronomyData.map((item) => (
                        <GastronomyCardComponent
                            key={item.id}
                            name={item.name}
                            description={item.description}
                            url_image={item.url_image}
                            averageRating={item.averageRating}
                            onPress={() => handlePress(item)}
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
    noDataContainer: {
        marginTop: hp('20%'), // Ajusta este valor según sea necesario
    },
});

export default GastronomyScreen;
