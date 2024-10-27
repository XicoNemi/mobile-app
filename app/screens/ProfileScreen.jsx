import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderComponent title='Perfil' rightIcon='notifications-outline' />
      <Text style={styles.text}>Esta es la pantalla de Rutas</Text>
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
