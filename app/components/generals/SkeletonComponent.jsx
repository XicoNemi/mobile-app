import React from 'react';
import { Skeleton } from 'moti/skeleton';
import { View, StyleSheet } from 'react-native';

export default function SkeletonComponent({
  width = "100%",
  height = 100, 
  colorMode = 'light',
  borderRadius = 10
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
