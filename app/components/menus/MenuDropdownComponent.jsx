import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import SizeConstants from '../../utils/SizeConstants';
import AssignLenguaje from '../../lenguage/AssignLenguage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MenuDropdown = ({ navigation }) => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

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
    padding: wp('5%'),
    borderRadius: wp('1.25%'),
    position: 'absolute',
    top: hp('6.25%'),
    left: wp('2.5%'),
    zIndex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  menuText: {
    marginLeft: wp('3%'),
    fontSize: SizeConstants.texts,
  },
});

export default MenuDropdown;