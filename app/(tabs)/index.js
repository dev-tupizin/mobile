import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const codeverseLogo = require("../../assets/codeverse-logo.png");

export default function HomeScreen() {
  return (
      <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
              <View style={styles.hero}>
                  <Image source={codeverseLogo} style={styles.logo} resizeMode="contain" />
                  <Text style={styles.eyebrow}>React Native + Expo Router</Text>
                  <Text style={styles.title}>Bem-vindo ao meu app!</Text>
                  <Text style={styles.description}>
                      Minha primeira Interface em React Native, usando a lógica de negócio desde a primeira aula.
                  </Text>
              </View>

              <View style={styles.card}>
                  <Text style={styles.cardTitle}>Redes Sociais e Contatos</Text>
                  <Text style={styles.cardItem}>• Telefone: (19) 97108-1101📞</Text>
                  <Text style={styles.cardItem}>• Instagram: cau.a_zin📷 </Text>
                  <Text style={styles.cardItem}>• Email: cauatupinamba@gmail.com✉️ </Text>
              </View>
          </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#759fd4",
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  hero: {
    alignItems: "center",
    gap: 10,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#0f62fe",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 4,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#d0e2ff",
    textAlign: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#edf5ff",
    textAlign: "center",
  },
  card: {
    gap: 8,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#102542",
  },
  cardItem: {
    fontSize: 15,
    color: "#334e68",
  },
});
