import React from 'react';
import { Skeleton } from 'moti/skeleton';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SkeletonComponent({
  width = "100%",
  height = hp('12.5%'), 
  colorMode = 'light',
  borderRadius = wp('2.5%')
}) {
  return (
    <View style={[styles.container, { width, height }]}>
      <Skeleton
        width="100%"
        height="100%"
        colorMode={colorMode}
        radius={borderRadius}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});