import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Colors from "../utils/Colors";
import { useSelector } from "react-redux";

const InternetStatusBar = () => {
    const textsLeng = useSelector((state) => state.language.texts); 
    const [isConnected, setIsConnected] = useState(true);
    const [showReconnectMessage, setShowReconnectMessage] = useState(false);
    const fadeAnim = new Animated.Value(1);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                // Si se recupera la conexión, mostrar mensaje azul por 3 segundos
                setShowReconnectMessage(true);
                setIsConnected(true);

                setTimeout(() => {
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    }).start(() => setShowReconnectMessage(false));
                }, 3000);
            } else {
                // Si no hay conexión, mostrar el mensaje rosa permanentemente
                setIsConnected(false);
                setShowReconnectMessage(false);
                fadeAnim.setValue(1);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            {!isConnected && (
                <View style={[styles.container, { backgroundColor: Colors.primary }]}>
                    <Text style={styles.text}>{textsLeng.InternetStatusBar.noConnection}</Text>
                </View>
            )}
            {showReconnectMessage && (
                <Animated.View
                    style={[
                        styles.container,
                        { backgroundColor: Colors.accommodation, opacity: fadeAnim },
                    ]}
                >
                    <Text style={styles.text}>{textsLeng.InternetStatusBar.reconnected}</Text>
                </Animated.View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 50, 
        width: "100%",
        paddingVertical: 10,
        alignItems: "center",
        zIndex: 999,
    },
    text: {
        color: "white",
        fontWeight: "bold",
    },
});

export default InternetStatusBar;
