import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from 'react-redux';
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from '../../lenguage/AssignLenguage';
import SkeletonComponent from "../generals/SkeletonComponent";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ChangePasswordComponent = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isCurrentVisible, setIsCurrentVisible] = useState(false);
    const [isNewVisible, setIsNewVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AssignLenguaje(dispatch);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [dispatch]);

    const validatePasswords = () => {
        if (newPassword !== confirmPassword) {
            setError(textsLeng.ProfileScreen.changePassword.notPassword);
        } else if (newPassword.length < 6) {
            setError(textsLeng.ProfileScreen.changePassword.passwordError);
        } else {
            setError("");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputGroup}>
                {loading ? (
                    <SkeletonComponent width="100%" height={hp('6.25%')} borderRadius={wp('1.25%')} />
                ) : (
                    <>
                        <Text style={styles.label}>
                            {textsLeng.ProfileScreen.changePassword.currentPassword}
                        </Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholderTextColor="#AAAAAA"
                                secureTextEntry={!isCurrentVisible}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                        </View>
                    </>
                )}
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>{textsLeng.ProfileScreen.changePassword.newPassword}</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholderTextColor="#AAAAAA"
                        secureTextEntry={!isNewVisible}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setIsNewVisible(!isNewVisible)}
                    >
                        <Ionicons
                            name={isNewVisible ? "eye-off-outline" : "eye-outline"}
                            size={SizeConstants.iconsCH}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>{textsLeng.ProfileScreen.changePassword.confirmPassword}</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholderTextColor="#AAAAAA"
                        secureTextEntry={!isConfirmVisible}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                    >
                        <Ionicons
                            name={isConfirmVisible ? "eye-off-outline" : "eye-outline"}
                            size={SizeConstants.iconsCH}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={validatePasswords}>
                <Text style={styles.buttonText}>{textsLeng.ProfileScreen.changePassword.change}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
        marginTop: hp('2.5%'),
    },
    inputGroup: {
        marginBottom: hp('2%'),
    },
    label: {
        color: Colors.primary,
        marginBottom: hp('0.625%'),
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: wp('1.25%'),
        paddingHorizontal: wp('2.5%'),
        borderColor: Colors.primary,
    },
    passwordInput: {
        flex: 1,
        height: hp('6.2%'),
        fontSize: SizeConstants.texts,
    },
    errorText: {
        color: "red",
        fontSize: SizeConstants.texts - 5,
        marginTop: hp('-1.875%'),
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: wp('12.5%'),
        paddingVertical: hp('1.25%'),
        width: "50%",
        alignSelf: "center",
        alignItems: "center",
        marginTop: hp('1.5%'),
    },
    buttonText: {
        color: "white",
        fontSize: SizeConstants.texts,
    },
});

export default ChangePasswordComponent;