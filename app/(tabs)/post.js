import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

// Em produção, uma chave de API não deveria morar direto no código do
// app (dá pra extrair de qualquer APK/IPA instalado). Aqui, como é uma
// API pública de estudo, deixamos direto no código pra simplificar.
const API_KEY = "cv_BqK7Ga_GxZy_QnZ_XggXCBmiE7kTNJR8LylMDIVp2o_jpkzPMaUC-JZExiWOwNmb";

// Mesma instância do axios usada na tela de listagem, com o header já
// configurado — toda chamada feita com "api" já sai autenticada.
const api = axios.create({
  baseURL: "https://api-ds.codeverse.dev.br",
  headers: {
    "x-api-key": API_KEY,
  },
});

// ---------- POST: criar um herói novo ----------
// Payload confirmado pra este tema: title, description e imageUrl
// (genéricos) + universo, editora e grupo_principal (específicos do
// tema heróis). category, year, ano_de_estreia, tipo_de_heroi e
// situacao_do_heroi aparecem na documentação, mas não fazem parte do
// corpo que a rota de criação realmente aceita.
export default function HeroisCriarScreen() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [universo, setUniverso] = useState("");
  const [editora, setEditora] = useState("");
  const [grupoPrincipal, setGrupoPrincipal] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function criarHeroi() {
    if (!titulo) {
      Alert.alert("Preencha pelo menos o título.");
      return;
    }

    setEnviando(true);
    try {
      const resposta = await api.post("/api/herois", {
        title: titulo,
        description: descricao,
        imageUrl: imagemUrl,
        universo,
        editora,
        grupo_principal: grupoPrincipal,
      });

      Alert.alert("Herói criado!", resposta.data.title);
      setTitulo("");
      setDescricao("");
      setImagemUrl("");
      setUniverso("");
      setEditora("");
      setGrupoPrincipal("");
    } catch (e) {
      Alert.alert(
        "Não deu pra criar o herói",
        "A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.header}>
          <Text style={styles.tituloPagina}>Criar herói</Text>
          <Text style={styles.subtitulo}>POST /api/herois</Text>
        </View>

        <Text style={styles.rotulo}>Título</Text>
        <TextInput
          style={styles.campo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Ex: Batman"
        />

        <Text style={styles.rotulo}>Descrição</Text>
        <TextInput
          style={styles.campo}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex: Herói vigilante de Gotham City."
        />

        <Text style={styles.rotulo}>URL da imagem</Text>
        <TextInput
          style={styles.campo}
          value={imagemUrl}
          onChangeText={setImagemUrl}
          placeholder="Ex: https://exemplo.com/batman.jpg"
        />

        <Text style={styles.secao}>Campos específicos do tema heróis</Text>

        <Text style={styles.rotulo}>Universo</Text>
        <TextInput
          style={styles.campo}
          value={universo}
          onChangeText={setUniverso}
          placeholder="Ex: DC"
        />

        <Text style={styles.rotulo}>Editora</Text>
        <TextInput
          style={styles.campo}
          value={editora}
          onChangeText={setEditora}
          placeholder="Ex: DC Comics"
        />

        <Text style={styles.rotulo}>Grupo principal</Text>
        <TextInput
          style={styles.campo}
          value={grupoPrincipal}
          onChangeText={setGrupoPrincipal}
          placeholder="Ex: Batfamily"
        />

        <Pressable style={styles.botao} onPress={criarHeroi} disabled={enviando}>
          <Text style={styles.botaoTexto}>{enviando ? "Enviando..." : "Criar herói"}</Text>
        </Pressable>
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
  secao: {
    fontSize: 14,
    fontWeight: "700",
    color: "#102542",
    marginTop: 8,
    marginBottom: 8,
  },

  rotulo: { fontSize: 13, fontWeight: "600", color: "#334155", marginBottom: 4 },
  campo: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "white",
  },
  botao: {
    backgroundColor: "#1565c0",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: { color: "white", fontWeight: "700" },
});