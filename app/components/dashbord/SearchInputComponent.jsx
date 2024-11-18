import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SizeConstants from '../../utils/SizeConstants';
import { useSelector, useDispatch } from "react-redux";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SearchInputComponent = () => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    useEffect(() => {
        AssignLenguaje(dispatch);
    }, [dispatch]);
    return (
        <View style={styles.searchBar}>
            <Ionicons
                name="search-outline"
                size={SizeConstants.iconsCH}
                color="black"
            />
            <TextInput
                placeholder={textsLeng.HomeScreen.search}
                style={styles.searchInput}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: wp('5%'),
        padding: wp('2.5%'),
        marginTop: hp('1.25%'),
    },
    searchInput: {
        flex: 1,
        marginRight: wp('2.5%'),
        fontSize: SizeConstants.texts,
        textAlign: "right", 
        paddingRight: wp('60%'), 
    },
});

export default SearchInputComponent;