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
import api from '../../../utils/Api';
import { useNavigation } from '@react-navigation/native';
import NoDataComponent from '../../../components/generals/NoDataComponent';

const TourismScreen = () => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const [loading, setLoading] = useState(true);
    const [tourismData, setTourismData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        AssignLenguaje(dispatch);
        const fetchData = async () => {
            try {
                const data = await api.getPublicBusinesses('Turismo');
                setTourismData(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error(error);
                setTourismData([]);
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
                ) : tourismData.length === 0 ? (
                    <View style={styles.noDataContainer}>
                        <NoDataComponent name="turismo" icon="map-outline" />
                    </View>
                ) : (
                    tourismData.map((item) => (
                        <TourismCardComponent
                            key={item.id}
                            title={item.name}
                            description={item.description}
                            image={{ uri: item.url_image }}
                            rating={item.averageRating}
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
        marginBottom: hp('1%'),
        fontWeight: 'bold',
    },
    scrollView: {
        paddingHorizontal: wp('3.75%'),
    },
    noDataContainer: {
        marginTop: hp('20%'), // Ajusta este valor según sea necesario
    },
});

export default TourismScreen;
