import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../utils/Colors";
import SizeConstants from "../../utils/SizeConstants";
import AssignLenguaje from "../../lenguage/AssignLenguage";
import SkeletonComponent from "../generals/SkeletonComponent";

const ProfileDetailsComponent = ({ toggleLanguage, handleLogout }) => {
    const dispatch = useDispatch();
    const textsLeng = useSelector((state) => state.language.texts);
    const language = useSelector((state) => state.language.language);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AssignLenguaje(dispatch);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <View style={styles.detailRow}>
                {loading ? (
                    <SkeletonComponent
                        width="100%"
                        height={45}
                    />
                ) : (
                    <>
                        <Ionicons name="mail" size={SizeConstants.iconsCH} color="#000" />
                        <View style={styles.detailColumn}>
                            <Text style={styles.label}>{textsLeng.ProfileScreen.email}</Text>
                            <Text style={styles.value}>neftaliarturohernandez@gmail.com</Text>
                        </View>
                    </>
                )}
            </View>
            <View style={styles.detailRow}>
                {loading ? (
                    <SkeletonComponent
                        width="100%"
                        height={45}
                    />
                ) : (
                    <>
                        <Ionicons name="call-sharp" size={SizeConstants.iconsCH} color="#000" />
                        <View style={styles.detailColumn}>
                            <Text style={styles.label}>{textsLeng.ProfileScreen.phoneNum}</Text>
                            <Text style={styles.value}>7641146446</Text>
                        </View>
                    </>
                )}
            </View>
            <View style={styles.switchRow}>
                <Ionicons name="globe-sharp" size={SizeConstants.iconsCH} color="#000" />
                <Text style={styles.labelLenguage}>
                    {textsLeng.ProfileScreen.changeLenguage}
                </Text>
                <View style={styles.switchContainer}>
                    <Switch
                        trackColor={{ false: "#767577", true: Colors.primary }}
                        thumbColor={language === "spa" ? "#000" : "#000"}
                        onValueChange={toggleLanguage}
                        value={language === "en"}
                        style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }] }}
                    />
                </View>
            </View>
            <View style={styles.logoutButtonContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>
                        {textsLeng.ProfileScreen.logout}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "90%",
        alignSelf: "center",
        marginTop: 20,
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        borderBottomWidth: 0.8,
        borderBottomColor: "#E0E0E0",
        paddingBottom: 15,
    },
    detailColumn: {
        marginLeft: 20,
    },
    label: {
        fontSize: SizeConstants.textsM,
        color: "#000",
        marginBottom: 5,
    },
    labelLenguage: {
        color: "#000",
        marginStart: 20,
        fontSize: SizeConstants.textsM,
    },
    value: {
        fontSize: SizeConstants.texts,
        color: Colors.primary,
    },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 10,
    },
    switchContainer: {
        marginStart: 100,
    },
    logoutButtonContainer: {
        marginTop: 120,
        width: "50%",
        alignSelf: "center",
    },
    logoutButton: {
        backgroundColor: Colors.primary,
        borderRadius: 50,
        paddingVertical: 10,
        width: "100%",
        alignItems: "center",
    },
    logoutButtonText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: SizeConstants.texts,
    },
});

export default ProfileDetailsComponent;
