import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { Feather, AntDesign } from 'react-native-vector-icons';
import MapView, { Polyline }  from "react-native-maps";
import LoaderComponent from '../../../components/generals/LoaderComponent';
import polyline from "@mapbox/polyline";
import { useNavigation } from '@react-navigation/native';
import {useSelector} from 'react-redux'

const colors = ['#3AA648'];

const InfoRoute = ({ route }) => {
  const user = useSelector(state => state.auth);
  const token = user?.token;
  const { id } = route.params;
  const navigation = useNavigation()
  const [routeData, setRouteData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [region, setRegion] = useState({
    latitude: 20.2655,
    longitude: -97.9609,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const mapRef = useRef(null);
  const customMapStyle = [
    {
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchRoutes = async () =>{
      try {
        setIsLoading(true)
        const req=await fetch(`https://available-karlotta-ethdev11-59ebf81c.koyeb.app/api/routes/${id}`,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        })
        const res=await req.json() 
        setRouteData(res)
        
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    if (id) fetchRoutes()
  },[id])


  const polylineMap = routeData?.stravaData?.map?.polyline

  useEffect(() => {
    if (polylineMap) {
      const decodedPolyline = polyline
        .decode(polylineMap)
        .map(([latitude, longitude]) => ({ latitude, longitude }));

      setRouteCoordinates(decodedPolyline);

      if (decodedPolyline.length > 0) {
        setRegion({
          latitude: decodedPolyline[0].latitude,
          longitude: decodedPolyline[0].longitude,
          latitudeDelta: 0.021,
          longitudeDelta: 0.021,
        });
      }
    }
  }, [polylineMap]);

  useEffect(() => {
    if (routeCoordinates.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(routeCoordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [routeCoordinates]);

  const calculateDifficulty = (distance, elevationGain) => {
    const distanceInKm = distance / 1000;
  
    if (distanceInKm > 10 && elevationGain > 20) {
      return 'Difícil';
    } else if (distanceInKm > 5 && distanceInKm <= 10 && elevationGain > 10) {
      return 'Moderada';
    } else {
      return 'Fácil';
    }
  };

  

  return (
    <SafeAreaView style={styles.container}>
      {routeData && routeData.name ? (
        <>
        <View style={{ height: '65%' }}>
        <Image source={routeData.url_image ? {uri: routeData.url_image} : require('../../../../assets/xiconemi-nopicture.png')} style={styles.images} />
        <TouchableOpacity style={styles.buttonReturn} onPress={()=>navigation.goBack()}>
          <AntDesign name='arrowleft' size={20} color='white' />
        </TouchableOpacity>
        <View style={styles.mapContainer}>
            <MapView
            ref={mapRef}
            customMapStyle={customMapStyle}
            style={{width:'100%', height:'100%'}}
            region={region}
            onRegionChangeComplete={setRegion}
            scrollEnabled={false}
            >
            {routeCoordinates.length > 0 && (
                <>
                    <Polyline coordinates={routeCoordinates} strokeWidth={3} strokeColor="blue" />
                </>
                )}
            </MapView>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoTopContainer}>
          <Text style={{ fontSize: 25, color: colors[0] }}>{routeData.name}</Text>
          <Text>{calculateDifficulty(routeData?.distance, routeData?.stravaData?.total_elevation_gain)}</Text>
          <Text>{routeData?.stravaData?.city || 'Xicotepec de Juarez'}, {routeData.stravaData.state}, {routeData.stravaData.country}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoMiddleContainer}>
          <View style={styles.item}>
            <Text style={{ fontSize: 20 }}>{routeData.distance}km</Text>
            <Text>Longitud de la ruta</Text>
          </View>
          <View style={styles.item}>
            <Text style={{ fontSize: 20 }}>{routeData.stravaData.total_elevation_gain}ft</Text>
            <Text>Desnivel</Text>
          </View>
          <View style={styles.item}>
            <Text style={{ fontSize: 20 }}>{Math.floor(routeData.time/3600)} h {Math.floor((routeData.time%3600)/60)}m</Text>
            <Text>Tiempo promedio</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Feather name='download' size={15} color='white' />
            <Text style={{color:'white'}}>Descargar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonNavigate} onPress={()=>navigation.navigate('MapNavigate',{routeLine:polylineMap})}>
            <Text style={{ color: colors[0] }}>Navegar</Text>
          </TouchableOpacity>
        </View>
      </View>
      </>
      ):(
        <LoaderComponent isVisible={isLoading} text="Cargando datos..." />
      )}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: '-20%',
  },
  images: {
    width: '100%',
    height: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    width: '100%',
  },
  item: {
    width: '50%',
    marginBottom: 5,
  },
  infoTopContainer: {
    width: '50%',
    marginLeft: '6%',
    marginVertical: '8%',
  },
  infoMiddleContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '5%',
    marginVertical: '7%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: '8%',
  },
  button: {
    backgroundColor: colors[0],
    width: '45%',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
  },
  buttonNavigate: {
    borderWidth: 1,
    borderColor: colors[0],
    width: '45%',
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
  },
  buttonReturn: {
    backgroundColor: colors[0],
    borderRadius: 100,
    padding: 7,
    position: 'absolute',
    top: '10%',
    left: '2%',
  },
  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    width: 80,
    height: 80,
    position: 'absolute',
    top: '65%',
    right: '5%',
  },
});

export default InfoRoute;
