import { Text } from '@react-navigation/elements';
import {
    SafeAreaView,
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Product } from "../types";

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
    const [fridgeItems, setFridgeItems] = React.useState<Product[]>([]);

    // Si on revient de Scan avec un produit
    React.useEffect(() => {
        if (route.params?.scannedProduct) {
            const newProduct = route.params.scannedProduct as Product;

            setFridgeItems(prev => {
                const existingProductIndex = prev.findIndex(
                    item => item.name === newProduct.name && item.brand === newProduct.brand
                );

                if (existingProductIndex > -1) {
                    // Product already exists, increment quantity
                    const updatedItems = [...prev];
                    updatedItems[existingProductIndex] = {
                        ...updatedItems[existingProductIndex],
                        quantity: updatedItems[existingProductIndex].quantity + 1,
                    };
                    return updatedItems;
                } else {
                    // New product, add to list with quantity 1
                    return [{ ...newProduct, quantity: 1 }, ...prev];
                }
            });
            // Clear the scannedProduct param after processing
            navigation.setParams({ scannedProduct: undefined });
        }
    }, [route.params?.scannedProduct, navigation]);

    const updateProductQuantity = (index: number, change: number) => {
        setFridgeItems(prev => {
            const updatedItems = [...prev];
            const product = updatedItems[index];

            if (product) {
                const newQuantity = product.quantity + change;
                if (newQuantity > 0) {
                    updatedItems[index] = { ...product, quantity: newQuantity };
                } else {
                    // Remove item if quantity is 0 or less
                    updatedItems.splice(index, 1);
                }
            }
            return updatedItems;
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Liste</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Scan')}
                >
                    <MaterialIcons name="add" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={fridgeItems}
                contentContainerStyle={styles.main}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.itemCard}>
                        {item.image && (
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                        )}
                        <View style={styles.productInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            {item.brand && <Text style={styles.itemBrand}>{item.brand}</Text>}
                        </View>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => updateProductQuantity(index, -1)}
                            >
                                <MaterialIcons name="remove" size={20} color={colors.white} />
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{item.quantity}</Text>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => updateProductQuantity(index, 1)}
                            >
                                <MaterialIcons name="add" size={20} color={colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
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
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    productInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.white,
    },
    itemBrand: {
        fontSize: 14,
        color: colors.white,
        opacity: 0.7,
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 12,
    },
    quantityButton: {
        padding: 4,
        borderRadius: 8,
        backgroundColor: colors.mediumlightgreen,
        marginHorizontal: 4,
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.white,
        marginHorizontal: 8,
    },
});
