import { Button, Text } from '@react-navigation/elements';
import { useNavigation } from "@react-navigation/native";
import {Animated, SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import { Navigation } from "../index";
import ScrollView = Animated.ScrollView;

const colors = {
    primary: "#38e07b",
    darkgreen: "#122118",
    mediumgreen: "#1b3124",
    mediumlightgreen: "#264532",
    lightgreen: "#96c5a9",
    white: "#ffffff",
};

export function Home() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.innerContainer}>
                <ScrollView
                    contentContainerStyle={styles.main}
                >
                    <View style={[styles.logoCircle]}>
                        <MaterialIcons name="kitchen" size={96} color={colors.primary} />
                    </View>

                    <Text style={[styles.mainTitle]}>
                        Bienvenue chez le Copain du Frigo, ton allié anti-gaspi !
                    </Text>

                    <Text style={[styles.mainSubtitle]}>
                        Scanne tes aliments pour garder le suivi de l'intérieur de ton frigo !
                    </Text>

                    <TouchableOpacity
                        style={[styles.mainButton]}
                        onPress={() => navigation.navigate('Fridge')}
                    >
                        <Text style={[styles.mainButtonText]}>
                            Mon frigo
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkgreen,
    },
    innerContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    iconButton: {
        height: 32,
        width: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    main: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 32,
    },
    logoCircle: {
        height: 160,
        width: 160,
        borderRadius: 80,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.mediumgreen,
    },
    mainTitle: {
        marginTop: 32,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.white,
    },
    mainSubtitle: {
        marginTop: 8,
        fontSize: 16,
        textAlign: "center",
        color: colors.lightgreen,
    },
    mainButton: {
        marginTop: 32,
        height: 48,
        width: "100%",
        maxWidth: 320,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
    },
    mainButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.darkgreen,
    },
});