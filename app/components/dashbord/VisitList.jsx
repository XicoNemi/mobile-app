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
    // Función para obtener la lista de negocios
    const fetchBusinesses = async () => {
      try {
        // Si el usuario está logueado, obtener la lista de negocios con token
        // Si no está logueado, obtener la lista de negocios públicos
        const data = token ? await Api.getBusinesses(token) : await Api.getPublicBusinesses();
        setBusinesses(data); // Actualizar el estado con la lista de negocios obtenida
      } catch (error) {
        console.error(error); // Manejar errores en la consola
      }
    };
    fetchBusinesses(); // Llamar a la función para obtener los negocios
  }, [token]); // Ejecutar el efecto cuando el token cambie

  // Si está cargando, mapear los negocios para mostrar un esqueleto de carga
  // Si no está cargando, usar la lista de negocios obtenida
  const data = loading ? businesses.map((item, index) => ({ ...item, id: index + 1 })) : businesses;

  // Función para manejar el evento de presionar un negocio
  const handlePress = (item) => {
    // Navegar a la pantalla de detalles del negocio con los datos del negocio seleccionado
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
