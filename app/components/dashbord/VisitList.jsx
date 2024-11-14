import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import SkeletonComponent from "../generals/SkeletonComponent";
import SizeConstants from "../../utils/SizeConstants";

const visitData = [
  { id: 1, image: require("../../../assets/recommendation1.jpeg"), name: "Mr Cheve" },
  { id: 2, image: require("../../../assets/recommendation2.jpeg"), name: "Parrilladas Don Mundo" },
  { id: 3, image: require("../../../assets/recommendation3.jpeg"), name: "Restaurant Aranjuez" },
];

const VisitList = ({ loading }) => {
  const data = loading ? visitData.map((item, index) => ({ ...item, id: index + 1 })) : visitData;

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.visitBox}>
          {loading ? (
            <SkeletonComponent width={120} height={120} borderRadius={60} />
          ) : (
            <>
              <Image source={item.image} style={styles.visitImage} />
              <Text style={styles.visitText}>{item.name}</Text>
            </>
          )}
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      style={styles.visitList}
    />
  );
};

const styles = StyleSheet.create({
  visitList: {
    marginBottom: 30,
  },
  visitBox: {
    width: 120,
    alignItems: "center",
    marginRight: 20,
  },
  visitImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  visitText: {
    marginTop: 5,
    fontSize: SizeConstants.texts,
    textAlign: "center",
  },
});

export default VisitList;