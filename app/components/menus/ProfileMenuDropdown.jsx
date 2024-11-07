import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SizeConstants from '../../utils/SizeConstants';
import AssignLenguaje from '../../lenguage/AssignLenguage';
import LanguageProvider from '../../lenguage/LanguageProvider';
import { useNavigation } from '@react-navigation/native'; 
import LanguageSwitcher from '../../lenguage/LanguageSwitcher';  

const ProfileMenuDropdown = ({}) => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa); 

  const navigation = useNavigation();

  useEffect(() => {
    AssignLenguaje(setTextsLeng); 
}, []);

  return (
    <View style={styles.menu}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate('ProfileScreen'); 
        }}
      >
        <Ionicons name="person-outline" size={SizeConstants.iconsCH} color="black" />
        <Text style={styles.menuText}>{textsLeng.components.menuItems.myProfile}</Text>
      </TouchableOpacity>

      <View style={styles.languageSwitcherContainer}>
        <LanguageSwitcher setTextsLeng={setTextsLeng} />
      </View>

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          console.log('Cerrar sesión');
        }}
      >
        <Ionicons name="log-out-outline" size={SizeConstants.iconsCH} color="black" />
        <Text style={styles.menuText}>{textsLeng.components.menuItems.logOut}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 5,
    position: 'absolute',
    top: 50,
    right: 10,
    zIndex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  menuText: {
    marginLeft: 12,
    fontSize: SizeConstants.texts,
  },
  languageSwitcherContainer: {
    marginVertical: 8, 
    marginLeft: -8,     
  },
});

export default ProfileMenuDropdown;
