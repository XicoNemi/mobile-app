import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from "../../utils/Colors";
import { useSelector } from 'react-redux';
import SizeConstants from '../../utils/SizeConstants';

const NoDataComponent = ({ name = "datos", icon = "alert-circle-outline" }) => {
  const textsLeng = useSelector((state) => state.language.texts);
  const { NoDataComponent: texts } = textsLeng;

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={50} color={Colors.primary} />
      <Text style={styles.text}>{texts.noDataMessage.replace("{name}", name)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 10,
    fontSize: SizeConstants.textsM,
    color: Colors.primary,
    textAlign: 'center',
  },
});

export default NoDataComponent;
