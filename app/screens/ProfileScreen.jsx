import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import LanguageProvider from '../lenguage/LanguageProvider';
import AssignLenguaje from '../lenguage/AssignLenguage'; 

const ProfileScreen = () => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa); // Inicializar con el idioma español

  useEffect(() => {
    AssignLenguaje(setTextsLeng); // Cargar el idioma
  }, []);

  return (
    <View style={styles.container}>
      <HeaderComponent title={textsLeng.ProfileScreen.title} rightIcon='notifications-outline' />
      <Text style={styles.text}>{textsLeng.ProfileScreen.description}</Text>
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

export default ProfileScreen;
