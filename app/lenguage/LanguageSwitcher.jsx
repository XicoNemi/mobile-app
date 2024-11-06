import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Asegúrate de que Ionicons esté instalado
import { saveValue, getValueFor } from '../utils/localStorage';
import AssignLenguaje from '../lenguage/AssignLenguage';
import LanguageProvider from '../lenguage/LanguageProvider';
import SizeConstants from '../utils/SizeConstants';
const LanguageSwitcher = ({ setTextsLeng }) => {
  const [language, setLanguage] = useState('spa');

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await getValueFor('lenguage');
      if (savedLanguage) {
        setLanguage(savedLanguage);
        AssignLenguaje(setTextsLeng); // Asigna el idioma basado en el valor guardado
      } else {
        setLanguage('spa'); // Por defecto en español
        setTextsLeng(LanguageProvider.spa);
      }
    };

    loadLanguage();
  }, []);

  const changeLanguage = async () => {
    const newLanguage = language === 'spa' ? 'en' : 'spa';
    await saveValue('lenguage', newLanguage);
    setLanguage(newLanguage);
    setTextsLeng(LanguageProvider[newLanguage]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.translator}
        onPress={changeLanguage} 
      >
        <Ionicons name="globe-outline" size={SizeConstants.iconsCH} color="black" style={styles.icon} />
        <Text style={styles.text}>Cambiar idioma</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  translator: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LanguageSwitcher;
