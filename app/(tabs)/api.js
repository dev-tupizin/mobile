import { React, useState, useEffect } from "react"
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from "react-native"
import axios from "axios" // lib usada pra fazer chamadas HTTP para API
import { SafeAreaView } from "react-native-safe-area-context" // evita que conteudo fique embaixo do notch/barra do celular

const API_KEY = "cv_BqK7Ga_GxZy_QnZ_XggXCBmiE7kTNJR8LylMDIVp2o_jpkzPMaUC-JZExiWOwNmb"

const api = axios.create({
    baseURL: "https://api-ds.codeverse.dev.br",
    headers: {
        "x-api-key": API_KEY // passo pelo header a key da API
    }
})

async function resolverImageUrl(url) {
    if (!url || typeof url !== "string") return null

    const urlNormalizada = url.includes("commons.wikimedia.org/wiki/Special:FilePath/")
        ? url.replace(/ /g, "_")
        : url

    try {
        const resposta = await fetch(urlNormalizada, { method: "HEAD" })
        return resposta?.url || urlNormalizada
    } catch (error) {
        console.log("Nao foi possivel resolver a URL da imagem:", urlNormalizada)
        return urlNormalizada
    }
}

export default function HeroisListarScreen() {
    const [herois, setHerois] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    async function buscarHerois() {
        setCarregando(true)
        setErro(null)
        try {
            const resposta = await api.get("/api/herois", {
                params: { limit: 50 }
            })
            const heroisComImagemResolvida = await Promise.all(
                resposta.data.data.map(async (heroi) => ({
                    ...heroi,
                    imageUrl: await resolverImageUrl(heroi.imageUrl)
                }))
            )
            setHerois(heroisComImagemResolvida)
        } catch (error) {
            setErro("Não foi possivel carregar herois")
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        buscarHerois()
    }, [])

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listar heróis</Text>
                    <Text style={styles.subtitulo}>GET /api/herois</Text>
                </View>

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    herois.map((heroi) => (
                        <View key={heroi.id} style={styles.card}>
                            <Image source={{ uri: heroi.imageUrl }} height={64} width={64} style={styles.imagem} />
                            <View style={styles.info}>
                                <Text style={styles.titulo}>{heroi.title}</Text>
                                <Text style={styles.categoria}>
                                    {heroi.category} · {heroi.year}
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#759fd4" }, // ocupa a tela toda, cor de fundo clara
    conteudo: { padding: 24, paddingBottom: 48 }, // respiro nas bordas do conteúdo
    header: { marginBottom: 16 }, // espaço abaixo do cabeçalho
    tituloPagina: { fontSize: 24, fontWeight: "800", color: "#102542" }, // título grande e escuro
    subtitulo: { fontSize: 14, color: "#5f6b7a", marginTop: 2 }, // texto menor e mais claro, abaixo do título

    erro: { color: "#c62828", marginTop: 12 }, // texto de erro em vermelho
    card: {
        flexDirection: "row", // imagem e texto lado a lado
        gap: 12, // espaço entre imagem e texto
        marginTop: 12, // espaço entre um card e outro
        backgroundColor: "white",
        borderRadius: 10, // cantos arredondados
        overflow: "hidden", // corta a imagem nos cantos arredondados do card
    },
    imagem: { width: 64, height: 64 }, // tamanho fixo da foto do herói
    info: { flex: 1, justifyContent: "center", paddingRight: 12 }, // ocupa o espaço que sobra ao lado da imagem
    titulo: { fontSize: 16, fontWeight: "700" }, // nome do herói em destaque
    categoria: { fontSize: 13, color: "#64748b" }, // categoria/ano em cinza, menor
});