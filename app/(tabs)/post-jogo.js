import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';

const API_KEY = 'cv_iiGxAQJtukYyu3FWigTuP6YGn0p10Bxgxjdn16DF13ZSlBR3g7Msg-txhMsixadT';

const api = axios.create({
    baseURL: 'https://api-ds.codeverse.dev.br',
    headers: {
        'x-api-key': API_KEY,
    },
});

export default function JogosCriarScreen() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');
    const [estudio, setEstudio] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [genero, setGenero] = useState('');

    const [anoLancamento, setAnoLancamento] = useState('');

    const [enviando, setEnviando] = useState(false);

    async function criarJogo() {
        if (!titulo) {
            Alert.alert('Preencha pelo menos o título.');
            return;
        }

        setEnviando(true);
        try {
            const resposta = await api.post('/api/jogos', {
                title: titulo,
                description: descricao,
                imageUrl: imagemUrl,
                desenvolvedora: estudio,
                plataforma: plataforma,
                genero: genero,
                ano_lancamento: anoLancamento,
            });

            Alert.alert('Jogo criado!', resposta.data.title);

            setTitulo('');
            setDescricao('');
            setImagemUrl('');
            setEstudio('');
            setPlataforma('');
            setGenero('');
            setAnoLancamento('');
        } catch (e) {
            console.log('ERRO DA API:', e.response?.data || e.message);
            Alert.alert(
                'Não deu pra criar o jogo',
                'A API respondeu com erro. Confere se todos os campos estão certinhos e tenta de novo.',
            );
        } finally {
            setEnviando(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.header}>
                    <Text style={styles.tituloPagina}>Criar jogo</Text>
                    <Text style={styles.subtitulo}>POST /api/jogos</Text>
                </View>

                <Text style={styles.rotulo}>Título</Text>
                <TextInput
                    style={styles.campo}
                    value={titulo}
                    onChangeText={setTitulo}
                    placeholder="Ex: Batman: Arkham Knight"
                />

                <Text style={styles.rotulo}>Descrição</Text>
                <TextInput
                    style={styles.campo}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Ex: O Cavaleiro das Trevas enfrenta o Espantalho..."
                />

                <Text style={styles.rotulo}>URL da imagem</Text>
                <TextInput
                    style={styles.campo}
                    value={imagemUrl}
                    onChangeText={setImagemUrl}
                    placeholder="Ex: https://exemplo.com/batman.jpg"
                />

                <Text style={styles.secao}>Campos específicos do tema jogos</Text>

                <Text style={styles.rotulo}>Desenvolvedora (Estúdio)</Text>
                <TextInput
                    style={styles.campo}
                    value={estudio}
                    onChangeText={setEstudio}
                    placeholder="Ex: Rockstar Games"
                />

                <Text style={styles.rotulo}>Plataforma</Text>
                <TextInput
                    style={styles.campo}
                    value={plataforma}
                    onChangeText={setPlataforma}
                    placeholder="Ex: XBOX"
                />

                <Text style={styles.rotulo}>Gênero</Text>
                <TextInput
                    style={styles.campo}
                    value={genero}
                    onChangeText={setGenero}
                    placeholder="Ex: RPG"
                />

                <Text style={styles.rotulo}>Ano de Lançamento</Text>
                <TextInput
                    style={styles.campo}
                    value={anoLancamento}
                    onChangeText={setAnoLancamento}
                    placeholder="Ex: 2015"
                    keyboardType="numeric"
                />

                <Pressable style={styles.botao} onPress={criarJogo} disabled={enviando}>
                    <Text style={styles.botaoTexto}>{enviando ? 'Enviando...' : 'Criar jogo'}</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#759fd4' },
    conteudo: { padding: 24, paddingBottom: 48 },
    header: { marginBottom: 16 },
    tituloPagina: { fontSize: 24, fontWeight: '800', color: '#102542' },
    subtitulo: { fontSize: 14, color: '#5f6b7a', marginTop: 2 },
    secao: {
        fontSize: 14,
        fontWeight: '700',
        color: '#102542',
        marginTop: 8,
        marginBottom: 8,
    },

    rotulo: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 4 },
    campo: {
        borderWidth: 1,
        borderColor: '#759fd4',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    botao: {
        backgroundColor: '#1565c0',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    botaoTexto: { color: 'white', fontWeight: '700' },
});
