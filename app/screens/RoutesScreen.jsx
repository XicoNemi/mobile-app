import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RoutesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la pantalla de Rutas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default RoutesScreen;
