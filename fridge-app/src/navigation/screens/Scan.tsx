import { Button, Text } from '@react-navigation/elements';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";

const colors = {
    primary: "#38e07b",
    black: "#000000",
    gray900: "#111827",
    white: "#ffffff",
};

export function Scan() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.overlay} />

            <View style={styles.content}>
                <View style={styles.main}>
                    <View style={[styles.scannerBox]}>
                        <MaterialIcons
                            name="qr-code-scanner"
                            size={96}
                            color={colors.white}
                            style={{ opacity: 0.5 }}
                        />
                    </View>
                    <Text style={styles.instructions}>
                        Scannez un aliment pour l'ajouter à votre frigo
                    </Text>
                </View>

                {/* ACTION BUTTONS */}
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.smallActionButton}>
                        <MaterialIcons name="flash-on" size={24} color={colors.white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mainActionButton}>
                        <MaterialIcons name="photo-camera" size={32} color={colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallActionButton}>
                        <MaterialIcons name="flip-camera-android" size={24} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
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
    instructions: {
        color: "rgba(255,255,255,0.8)",
        fontSize: 16,
        textAlign: "center",
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
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.1)",
        backgroundColor: "rgba(0,0,0,0.3)",
        paddingTop: 12,
        paddingBottom: 20,
        paddingHorizontal: 16,
        zIndex: 1,
    },
    footerItem: {
        alignItems: "center",
    },
    footerText: {
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4,
        letterSpacing: 0.2,
    },
    activeScannerIcon: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    activeScannerGlow: {
        position: "absolute",
        top: -16,
        left: -16,
        right: -16,
        bottom: -16,
        borderRadius: 40,
        backgroundColor: "rgba(56,224,123,0.2)",
    },
});