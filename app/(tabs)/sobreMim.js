import { StyleSheet, Text, View, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const lessons = [
  "Amo Futebol, meu time do coração é o Palmeiras⚽💚",
  "Gosto de jogar jogos competitivos, como: FIFA, CS, Valorant e COD🎮",
  "Gosto de socializar com pessoas e conhecer lugares novos✈️🌐",
  "Sou apaixonado por Tênis👟",
];

export default function LessonsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>SOBRE</Text>
        <Text style={styles.description}>
          Está aba vai falar um pouco sobre a minha pessoa e meus gostos.
              </Text>
              <Image source={require("../../assets/foto.png")}
                  style={styles.image} />

        <View style={styles.list}>
          {lessons.map((lesson, index) => (
            <View key={lesson} style={styles.listItem}>
              <Text style={styles.badge}>{index + 1}</Text>
              <Text style={styles.listText}>{lesson}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#759fd4',
    },
    container: {
        flex: 1,
        padding: 24,
        gap: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#102542',
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#5f4b1b',
    },
    list: {
        gap: 12,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 18,
        backgroundColor: '#ffffff',
    },
    badge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        textAlign: 'center',
        lineHeight: 32,
        fontSize: 14,
        fontWeight: '700',
        color: '#ffffff',
        backgroundColor: '#0f62fe',
    },
    listText: {
        flex: 1,
        fontSize: 15,
        color: '#3d2c00',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#ffffff',
        marginBottom: 4,
        marginLeft: 110,
    },
});
