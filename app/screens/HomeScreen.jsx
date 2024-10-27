import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuDropdown from '../components/MenuDropdownComponent';
import { useNavigation } from '@react-navigation/native';
import LanguageProvider from '../lenguage/LanguageProvider';

const HomeScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name='menu-outline' size={35} color='black' />
        </TouchableOpacity>

        <Text style={styles.title}>Inicio</Text>

        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
          <Ionicons name='person-circle-outline' size={35} color='black' />
        </TouchableOpacity>
      </View>

      {menuVisible && <MenuDropdown navigation={navigation} />}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder={LanguageProvider.spa.HomeScreen.welcomeText}
            style={styles.searchInput}
          />
          <Ionicons name='search-outline' size={20} color='black' />
        </View>

        <Text style={styles.welcomeText}>
          {LanguageProvider.spa.HomeScreen.welcomeText}
        </Text>

        <Text style={styles.sectionTitle}>
          {LanguageProvider.spa.HomeScreen.sectionTitleItineraries}
        </Text>
        <FlatList
          horizontal
          data={[1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <View style={styles.itineraryBox}>
              <Text style={styles.itineraryText}>Itinerario {item}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.itineraryList}
        />

        <Text style={styles.sectionSubtitle}>
          {LanguageProvider.spa.HomeScreen.sectionSubtitleVisit}
        </Text>
        <FlatList
          horizontal
          data={[1, 2, 3, 4]}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <View style={styles.visitBox}>
              <Ionicons name='beer-outline' size={30} color='black' />
              <Text style={styles.visitText}>Mr Cheve</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.visitList}
        />

        <Text style={styles.sectionTitle}>
          {LanguageProvider.spa.HomeScreen.sectionTitleContinue}
        </Text>
        <FlatList
          horizontal
          data={[1, 2, 3]}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <View style={styles.continueBox}>
              <View style={styles.itineraryBoxSmall} />
              <Text style={styles.continueText}>Itinerario {item}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.itineraryList}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    marginTop: 35,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itineraryList: {
    marginBottom: 20,
  },
  itineraryBox: {
    width: 250,
    height: 200,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
  itineraryText: {
    fontSize: 16,
  },
  sectionSubtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  visitList: {
    marginBottom: 20,
  },
  visitBox: {
    width: 120,
    height: 120,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
    marginRight: 10,
  },
  visitText: {
    marginTop: 5,
    fontSize: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
  },
  continueBox: {
    alignItems: 'center',
    marginRight: 10,
  },
  itineraryBoxSmall: {
    width: 200,
    height: 150,
    backgroundColor: '#d0d0d0',
    borderRadius: 10,
  },
  continueText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
