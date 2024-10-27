import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const menuItems = [
  { icon: 'map-outline', label: 'Rutas', screen: 'RoutesScreen' },
  { icon: 'bed-outline', label: 'Hospedaje' },
  { icon: 'star-outline', label: 'Gastronomía' },
  { icon: 'calendar-outline', label: 'Eventos' },
  { icon: 'heart-outline', label: 'Turismo' },
  { icon: 'list-outline', label: 'Itinerarios', screen: 'ItinerariesScreen' },
];

const MenuDropdown = ({ navigation }) => {
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
          <Ionicons name={item.icon} size={20} color='black' />
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
    fontSize: 16,
  },
});

export default MenuDropdown;
