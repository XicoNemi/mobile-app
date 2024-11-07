import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';

export default function LoaderComponent(props) {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.vista}>
        <ActivityIndicator size="large" color="#3D5CA4" />
        {text && <Text> {text} </Text>}
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    borderRadius: 10,
  },
  vista: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "blue",
    textTransform: "uppercase",
    marginTop: "10"
  }
});