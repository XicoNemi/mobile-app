import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import SizeConstants from "../../utils/SizeConstants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GoogleButtonComponent = ({ onPress }) => {
  const textsLeng = useSelector((state) => state.language.texts);

  return (
    <TouchableOpacity style={styles.googleButton} onPress={onPress}>
      {/* Cargar la imagen del ícono de Google desde assets */}
      <Image source={require("../../../assets/google.png")} style={styles.icon} />
      <Text style={styles.socialButtonText}>{textsLeng.LoginScreen.signGoogle}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('23.25%'),
    borderRadius: wp('5.5%'),
    marginBottom: hp('1.25%'),
    width: "95%",
    height: hp('6.25%'),
  },
  icon: {
    width: wp('6.75%'),  
    height: wp('6.75%'), 
  },
  socialButtonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    marginLeft: wp('2.5%'),
  },
});

export default GoogleButtonComponent;