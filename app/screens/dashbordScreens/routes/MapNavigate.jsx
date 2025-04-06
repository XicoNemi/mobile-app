import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";
import HeaderComponent from '../../../components/generals/HeaderComponent';
import { FontAwesome5, Foundation } from "react-native-vector-icons";

const colors = ["#3AA648"];

const MapNavigate = ({ route }) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [heading, setHeading] = useState(0);
  const mapRef = useRef(null);

  const { routeLine } = route.params;

  useEffect(() => {
    if (routeLine) {
      const decodedPolyline = polyline
        .decode(routeLine)
        .map(([latitude, longitude]) => ({ latitude, longitude }));

      setRouteCoordinates(decodedPolyline);
    }
  }, [routeLine]);

  useEffect(() => {
    let interval;
    if (isNavigating && currentIndex < routeCoordinates.length - 1) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= routeCoordinates.length) {
            clearInterval(interval);
            return prevIndex;
          }

          const prevPoint = routeCoordinates[prevIndex];
          const nextPoint = routeCoordinates[nextIndex];
          const angle = Math.atan2(
            nextPoint.longitude - prevPoint.longitude,
            nextPoint.latitude - prevPoint.latitude
          );
          setHeading((angle * 180) / Math.PI);

          if (mapRef.current) {
            mapRef.current.animateCamera({
              center: nextPoint,
              heading: heading,
              pitch: 60,
              zoom: 18,
            });
          }

          return nextIndex;
        });
      }, 1000);
    } else if (currentIndex === routeCoordinates.length - 1) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isNavigating, currentIndex, routeCoordinates.length]);

  const startNavigation = () => {
    setIsNavigating(true);
    setCurrentIndex(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title={"Ruta"} rightIcon={"person-circle"}></HeaderComponent>
      <View>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: routeCoordinates.length > 0 ? routeCoordinates[0].latitude : 20.2655,
            longitude: routeCoordinates.length > 0 ? routeCoordinates[0].longitude : -97.9609,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {routeCoordinates.length > 0 && (
            <>
              <Polyline coordinates={routeCoordinates} strokeWidth={3} strokeColor="blue" />
              <Marker
                coordinate={routeCoordinates[currentIndex]}
                title="Ubicación actual"
                description="Posición del usuario"
                anchor={{ x: 0.5, y: 0.5 }}
                rotation={heading}
              >
                <Image source={require("../../../../assets/arrow.png")} style={{ width: 40, height: 40 }} />
              </Marker>
            </>
          )}
        </MapView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity>
            <Foundation name={"map"} size={30} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonReturn} onPress={startNavigation}>
            <Text style={{ fontSize: 25, color: "white" }}>Inicio</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <FontAwesome5 name={"running"} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: 550,
  },
  bottomContainer: {
    height: 150,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonReturn: {
    backgroundColor: colors[0],
    borderRadius: 100,
    padding: 7,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapNavigate;
