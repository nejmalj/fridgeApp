import { Text } from '@react-navigation/elements';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {useCallback, useState} from "react";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import { Product } from "../types";

const colors = {
    primary: "#38e07b",
    black: "#000000",
    white: "#ffffff",
};

export function Scan() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            setScanned(false);
        }, [])
    );

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.centered}>
                <Text>Votre permission est nécessaire pour utiliser la caméra</Text>
                <TouchableOpacity onPress={requestPermission} style={styles.retryButton}>
                    <Text style={{ color: colors.black }}>Autoriser</Text>
                </TouchableOpacity>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function handleBarCodeScanned({ data }: { data: string }) {
        if (scanned) return;
        setScanned(true);

        try {
            const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
            const result = await response.json();

            if (result.status === 1) {
                const product: Product = {
                    name: result.product.product_name || "Nom inconnu",
                    brand: result.product.brands || "Marque inconnue",
                    image: result.product.image_front_url || null,
                };

                navigation.navigate('Fridge', { scannedProduct: product });
            } else {
                Alert.alert("Produit non trouvé", "Cet aliment n'existe pas dans la base.", [
                    { text: "OK", onPress: () => setScanned(false) },
                ]);
            }
        } catch (error) {
            Alert.alert("Erreur", "Impossible de récupérer le produit.", [
                { text: "OK", onPress: () => setScanned(false) },
            ]);
        }
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onBarcodeScanned={handleBarCodeScanned}
            />

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
    retryButton: {
        marginTop: 16,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
        backgroundColor: colors.primary,
        alignItems: "center",
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});