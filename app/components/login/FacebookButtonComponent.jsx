import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import SizeConstants from "../../utils/SizeConstants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FacebookButtonComponent = ({ onPress }) => {
  const textsLeng = useSelector((state) => state.language.texts);

  return (
    <TouchableOpacity style={styles.facebookButton} onPress={onPress}>
      {/* Cargar la imagen del ícono de Facebook desde assets */}
      <Image source={require("../../../assets/facebook.png")} style={styles.icon} />
      <Text style={styles.socialButtonText}>{textsLeng.LoginScreen.signFacebook}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  facebookButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('21.25%'),
    borderRadius: wp('5.5%'),
    marginBottom: hp('1.10%'),
    width: "95%",
    height: hp('6%'),
  },
  icon: {
    width: wp('6.25%'),  
    height: wp('6.25%'), 
  },
  socialButtonText: {
    color: "white",
    fontSize: SizeConstants.texts,
    marginLeft: wp('2.0%'),
  },
});

export default FacebookButtonComponent;