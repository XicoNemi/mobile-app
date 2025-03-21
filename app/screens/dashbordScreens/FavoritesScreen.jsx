import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../components/generals/HeaderComponent';
import AssignLenguaje from '../../lenguage/AssignLenguage';
import SkeletonComponent from '../../components/generals/SkeletonComponent';
import NoDataComponent from '../../components/generals/NoDataComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const favoritesData = useSelector((state) => state.favorites?.items || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AssignLenguaje(dispatch);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [dispatch]);

  const skeletonNumber = [1, 2, 3];

  return (
    <View style={styles.container}>
      <HeaderComponent title={textsLeng.FavoritesScreen.title} rightIcon='menu-outline' />
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {loading ? (
          skeletonNumber.map((skeleton) => (
            <View key={skeleton} style={{ marginBottom: hp('2.5%') }}>
              <SkeletonComponent width={wp('90%')} height={hp('35.8%')} />
            </View>
          ))
        ) : favoritesData.length === 0 ? (
          <View style={styles.noDataContainer}>
            <NoDataComponent name="favoritos" icon="heart-outline" />
          </View>
        ) : (
          // Renderizar datos de favoritos aquí
          <View>
            {/* Renderizar datos de favoritos */}
          </View>
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
  scrollView: {
    paddingHorizontal: wp('3.75%'),
  },
  noDataContainer: {
    marginTop: hp('20%'),
  },
});

export default FavoritesScreen;
