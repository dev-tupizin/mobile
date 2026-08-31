import { React, useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios'; // lib usada pra fazer chamadas HTTP para API
import { SafeAreaView } from 'react-native-safe-area-context'; // evita que conteudo fique embaixo do notch/barra do celular

const API_KEY = 'cv_BqK7Ga_GxZy_QnZ_XggXCBmiE7kTNJR8LylMDIVp2o_jpkzPMaUC-JZExiWOwNmb'; // chave da API, que você deve gerar no site do Codeverse

const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY, // passo pelo header a key da API
    },
});

export default function JogosListarScreen() {
    const [jogos, setJogos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    async function buscarJogos() {
        setCarregando(true);
        setErro(null);
        try {
            const resposta = await api.get('/api/jogos', {
                params: { limit: 50 },
            });
            setJogos(resposta.data.data);
        } catch (error) {
            setErro('Não foi possivel carregar jogos');
        } finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        buscarJogos();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Listar jogos</Text>
                    <Text style={styles.subtitulo}>GET /api/jogos</Text>
                </View>

                {carregando && <ActivityIndicator style={{ marginVertical: 16 }} />}

                {erro && <Text style={styles.erro}>{erro}</Text>}

                {!carregando &&
                    jogos.map((jogo) => (
                        <View key={jogo.id} style={styles.card}>
                            <Image
                                source={{ uri: jogo.imageUrl }}
                                height={64}
                                width={64}
                                style={styles.imagem}
                            />
                            <View style={styles.info}>
                                <Text style={styles.titulo}>{jogo.title}</Text>
                                <Text style={styles.categoria}>
                                    {jogo.category} · {jogo.year}
                                </Text>
                            </View>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#759fd4' }, // ocupa a tela toda, cor de fundo clara
    conteudo: { padding: 24, paddingBottom: 48 }, // respiro nas bordas do conteúdo
    header: { marginBottom: 16 }, // espaço abaixo do cabeçalho
    tituloPagina: { fontSize: 24, fontWeight: '800', color: '#102542' }, // título grande e escuro
    subtitulo: { fontSize: 14, color: '#5f6b7a', marginTop: 2 }, // texto menor e mais claro, abaixo do título

    erro: { color: '#c62828', marginTop: 12 }, // texto de erro em vermelho
    card: {
        flexDirection: 'row', // imagem e texto lado a lado
        gap: 12, // espaço entre imagem e texto
        marginTop: 12, // espaço entre um card e outro
        backgroundColor: 'white',
        borderRadius: 10, // cantos arredondados
        overflow: 'hidden', // corta a imagem nos cantos arredondados do card
    },
    imagem: { width: 64, height: 64 }, // tamanho fixo da foto do herói
    info: { flex: 1, justifyContent: 'center', paddingRight: 12 }, // ocupa o espaço que sobra ao lado da imagem
    titulo: { fontSize: 16, fontWeight: '700' }, // nome do herói em destaque
    categoria: { fontSize: 13, color: '#64748b' }, // categoria/ano em cinza, menor
});
