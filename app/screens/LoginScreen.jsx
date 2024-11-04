import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { BlurView } from 'expo-blur'; // Esta librería permite el efecto de desenfoque en la imagen de fondo
import LanguageProvider from '../lenguage/LanguageProvider';
import Colors from '../utils/Colors';
import LanguageSwitcher from '../lenguage/LanguageSwitcher'; 
import SizeConstants from '../utils/SizeConstants';

const LoginScreen = ({ navigation }) => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa); // Inicializa el idioma
  const handleLogin = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      {/* Componente para cambiar el idioma*/}
      <View style={styles.languageSwitcher}>
      <LanguageSwitcher setTextsLeng={setTextsLeng}/>
      </View>

      <BlurView intensity={40} tint='light' style={styles.overlay}>
        <Text style={styles.title}>
          {textsLeng.LoginScreen.title}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={textsLeng.LoginScreen.usernamePlaceholder}
          placeholderTextColor='#AAAAAA'
          keyboardType='email-address'
        />

        <TextInput
          style={styles.input}
          placeholder={textsLeng.LoginScreen.passwordPlaceholder}
          placeholderTextColor='#AAAAAA'
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {textsLeng.LoginScreen.loginButton}
          </Text>
        </TouchableOpacity>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    padding: 40,
    borderRadius: 27,
    alignItems: 'center',
    width: '90%',
    height: '55%',
    overflow: 'hidden',
  },
  title: {
    fontSize: SizeConstants.titles,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: SizeConstants.texts,
  },
  button: {
    width: '55%',
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: 15,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: SizeConstants.texts,
    fontWeight: 'bold',
  },
  languageSwitcher: {
    position: 'absolute',
    top: 40,
    right: 20, 
    zIndex: 1, 
  },
});

export default LoginScreen;
