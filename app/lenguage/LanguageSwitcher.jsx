import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { saveValue, getValueFor } from '../utils/localStorage';
import AssignLenguaje from '../lenguage/AssignLenguage';
import LanguageProvider from '../lenguage/LanguageProvider';
import Colors from '../utils/Colors';
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

  const changeLanguage = async (lang) => {
    await saveValue('lenguage', lang);
    setLanguage(lang);
    setTextsLeng(LanguageProvider[lang]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.translator}
        onPress={() => changeLanguage(language === 'spa' ? 'en' : 'spa')} // Cambia el idioma
      >
        <Image
          style={styles.flag}
          source={language === 'spa' ? require('../../assets/mx.png') : require('../../assets/usa.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  translator: {
    width: 55,
    height: 46,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 10,
  },
  flag: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
  },
});

export default LanguageSwitcher;
