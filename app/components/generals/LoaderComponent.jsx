import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import Colors from '../../utils/Colors';
import SizeConstants from '../../utils/SizeConstants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    width: wp('65%'),  
    height: hp('17.5%'), 
    borderRadius: wp('3.75%'),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('3.75%'),
  },
  text: {
    color: 'black',
    fontSize: SizeConstants.texts,
    marginTop: hp('1.25%'),
    textAlign: 'center',
  },
});