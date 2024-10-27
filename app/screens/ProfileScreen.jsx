import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import LanguageProvider from '../lenguage/LanguageProvider';


const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent title={LanguageProvider.spa.ProfileScreen.title} rightIcon='notifications-outline' />
      <Text style={styles.text}>Esta es la pantalla de Perfil</Text>
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
