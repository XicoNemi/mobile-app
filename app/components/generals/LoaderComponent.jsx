import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import Colors from '../../utils/Colors';
import SizeConstants from '../../utils/SizeConstants';

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
          <ActivityIndicator size="large" color={Colors.primary} />
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
    width: 260,  
    height: 140, 
    borderRadius: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    color: 'black',
    fontSize: SizeConstants.texts,
    marginTop: 10,
    textAlign: 'center',
  },
});
