import { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

// API KEY
const API_KEY = 'cv_iiGxAQJtukYyu3FWigTuP6YGn0p10Bxgxjdn16DF13ZSlBR3g7Msg-txhMsixadT';

// Instância do axios
const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});

// ---------- PUT: editar um jogo existente ----------

export default function JogosEditarScreen() {
    const [jogos, setJogos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const [selecionado, setSelecionado] = useState(null);

    const [nome, setNome] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');
    const [genero, setGenero] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [descricao, setDescricao] = useState('');
    const [salvando, setSalvando] = useState(false);

    // ============================
    // BUSCAR JOGOS
    // ============================

    async function buscarJogos() {
        setCarregando(true);
        setErro(null);

        try {
            const resposta = await api.get('/api/jogos', {
                params: {
                    limit: 50,
                },
            });

            console.log('JOGOS:', resposta.data);

            setJogos(resposta.data.data || []);
        } catch (e) {
            console.log('ERRO AO BUSCAR JOGOS:');
            console.log('STATUS:', e.response?.status);
            console.log('DADOS:', e.response?.data);
            console.log('MENSAGEM:', e.message);

            setErro(
                `Erro ${e.response?.status || ''}: ${
                    e.response?.data?.message ||
                    e.response?.data?.error ||
                    'Não foi possível carregar os jogos.'
                }`,
            );
        } finally {
            setCarregando(false);
        }
    }

    // Executa quando a tela abre
    useEffect(() => {
        buscarJogos();
    }, []);

    // ============================
    // SELECIONAR JOGO
    // ============================

    function selecionarJogo(jogo) {
        setSelecionado(jogo);

        setNome(jogo.title ?? '');
        setImagemUrl(jogo.imageUrl ?? '');
        setGenero(jogo.genero ?? '');
        setPlataforma(jogo.plataforma ?? '');
        setDescricao(jogo.descricao ?? '');
    }

    // ============================
    // SALVAR EDIÇÃO
    // ============================

    async function salvarEdicao() {
        if (!selecionado) return;

        if (!nome.trim()) {
            Alert.alert('Atenção', 'Preencha pelo menos o nome do jogo.');
            return;
        }

        setSalvando(true);

        try {
            // IMPORTANTE:
            // O caminho precisa estar entre crases.
            const resposta = await api.put(`/api/jogos/${selecionado.id}`, {
                title: nome,
                imageUrl: imagemUrl,
                genero: genero,
                plataforma: plataforma,
                descricao: descricao,
            });

            console.log('JOGO ATUALIZADO:', resposta.data);

            Alert.alert('Jogo atualizado!', resposta.data?.data?.title || nome);

            // Volta para a lista
            setSelecionado(null);

            // Atualiza os jogos
            buscarJogos();
        } catch (e) {
            console.log('ERRO AO ATUALIZAR JOGO:');
            console.log('STATUS:', e.response?.status);
            console.log('DADOS:', e.response?.data);
            console.log('MENSAGEM:', e.message);

            Alert.alert(
                'Não deu para atualizar o jogo',
                e.response?.data?.message ||
                    e.response?.data?.error ||
                    'A API respondeu com erro. Confira os campos e tente novamente.',
            );
        } finally {
            setSalvando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                {/* CABEÇALHO */}

                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>🎮 Editar jogo</Text>

                    <Text style={styles.subtitulo}>PUT /api/jogos/:id</Text>
                </View>

                {/* ============================
            LISTA DE JOGOS
        ============================ */}

                {!selecionado && (
                    <>
                        <Text style={styles.instrucao}>Toque em um jogo para editar:</Text>

                        {carregando && (
                            <ActivityIndicator color="#38bdf8" style={{ marginVertical: 20 }} />
                        )}

                        {erro && (
                            <View style={styles.caixaErro}>
                                <Text style={styles.erro}>{erro}</Text>

                                <Pressable style={styles.botaoTentar} onPress={buscarJogos}>
                                    <Text style={styles.botaoTentarTexto}>Tentar novamente</Text>
                                </Pressable>
                            </View>
                        )}

                        {!carregando &&
                            !erro &&
                            jogos.map((item) => (
                                <Pressable
                                    key={item.id}
                                    style={styles.linha}
                                    onPress={() => selecionarJogo(item)}>
                                    <Text style={styles.linhaTitulo}>🎮 {item.title}</Text>

                                    <Text style={styles.linhaSeta}>editar ›</Text>
                                </Pressable>
                            ))}

                        {!carregando && !erro && jogos.length === 0 && (
                            <Text style={styles.semJogos}>Nenhum jogo encontrado.</Text>
                        )}
                    </>
                )}

                {/* ============================
            FORMULÁRIO DE EDIÇÃO
        ============================ */}

                {selecionado && (
                    <>
                        <Pressable onPress={() => setSelecionado(null)} style={styles.voltar}>
                            <Text style={styles.voltarTexto}>‹ voltar para lista</Text>
                        </Pressable>

                        {/* NOME */}

                        <Text style={styles.rotulo}>Nome do jogo</Text>

                        <TextInput
                            style={styles.campo}
                            value={nome}
                            onChangeText={setNome}
                            placeholder="Ex: Minecraft"
                            placeholderTextColor="#64748b"
                        />

                        {/* IMAGEM */}

                        <Text style={styles.rotulo}>URL da imagem</Text>

                        <TextInput
                            style={styles.campo}
                            value={imagemUrl}
                            onChangeText={setImagemUrl}
                            placeholder="Ex: https://exemplo.com/jogo.jpg"
                            placeholderTextColor="#64748b"
                            autoCapitalize="none"
                        />

                        {/* GÊNERO */}

                        <Text style={styles.rotulo}>Gênero</Text>

                        <TextInput
                            style={styles.campo}
                            value={genero}
                            onChangeText={setGenero}
                            placeholder="Ex: Aventura"
                            placeholderTextColor="#64748b"
                        />

                        {/* PLATAFORMA */}

                        <Text style={styles.rotulo}>Plataforma</Text>

                        <TextInput
                            style={styles.campo}
                            value={plataforma}
                            onChangeText={setPlataforma}
                            placeholder="Ex: PC, PlayStation, Xbox"
                            placeholderTextColor="#64748b"
                        />

                        {/* DESCRIÇÃO */}

                        <Text style={styles.rotulo}>Descrição</Text>

                        <TextInput
                            style={[styles.campo, styles.campoDescricao]}
                            value={descricao}
                            onChangeText={setDescricao}
                            placeholder="Digite uma descrição do jogo"
                            placeholderTextColor="#64748b"
                            multiline
                        />

                        {/* BOTÃO */}

                        <Pressable
                            style={[styles.botao, salvando && styles.botaoDesativado]}
                            onPress={salvarEdicao}
                            disabled={salvando}>
                            <Text style={styles.botaoTexto}>
                                {salvando ? 'Salvando...' : '🎮 Salvar alterações'}
                            </Text>
                        </Pressable>
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

// ================================
// ESTILOS
// ================================

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#759fd4',
    },

    conteudo: {
        padding: 24,
        paddingBottom: 48,
    },

    header: {
        marginBottom: 20,
    },

    tituloPagina: {
        fontSize: 26,
        fontWeight: '800',
        color: '#e2e8f0',
    },

    subtitulo: {
        fontSize: 14,
        color: '#94a3b8',
        marginTop: 4,
    },

    instrucao: {
        fontSize: 15,
        color: '#e2e8f0',
        marginBottom: 10,
    },

    caixaErro: {
        backgroundColor: '#450a0a',
        borderWidth: 1,
        borderColor: '#7f1d1d',
        borderRadius: 10,
        padding: 14,
        marginTop: 10,
        marginBottom: 14,
    },

    erro: {
        color: '#fca5a5',
        marginBottom: 12,
    },

    botaoTentar: {
        backgroundColor: '#dc2626',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    botaoTentarTexto: {
        color: 'white',
        fontWeight: '700',
    },

    linha: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#759fd4',
    },

    linhaTitulo: {
        fontSize: 16,
        fontWeight: '700',
        color: '#759fd4',
    },

    linhaSeta: {
        fontSize: 13,
        color: '#759fd4',
        fontWeight: '700',
    },

    semJogos: {
        color: '#e2e8f0',
        textAlign: 'center',
        marginTop: 20,
    },

    voltar: {
        marginBottom: 20,
    },

    voltarTexto: {
        color: '#f7f9fa',
        fontWeight: '700',
        fontSize: 15,
    },

    rotulo: {
        fontSize: 13,
        fontWeight: '700',
        color: '#1c5294',
        marginBottom: 5,
    },

    campo: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 11,
        marginBottom: 14,
        backgroundColor: '#e2e8f0',
        color: '#759fd4',
    },

    campoDescricao: {
        minHeight: 100,
        textAlignVertical: 'top',
    },

    botao: {
        backgroundColor: '#2063bb',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 6,
    },

    botaoDesativado: {
        opacity: 0.5,
    },

    botaoTexto: {
        color: 'white',
        fontWeight: '800',
        fontSize: 15,
    },
});
