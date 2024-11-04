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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default ProfileScreen;
