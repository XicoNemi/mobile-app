import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import SizeConstants from '../utils/SizeConstants';

const Header = ({ title, rightIcon, onRightIconPress }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name='arrow-back-outline' size={SizeConstants.iconsM} color='black' />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {rightIcon && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightButton}>
          <Ionicons name={rightIcon} size={SizeConstants.iconsM} color='black' />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 35,
  },
  backButton: {
    marginRight: 20,
  },
  rightButton: {
    marginLeft: 20,
  },
  title: {
    fontSize: SizeConstants.subtitles,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});

export default Header;
