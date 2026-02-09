import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PhoneAndBirthdayComponent = ({
  tel,
  setTel,
  birthday,
  setBirthday,
}) => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());
  const [error, setError] = useState({});
  const [isValidTel, setIsValidTel] = useState(false);
  const [isValidBirthday, setIsValidBirthday] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    AssignLenguaje(dispatch);
  }, [dispatch]);

  const handleInputChange = (field, value) => {
    if (field === "tel") {
      setTel(value);
    } else {
      setBirthday(value);
    }

    if (typingTimeout) clearTimeout(typingTimeout);

    setError((prevError) => ({
      ...prevError,
      [field]: "", // Elimina el mensaje de error al escribir
    }));

    setTypingTimeout(
      setTimeout(() => {
        verifyInput(field, value);
      }, 1500)
    );
  };

  const verifyInput = (field, value) => {
    switch (field) {
      case "tel":
        const telPattern = /^[0-9]{10}$/;
        const isValidTel = value && telPattern.test(value);
        setIsValidTel(isValidTel);
        setError((prevError) => ({
          ...prevError,
          tel: isValidTel
            ? ""
            : textsLeng.RegisterScreen.enterEmail.texts.invalidPhone,
        }));
        break;
      case "birthday":
        let formattedDate = value;
        const [day, month, year] = value.split("-");
        if (day && day.length === 1) {
          formattedDate = `0${day}-${month}-${year}`;
        }
        if (month && month.length === 1) {
          formattedDate = `${day}-${"0" + month}-${year}`;
        }

        const datePattern = /^\d{2}-\d{2}-\d{4}$/; // Cambiado a \d{2} para día y mes
        const isValidBirthday = formattedDate && datePattern.test(formattedDate);

        if (isValidBirthday) {
          const [formattedDay, formattedMonth, formattedYear] = formattedDate
            .split("-")
            .map((num) => parseInt(num, 10));
          const enteredDate = new Date(
            formattedYear,
            formattedMonth - 1,
            formattedDay
          );
          const currentDate = new Date();
          if (enteredDate > currentDate) {
            setIsValidBirthday(false);
            setError((prevError) => ({
              ...prevError,
              birthday: textsLeng.RegisterScreen.enterEmail.texts.futureDate,
            }));
          } else {
            setIsValidBirthday(true);
            setError((prevError) => ({
              ...prevError,
              birthday: "",
            }));
          }
        } else {
          setIsValidBirthday(false);
          setError((prevError) => ({
            ...prevError,
            birthday: textsLeng.RegisterScreen.enterEmail.texts.dateFormat,
          }));
        }
        break;
      default:
        break;
    }
  };

  const applyDate = (selectedDate) => {
    const formattedDate = `${selectedDate.getDate()}-${
      selectedDate.getMonth() + 1
    }-${selectedDate.getFullYear()}`;
    const unixDate = Math.floor(selectedDate.getTime() / 1000);
    setBirthday(unixDate);
    verifyInput("birthday", formattedDate);
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (event.type === "set" && selectedDate) {
        applyDate(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Contenedor para teléfono y fecha de nacimiento */}
      <View style={styles.rowContainer}>
        {/* Teléfono */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{textsLeng.RegisterScreen.tel}</Text>
          <TextInput
            style={[
              styles.input,
              { borderColor: isValidTel ? Colors.routes : Colors.primary },
            ]}
            placeholderTextColor="#AAAAAA"
            keyboardType="phone-pad"
            value={tel}
            onChangeText={(value) => handleInputChange("tel", value)}
            maxLength={10}
          />
          {error.tel && <Text style={styles.errorText}>{error.tel}</Text>}
        </View>

        {/* Fecha de Nacimiento */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{textsLeng.RegisterScreen.birthday}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.input,
              styles.dateButton,
              { borderColor: isValidBirthday ? Colors.routes : Colors.primary },
            ]}
            onPress={() => {
              setTempDate(birthday ? new Date(birthday * 1000) : new Date());
              setShowDatePicker(true);
            }}
          >
            <Text style={birthday ? styles.dateText : styles.datePlaceholder}>
              {birthday ? new Date(birthday * 1000).toLocaleDateString() : "dd/mm/aaaa"}
            </Text>
          </TouchableOpacity>
          {error.birthday && (
            <Text style={styles.errorText}>{error.birthday}</Text>
          )}
        </View>
      </View>

      {showDatePicker && Platform.OS === "android" && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="calendar"
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal
          isVisible={showDatePicker}
          onBackdropPress={() => setShowDatePicker(false)}
          style={styles.iosModal}
        >
          <View style={styles.iosModalContent}>
            <View style={styles.iosModalHeader}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.iosModalCancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                applyDate(tempDate);
                setShowDatePicker(false);
              }}>
                <Text style={styles.iosModalDone}>Listo</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              maximumDate={new Date()}
              onChange={handleDateChange}
              style={{ height: hp('25%') }}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: hp('1.875%'),
    marginTop: hp('-1%'),
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  inputContainer: {
    width: "48%", 
  },
  label: {
    color: Colors.primary,
    marginBottom: hp('0.625%'),
  },
  input: {
    height: hp('6%'),
    borderWidth: 1,
    borderRadius: wp('1.25%'),
    paddingHorizontal: wp('2.5%'),
    marginBottom: hp('1.875%'),
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 5,
    marginTop: hp('-1.25%'),
    marginBottom: hp('1.25%'),
  },
  iosModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  iosModalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: hp('3%'),
  },
  iosModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  iosModalCancel: {
    fontSize: SizeConstants.texts,
    color: "#999",
  },
  iosModalDone: {
    fontSize: SizeConstants.texts,
    color: Colors.primary,
    fontWeight: "bold",
  },
});

export default PhoneAndBirthdayComponent;
