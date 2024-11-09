import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../utils/Colors";

const CustomAlert = ({
  isVisible,
  onClose,
  title,
  message,
  details,
  iconName = "alert-circle-outline",
  onConfirm,
  onCancel,
  showCancelButton = true,
}) => {
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
        <Ionicons name={iconName} size={50} color={Colors.primary} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        {details && <Text style={styles.details}>{details}</Text>}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonConfirm} onPress={() => { onConfirm(); onClose(); }}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>
          {showCancelButton && (
            <TouchableOpacity style={styles.buttonCancel} onPress={() => { onCancel?.(); onClose(); }}>
              <Text style={styles.buttonText}>Cancelar</Text>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primaryText,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: "center",
    marginBottom: 10,
  },
  details: {
    fontSize: 14,
    color: Colors.grey,
    textAlign: "center",
    marginBottom: 20,
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CustomAlert;
