import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";

const PhoneAndBirthdayComponent = ({
  tel,
  setTel,
  birthday,
  setBirthday,
}) => {
  const dispatch = useDispatch();
  const textsLeng = useSelector((state) => state.language.texts);
  const [showDatePicker, setShowDatePicker] = useState(false);
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
            : textsLeng.RegisterScreen.invalidPhone,
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

        const datePattern = /^\d{2}-\d{2}-\d{4}$/;
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
              birthday: textsLeng.RegisterScreen.futureDate,
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
            birthday: textsLeng.RegisterScreen.dateFormat,
          }));
        }
        break;
      default:
        break;
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = `${selectedDate.getDate()}-${
        selectedDate.getMonth() + 1
      }-${selectedDate.getFullYear()}`;
      const unixDate = Math.floor(selectedDate.getTime() / 1000); // Convertir a UNIX
      setBirthday(unixDate); // Guardar la fecha en formato UNIX
      verifyInput("birthday", formattedDate);
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
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={[
                styles.input,
                { borderColor: isValidBirthday ? Colors.routes : Colors.primary },
              ]}
              placeholderTextColor="#AAAAAA"
              value={birthday ? new Date(birthday * 1000).toLocaleDateString() : ""} // Convertir UNIX a fecha legible
              editable={false}
            />
          </TouchableOpacity>
          {error.birthday && (
            <Text style={styles.errorText}>{error.birthday}</Text>
          )}
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    marginBottom: 15,
    marginTop: -5
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
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    fontSize: SizeConstants.texts - 5,
    marginTop: -12,
    marginBottom: 10,
  },
});

export default PhoneAndBirthdayComponent;