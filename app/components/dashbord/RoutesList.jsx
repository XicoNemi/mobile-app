import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import SkeletonComponent from "../generals/SkeletonComponent";
import SizeConstants from "../../utils/SizeConstants";

const routesData = [
  { id: 1, image: require("../../../assets/route1.jpg"), title: "Ruta 1" },
  { id: 2, image: require("../../../assets/route2.jpg"), title: "Ruta 2" },
  { id: 3, image: require("../../../assets/route3.jpg"), title: "Ruta 3" },
];

const RoutesList = ({ loading }) => {
  return (
    <FlatList
      horizontal
      data={loading ? [1, 2, 3] : routesData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.routeBox}>
          {loading ? (
            <SkeletonComponent width={250} height={200} />
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
    marginBottom: 20,
  },
  routeBox: {
    width: 250,
    height: 200,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
  },
  routeImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export default RoutesList;