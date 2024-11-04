import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LanguageProvider from '../lenguage/LanguageProvider';
import AssignLenguaje from '../lenguage/AssignLenguage'; 
import SizeConstants from '../utils/SizeConstants';

const MenuDropdown = ({ navigation }) => {
  const [textsLeng, setTextsLeng] = useState(LanguageProvider.spa); 

  useEffect(() => {
    AssignLenguaje(setTextsLeng); 
}, []);


  const menuItems = [
    { icon: 'map-outline', label: textsLeng.components.menuItems.routes, screen: 'RoutesScreen' },
    { icon: 'bed-outline', label: textsLeng.components.menuItems.bed },
    { icon: 'star-outline', label: textsLeng.components.menuItems.food },
    { icon: 'calendar-outline', label: textsLeng.components.menuItems.events },
    { icon: 'heart-outline', label: textsLeng.components.menuItems.tourism },
    { icon: 'list-outline', label: textsLeng.components.menuItems.itineraries, screen: 'ItinerariesScreen' },
  ];

  return (
    <View style={styles.menu}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => {
            if (item.screen) {
              navigation.navigate(item.screen);
            }
          }}
        >
          <Ionicons name={item.icon} size={SizeConstants.iconsCH} color='black' />
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
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
    left: 15,
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
});

export default MenuDropdown;
