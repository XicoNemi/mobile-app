import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import SkeletonComponent from "../generals/SkeletonComponent";
import SizeConstants from "../../utils/SizeConstants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const routesData = [
  { id: 1, image: require("../../../assets/route1.jpg"), title: "Ruta 1" },
  { id: 2, image: require("../../../assets/route2.jpg"), title: "Ruta 2" },
  { id: 3, image: require("../../../assets/route3.jpg"), title: "Ruta 3" },
];

const RoutesList = ({ loading }) => {
  const data = loading ? routesData.map((item, index) => ({ ...item, id: index + 1 })) : routesData;

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.routeBox}>
          {loading ? (
            <SkeletonComponent width={wp('62.5%')} height={hp('25%')} />
          ) : (
            <Image source={item.image} style={styles.routeImage} />
          )}
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      style={styles.routeList}
    />
  );
};

const styles = StyleSheet.create({
  routeList: {
    marginBottom: hp('2.5%'),
  },
  routeBox: {
    width: wp('62.5%'),
    height: hp('25%'),
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp('2.5%'),
    marginRight: wp('2.5%'),
  },
  routeImage: {
    width: "100%",
    height: "100%",
    borderRadius: wp('2.5%'),
  },
});

export default RoutesList;