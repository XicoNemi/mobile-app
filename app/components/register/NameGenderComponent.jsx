import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GENDER_OPTIONS = [
    { label: "Masculino", value: "Masculino" },
    { label: "Femenino", value: "Femenino" },
    { label: "Otro", value: "Otro" },
];

const NameGenderComponent = ({ name, setName, lastName, setLastName, gender, setGender }) => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const [error, setError] = useState({});
    const [isValidName, setIsValidName] = useState(false);
    const [isValidLastName, setIsValidLastName] = useState(false);
    const [isValidGender, setIsValidGender] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [hasInteractedWithGender, setHasInteractedWithGender] = useState(false);
    const [showGenderModal, setShowGenderModal] = useState(false);
    const [tempGender, setTempGender] = useState(gender);

    useEffect(() => {
        AssignLenguaje(dispatch);
    }, [dispatch]);

    const handleInputChange = (field, value) => {
        if (field === "name") {
            setName(value);
        } else {
            setLastName(value);
        }

        if (typingTimeout) clearTimeout(typingTimeout);

        setError((prevError) => ({
            ...prevError,
            [field]: "",
        }));

        setTypingTimeout(
            setTimeout(() => {
                verifyInput(field, value);
            }, 1500)
        );
    };

    const verifyInput = (field, value) => {
        switch (field) {
            case "name":
                const isValidName = value && value.length >= 4;
                setIsValidName(isValidName);
                setError((prevError) => ({
                    ...prevError,
                    name: isValidName ? "" : textsLeng.RegisterScreen.nameError,
                }));
                break;
            case "lastName":
                const isValidLastName = value && value.length >= 4;
                setIsValidLastName(isValidLastName);
                setError((prevError) => ({
                    ...prevError,
                    lastName: isValidLastName
                        ? ""
                        : textsLeng.RegisterScreen.lastNameError,
                }));
                break;
            case "gender":
                const isValidGender = value !== "" && value !== textsLeng.RegisterScreen.selectGender;
                setIsValidGender(isValidGender);
                setError((prevError) => ({
                    ...prevError,
                    gender: isValidGender || !hasInteractedWithGender ? "" : textsLeng.RegisterScreen.genderError,
                }));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        verifyInput("gender", gender);
    }, [gender]);

    return (
        <View style={styles.container}>
            {/* Nombre */}
            <Text style={styles.label}>{textsLeng.RegisterScreen.name}</Text>
            <TextInput
                style={[
                    styles.input,
                    { borderColor: isValidName ? Colors.routes : Colors.primary },
                ]}
                placeholderTextColor="#AAAAAA"
                value={name}
                onChangeText={(value) => handleInputChange("name", value)}
            />
            {error.name && <Text style={styles.errorText}>{error.name}</Text>}

            <View style={styles.row}>
                {/* Apellido */}
                <View style={styles.halfContainer}>
                    <Text style={styles.label}>{textsLeng.RegisterScreen.lastName}</Text>
                    <TextInput
                        style={[
                            styles.input,
                            { borderColor: isValidLastName ? Colors.routes : Colors.primary },
                        ]}
                        placeholderTextColor="#AAAAAA"
                        value={lastName}
                        onChangeText={(value) => handleInputChange("lastName", value)}
                    />
                    {error.lastName && <Text style={styles.errorText}>{error.lastName}</Text>}
                </View>

                {/* Género */}
                <View style={styles.halfContainer}>
                    <Text style={styles.label}>{textsLeng.RegisterScreen.gender}</Text>
                    {Platform.OS === "ios" ? (
                        <>
                            <TouchableOpacity
                                style={[
                                    styles.iosPickerButton,
                                    { borderColor: isValidGender ? Colors.routes : Colors.primary },
                                ]}
                                onPress={() => {
                                    setTempGender(gender || GENDER_OPTIONS[0].value);
                                    setShowGenderModal(true);
                                }}
                            >
                                <Text style={[
                                    styles.iosPickerText,
                                    !gender && styles.iosPickerPlaceholder,
                                ]}>
                                    {gender || textsLeng.RegisterScreen.selectGender}
                                </Text>
                            </TouchableOpacity>
                            <Modal
                                isVisible={showGenderModal}
                                onBackdropPress={() => setShowGenderModal(false)}
                                style={styles.iosModal}
                            >
                                <View style={styles.iosModalContent}>
                                    <View style={styles.iosModalHeader}>
                                        <TouchableOpacity onPress={() => setShowGenderModal(false)}>
                                            <Text style={styles.iosModalCancel}>Cancelar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => {
                                            setGender(tempGender);
                                            setHasInteractedWithGender(true);
                                            verifyInput("gender", tempGender);
                                            setShowGenderModal(false);
                                        }}>
                                            <Text style={styles.iosModalDone}>Listo</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Picker
                                        selectedValue={tempGender}
                                        onValueChange={(itemValue) => setTempGender(itemValue)}
                                    >
                                        {GENDER_OPTIONS.map((opt) => (
                                            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                                        ))}
                                    </Picker>
                                </View>
                            </Modal>
                        </>
                    ) : (
                        <View style={[
                            styles.pickerContainer,
                            { borderColor: isValidGender ? Colors.routes : Colors.primary },
                        ]}>
                            <Picker
                                selectedValue={gender}
                                style={styles.picker}
                                onValueChange={(itemValue) => {
                                    setGender(itemValue);
                                    setHasInteractedWithGender(true);
                                    verifyInput("gender", itemValue);
                                }}
                            >
                                <Picker.Item label={textsLeng.RegisterScreen.selectGender} value="" color={Colors.primary} />
                                {GENDER_OPTIONS.map((opt) => (
                                    <Picker.Item key={opt.value} label={opt.label} value={opt.value} color={Colors.primary} />
                                ))}
                            </Picker>
                        </View>
                    )}
                    {error.gender && <Text style={styles.errorText}>{error.gender}</Text>}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        marginBottom: hp('1%'),
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    halfContainer: {
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
    pickerContainer: {
        borderWidth: 1,
        borderRadius: wp('1.25%'),
        borderColor: Colors.primary,
        marginBottom: hp('1.875%'),
    },
    picker: {
        height: hp('6%'),
        width: "100%",
    },
    iosPickerButton: {
        height: hp('6%'),
        borderWidth: 1,
        borderRadius: wp('1.25%'),
        paddingHorizontal: wp('2.5%'),
        marginBottom: hp('1.875%'),
        justifyContent: "center",
    },
    iosPickerText: {
        fontSize: SizeConstants.texts,
        color: Colors.primary,
    },
    iosPickerPlaceholder: {
        color: "#AAAAAA",
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

export default NameGenderComponent;
