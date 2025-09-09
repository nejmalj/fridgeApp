import { Text } from '@react-navigation/elements';
import {
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";

const colors = {
    primary: "#38e07b",
    darkgreen: "#122118",
    mediumgreen: "#1A2C21",
    mediumlightgreen: "#264532",
    white: "#ffffff",
};

export function Fridge() {
    const navigation = useNavigation();
    const route = useRoute();
    const [fridgeItems, setFridgeItems] = React.useState([]);

    // Si on revient de Scan avec un produit
    React.useEffect(() => {
        if (route.params?.scannedProduct) {
            setFridgeItems(prev => [route.params.scannedProduct, ...prev]);
        }
    }, [route.params?.scannedProduct]);

    const removeItem = (index: number) => {
        setFridgeItems(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mon frigo</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Scan')}
                >
                    <MaterialIcons name="add" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.main}>
                {fridgeItems.map((item, index) => (
                    <View key={index} style={styles.itemCard}>
                        <Text style={styles.itemText}>{item}</Text>
                        <TouchableOpacity
                            style={styles.removeButton}
                            onPress={() => removeItem(index)}
                        >
                            <MaterialIcons name="remove" size={20} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkgreen,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        paddingBottom: 12,
        backgroundColor: "rgba(18,33,24,0.8)",
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.white,
        flex: 1,
        textAlign: "center",
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    main: {
        padding: 16,
    },
    itemCard: {
        backgroundColor: colors.mediumgreen,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.white,
    },
    removeButton: {
        padding: 4,
        borderRadius: 8,
        backgroundColor: colors.mediumlightgreen,
    },
});