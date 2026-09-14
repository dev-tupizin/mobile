import { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

// Em produção, uma chave de API não deveria morar direto no código do
// app (dá pra extrair de qualquer APK/IPA instalado). Aqui, como é uma
// API pública de estudo, deixamos direto no código pra simplificar.
const API_KEY = "cv_iSzPVi1qJ50BETTWf79DzoKDbDH9X0TfJzDPDZWz4L2z2yqAcKXAYVRJu9yR32A0";

// Mesma instância do axios usada nas outras telas, com o header já
// configurado — toda chamada feita com "api" já sai autenticada.
const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

// ---------- GET por id: buscar um jogo específico ----------
export default function jogosBuscarScreen() {
  const [id, setId] = useState("");
  const [jogo, setJogo] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [erro, setErro] = useState(null);
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  async function buscarPorId() {
    if (!id) {
      setErro("Digite um id pra buscar.");
      return;
    }

    Keyboard.dismiss();
    setBuscando(true);
    setErro(null);
    setNaoEncontrado(false);
    setJogo(null);

    try {
      // Sem params e sem .data.data: a rota de um item só devolve o
      // próprio objeto do jogo direto no corpo da resposta.
      const resposta = await api.get(`/api/jogos/${id}`);
      setJogo(resposta.data);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setNaoEncontrado(true);
      } else {
        setErro("Não foi possível buscar o jogo. Tenta de novo em instantes.");
      }
    } finally {
      setBuscando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Buscar jogo</Text>
          <Text style={styles.subtitulo}>GET /api/jogos/:id</Text>
        </View>

        <Text style={styles.rotulo}>Id do herói</Text>
        <View style={styles.linhaBusca}>
          <TextInput
            style={styles.campo}
            value={id}
            onChangeText={setId}
            placeholder="Ex: 1"
            keyboardType="numeric"
          />
          <Pressable style={styles.botao} onPress={buscarPorId} disabled={buscando}>
            <Text style={styles.botaoTexto}>{buscando ? "..." : "Buscar"}</Text>
          </Pressable>
        </View>

        {buscando && <ActivityIndicator style={{ marginVertical: 16 }} />}
        {erro && <Text style={styles.erro}>{erro}</Text>}

        {naoEncontrado && (
          <Text style={styles.avisoNaoEncontrado}>
            Nenhum jogo encontrado com o id "{id}".
          </Text>
        )}

        {jogo && (
          <View style={styles.card}>
            <Image source={{ uri: jogo.imageUrl }} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.titulo}>{jogo.title}</Text>
              <Text style={styles.categoria}>
                {jogo.universo} · {jogo.poder}
              </Text>
              <Text style={styles.fraqueza}>Fraqueza: {jogo.fraqueza}</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#759fd4" },
  conteudo: { padding: 24, paddingBottom: 48 },
  header: { marginBottom: 16 },
  tituloPagina: { fontSize: 24, fontWeight: "800", color: "#102542" },
  subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 4 },
  linhaBusca: { flexDirection: "row", gap: 8, alignItems: "flex-start" },
  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#1565c0",
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoTexto: { color: "white", fontWeight: "700" },

  erro: { color: "#c62828", marginTop: 12 },
  avisoNaoEncontrado: { color: "#9a6700", marginTop: 16, fontStyle: "italic" },

  card: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  imagem: { width: 88, height: 88 },
  info: { flex: 1, justifyContent: "center", paddingRight: 12, gap: 2 },
  titulo: { fontSize: 17, fontWeight: "700" },
  categoria: { fontSize: 13, color: "#64748b" },
  fraqueza: { fontSize: 13, color: "#64748b" },
});
