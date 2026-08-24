import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ModalScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Modal pronta para uso</Text>
        <Text style={styles.description}>
          Use esta tela para mostrar detalhes, formulários ou ações rápidas sem
          sair do fluxo principal.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f3f7ff",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#102542",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#334e68",
  },
});
