import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import SkeletonComponent from "../generals/SkeletonComponent";
import SizeConstants from "../../utils/SizeConstants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from "react-redux";
import Api from "../../utils/Api";
import { useNavigation } from "@react-navigation/native";

const VisitList = ({ loading }) => {
  const [businesses, setBusinesses] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const data = token ? await Api.getBusinesses(token) : await Api.getPublicBusinesses();
        setBusinesses(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBusinesses();
  }, [token]);

  const data = loading ? businesses.map((item, index) => ({ ...item, id: index + 1 })) : businesses;

  const handlePress = (item) => {
    navigation.navigate("BusinessDetailScreen", { business: item });
  };

  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)} style={styles.visitBox}>
          {loading ? (
            <SkeletonComponent width={wp('30%')} height={wp('30%')} borderRadius={wp('15%')} />
          ) : (
            <>
              <Image source={{ uri: item.url_image }} style={styles.visitImage} />
              <Text style={styles.visitText}>{item.name}</Text>
            </>
          )}
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  visitList: {
    marginBottom: hp('3.75%'),
  },
  visitBox: {
    width: wp('30%'),
    alignItems: "center",
    marginRight: wp('5%'),
  },
  visitImage: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
  },
  visitText: {
    marginTop: hp('0.625%'),
    fontSize: SizeConstants.texts,
    textAlign: "center",
  },
});

export default VisitList;
