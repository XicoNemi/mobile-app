import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import SkeletonComponent from "../generals/SkeletonComponent";
import SizeConstants from "../../utils/SizeConstants";

const recommendationsData = [
  { id: 1, image: require("../../../assets/visit1.jpeg"), name: "Xochipila" },
  { id: 2, image: require("../../../assets/visit2.webp"), name: "Cruz Celestial" },
  { id: 3, image: require("../../../assets/visit3.jpeg"), name: "Parroquia San Juan" },
];

const RecommendationsList = ({ loading }) => {
  const data = loading ? recommendationsData.map((item, index) => ({ ...item, id: index + 1 })) : recommendationsData;

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.recommendationBox}>
          {loading ? (
            <SkeletonComponent width={200} height={150} />
          ) : (
            <>
              <Image source={item.image} style={styles.recommendationImage} />
              <Text style={styles.recommendationText}>{item.name}</Text>
            </>
          )}
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      style={styles.recommendationList}
    />
  );
};

const styles = StyleSheet.create({
  recommendationList: {
    marginBottom: 20,
  },
  recommendationBox: {
    alignItems: "center",
    marginRight: 10,
  },
  recommendationImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },
  recommendationText: {
    marginTop: 8,
    fontSize: SizeConstants.texts,
    fontWeight: "bold",
  },
});

export default RecommendationsList;