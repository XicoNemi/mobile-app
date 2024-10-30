import React from 'react';
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

const LoginScreen = ({ navigation }) => {
  const handleLogin = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <BlurView intensity={40} tint='light' style={styles.overlay}>
        <Text style={styles.title}>
          {LanguageProvider.spa.LoginScreen.title}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={LanguageProvider.spa.LoginScreen.usernamePlaceholder}
          placeholderTextColor='#AAAAAA'
          keyboardType='email-address'
        />

        <TextInput
          style={styles.input}
          placeholder={LanguageProvider.spa.LoginScreen.passwordPlaceholder}
          placeholderTextColor='#AAAAAA'
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {LanguageProvider.spa.LoginScreen.loginButton}
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
    fontSize: 32,
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
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
