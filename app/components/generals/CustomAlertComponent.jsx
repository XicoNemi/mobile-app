import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";

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
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  icon: {
    marginBottom: 1,
  },
  title: {
    fontSize: SizeConstants.subtitles,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  message: {
    fontSize: SizeConstants.texts,
    color: Colors.secondaryText,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonConfirm: {
    backgroundColor: Colors.routes,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginRight: 10,
    flex: 1,
  },
  buttonCancel: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginLeft: 10,
    flex: 1,
  },
  buttonSingle: {
    backgroundColor: Colors.routes,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: "center",
    marginLeft: 65,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: SizeConstants.texts,
  },
});

export default CustomAlertComponent;
