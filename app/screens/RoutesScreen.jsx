import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import LanguageProvider from '../lenguage/LanguageProvider';


const RoutesScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent title={LanguageProvider.spa.RoutesScreen.title} rightIcon='menu-outline' />
      <Text style={styles.text}>Esta es la pantalla de Rutas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RoutesScreen;
