import { Text } from '@react-navigation/elements';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Button } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from "react";

const colors = {
    primary: "#38e07b",
    black: "#000000",
    white: "#ffffff",
};

export function Scan() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.scannerBox}>
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Autoriser" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                </TouchableOpacity>
            </View>

            <View style={styles.actions}>
                    <TouchableOpacity style={styles.smallActionButton} onPress={toggleCameraFacing}>
                        <MaterialIcons name="flip-camera-android" size={24} color={colors.white} />
                    </TouchableOpacity>
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 0,
    },
    blurredCircle: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 600,
        height: 600,
        marginLeft: -300,
        marginTop: -300,
        borderRadius: 300,
        backgroundColor: "rgba(56,224,123,0.2)",
        zIndex: 0,
    },
    content: {
        flex: 1,
        zIndex: 1,
        flexDirection: "column",
    },
    main: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    scannerBox: {
        width: 256,
        height: 256,
        borderWidth: 4,
        borderStyle: "dashed",
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 32,
        borderColor: colors.primary
    },
    actions: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
        padding: 24,
    },
    smallActionButton: {
        height: 48,
        width: 48,
        borderRadius: 24,
        backgroundColor: "rgba(255,255,255,0.1)",
        alignItems: "center",
        justifyContent: "center",
    },
    mainActionButton: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 64,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        paddingHorizontal: 64,
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});