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

const AccommodationScreen = () => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const [loading, setLoading] = useState(true);
    const [hospedajes, setHospedajes] = useState([]);

    useEffect(() => {
        AssignLenguaje(dispatch);
        const fetchData = async () => {
            try {
                const data = await api.getPublicBusinesses('Hospedaje');
                setHospedajes(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

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
                        <AccommodationCardComponent
                            key={hospedaje.id}
                            name={hospedaje.name}
                            description={hospedaje.description}
                            url_image={hospedaje.url_image}
                            averageRating={hospedaje.averageRating}
                            onPress={() => console.log('Hospedaje seleccionado:', hospedaje.name)}
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
