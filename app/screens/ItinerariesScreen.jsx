import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import LanguageProvider from '../lenguage/LanguageProvider';
import AssignLenguaje from '../lenguage/AssignLenguage'; 

const ItinerariesScreen = () => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa); 

  useEffect(() => {
    AssignLenguaje(setTextsLeng);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderComponent title={textsLeng.ItinerariesScreen.title} rightIcon='person-circle-outline' />
      <Text style={styles.text}>{textsLeng.ItinerariesScreen.description}</Text>
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

export default ItinerariesScreen;
