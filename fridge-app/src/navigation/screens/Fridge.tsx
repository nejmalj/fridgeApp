import { Text } from '@react-navigation/elements';
import {
    SafeAreaView,
    View,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import { Navigation } from "../index";

const colors = {
    primary: "#38e07b",
    neutral900: "#122118",
    neutral800: "#1A2C21",
    neutral700: "#264532",
    white: "#ffffff",
    gray400: "#A0A0A0",
};

const fridgeItems = [
    "Lait",
    "Oeufs",
    "Fromage",
    "Tomates",
    "Salade",
    "Poulet",
];

export function Fridge() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
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
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral900,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        paddingBottom: 12,
        backgroundColor: "rgba(18,33,24,0.8)", // simulate backdrop blur with transparency
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
        backgroundColor: colors.neutral800,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2, // Android shadow
    },
    itemText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.white,
    },
});