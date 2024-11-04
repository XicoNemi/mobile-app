import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import LanguageProvider from '../lenguage/LanguageProvider';
import AssignLenguaje from '../lenguage/AssignLenguage'; 

const RoutesScreen = () => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa); 

  useEffect(() => {
    AssignLenguaje(setTextsLeng); 
  }, []);

  return (
    <View style={styles.container}>
      <HeaderComponent title={textsLeng.RoutesScreen.title} rightIcon='menu-outline' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

export default RoutesScreen;
