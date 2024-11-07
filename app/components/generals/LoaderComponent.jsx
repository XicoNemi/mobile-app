import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';

export default function LoaderComponent({ isVisible = false, text = '' }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.vista}>
          <ActivityIndicator size="large" color="#3D5CA4" />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  vista: {
    width: 200,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    color: 'black',
    marginTop: 10,
  },
});
