import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {Feather} from 'react-native-vector-icons';
import HeaderComponent from '../../../components/generals/HeaderComponent';
import LoaderComponent from '../../../components/generals/LoaderComponent';
import CustomAlertComponent from '../../../components/generals/CustomAlertComponent';
import AssignLenguaje from '../../../lenguage/AssignLenguage';
import { useNavigation } from '@react-navigation/native';
const colors=['#3AA648']

const RoutesScreen = () => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const user = useSelector((state) => state.auth);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [routes, setRoutes] = useState([])
  const navigation = useNavigation()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const fetchRoutes = async () =>{
      try {
        setIsLoading(true);
        const req=await fetch('https://available-karlotta-ethdev11-59ebf81c.koyeb.app/api/routes')
        const res=await req.json() 
        console.log('data fetch successfully')
        const filteredRoutes = res.filter(route => route.status === true);
        setRoutes(filteredRoutes)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchRoutes()
  },[])

  const handlePress = (route) => {
    if (!user || !user.id) {
      setAlertVisible(true);
      return;
    }

    navigation.navigate('InfoRoute', { id: route.id});
  };

  return (
    <View style={styles.container}>
      <HeaderComponent title={textsLeng.RoutesScreen.title} rightIcon='menu-outline' />
      <ScrollView contentContainerStyle={styles.scrollContent}>
      {routes.length > 0 ? (
          routes.map((route) => (
            <View key={route.id} style={styles.card}>
              <TouchableOpacity onPress={() => handlePress(route)}>
                <Image source={route.url_image ? {uri: route.url_image} : require('../../../../assets/xiconemi-nopicture.png')} style={styles.images} />
                <View>
                  <Text style={{ color: colors[0], fontSize: 25, marginTop: 15 }}>{route.name}</Text>
                  <Text numberOfLines={2} style={{width:'75%'}}>{route.description}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{ fontSize: 10, marginTop: 14 }}>Distancia: {route.distance} km - Tiempo: {Math.floor(route.time/3600)} h {Math.floor((route.time%3600)/60)}m</Text>
                  <TouchableOpacity style={{marginRight:15}} onPress={() => console.log('Botón presionado')}>
                    <Feather name='download' size={25} color='#3AA648' />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <View style={{alignItems:'center'}}>
                <View style={styles.divider}/>
              </View>
            </View> 
          ))
          
        ) 
        : (
          <LoaderComponent isVisible={isLoading} text="Cargando datos..." />
        )}
      </ScrollView>

      <CustomAlertComponent
        isVisible={isAlertVisible}
        onClose={() => setAlertVisible(false)}
        title="Acceso restringido"
        message="Debes iniciar sesión para ver los detalles de la ruta."
        iconName="alert-circle-outline"
        iconColor="#FF5733"
        primaryButton={{
          text: "Aceptar",
          onPress: () => setAlertVisible(false),
        }}
        showCancelButton={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:20
  },
  card: {
    width: '90%',
    height: 300,
    borderRadius: 20,
    marginBottom:30,
  },
  images: {
    width: '100%',
    height: '70%',
    borderRadius: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    width: '80%',
    marginTop: 20,
  }
});

export default RoutesScreen;