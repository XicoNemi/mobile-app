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
        <Ionicons name="language-sharp" size={SizeConstants.iconsCH} color="black" style={styles.icon} />
        <Text style={styles.text}>
          {language === 'spa' ? 'Cambiar idioma' : 'Chng language'}
        </Text>
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
    backgroundColor: '#F4F4F4',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  text: {
    marginLeft: 5,
    color: 'black',
    fontSize: SizeConstants.texts,
    fontWeight: 'bold',
  },
});

export default LanguageSwitcher;
