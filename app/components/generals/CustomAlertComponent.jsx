import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CustomAlertComponent = ({
  isVisible,
  onClose,
  title,
  message,
  iconName = "alert-circle-outline",
  iconColor = Colors.primary,
  primaryButton = { text: "Aceptar", onPress: () => {} },
  secondaryButton = { text: "Cancelar", onPress: () => {} },
  showCancelButton = true,
}) => {
  const buttonStyle = showCancelButton
    ? styles.buttonConfirm
    : styles.buttonSingle;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropOpacity={0.4}
      style={styles.modal}
    >
      <View style={styles.alertContainer}>
        <Ionicons
          name={iconName}
          size={SizeConstants.iconsXG}
          color={iconColor}
          style={styles.icon}
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => {
              primaryButton.onPress();
              onClose();
            }}
          >
            <Text style={styles.buttonText}>{primaryButton.text}</Text>
          </TouchableOpacity>

          {showCancelButton && (
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => {
                secondaryButton.onPress();
                onClose();
              }}
            >
              <Text style={styles.buttonText}>{secondaryButton.text}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    backgroundColor: "white",
    borderRadius: wp('2.5%'),
    padding: wp('5%'),
    width: "80%",
    alignItems: "center",
  },
  icon: {
    marginBottom: hp('1%'),
  },
  title: {
    fontSize: SizeConstants.subtitles,
    fontWeight: "bold",
    color: "black",
    marginBottom: hp('1.25%'),
  },
  message: {
    fontSize: SizeConstants.texts,
    color: Colors.secondaryText,
    textAlign: "center",
    marginBottom: hp('1.25%'),
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonConfirm: {
    backgroundColor: Colors.routes,
    borderRadius: wp('3.75%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    alignItems: "center",
    marginRight: wp('2.5%'),
    flex: 1,
  },
  buttonCancel: {
    backgroundColor: Colors.primary,
    borderRadius: wp('3.75%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    alignItems: "center",
    marginLeft: wp('2.5%'),
    flex: 1,
  },
  buttonSingle: {
    backgroundColor: Colors.routes,
    borderRadius: wp('3.75%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    alignItems: "center",
    marginLeft: wp('16.25%'),
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: SizeConstants.texts,
  },
});

export default CustomAlertComponent;