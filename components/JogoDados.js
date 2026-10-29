import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Dado from "./Dado";

const TOTAL_RODADAS = 5;
const TOTAL_FACES_DADO = 6;

const rolarDado = () =>
  Math.floor(Math.random() * TOTAL_FACES_DADO) + 1;

function Botao({ titulo, onPress, disabled, dourado = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.botao,
        dourado && styles.botaoDourado,
        disabled && styles.botaoDesabilitado,
      ]}
    >
      <Text
        style={[
          styles.botaoTexto,
          dourado && styles.textoDourado,
          disabled && styles.textoDesabilitado,
        ]}
      >
        {titulo}
      </Text>
    </Pressable>
  );
}

export default function JogoDados() {
  const [dadosJogador1, setDadosJogador1] = useState([1, 1]);
  const [dadosJogador2, setDadosJogador2] = useState([1, 1]);
  const [jogadorDaVez, setJogadorDaVez] = useState(1);
  const [resultado, setResultado] = useState("");
  const [resultadoRodada, setResultadoRodada] = useState("");
  const [rodada, setRodada] = useState(1);
  const [vitoriasJogador1, setVitoriasJogador1] = useState(0);
  const [vitoriasJogador2, setVitoriasJogador2] = useState(0);
  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  function jogarJogador1() {
    setDadosJogador1([rolarDado(), rolarDado()]);
    setResultadoRodada("");
    setJogadorDaVez(2);
  }

  function jogarJogador2() {
    const dados = [rolarDado(), rolarDado()];
    setDadosJogador2(dados);

    const somaJogador1 = dadosJogador1[0] + dadosJogador1[1];
    const somaJogador2 = dados[0] + dados[1];

    let novasVitoriasJogador1 = vitoriasJogador1;
    let novasVitoriasJogador2 = vitoriasJogador2;
    let mensagem = "Empate!";

    if (somaJogador1 > somaJogador2) {
      mensagem = "Jogador 1 venceu!";
      novasVitoriasJogador1++;
      setVitoriasJogador1(novasVitoriasJogador1);
    } else if (somaJogador2 > somaJogador1) {
      mensagem = "Jogador 2 venceu!";
      novasVitoriasJogador2++;
      setVitoriasJogador2(novasVitoriasJogador2);
    }

    setResultadoRodada(mensagem);

    if (rodada === TOTAL_RODADAS) {
      setJogoFinalizado(true);

      if (novasVitoriasJogador1 > novasVitoriasJogador2) {
        setResultado("Jogador 1 venceu o jogo!");
      } else if (novasVitoriasJogador2 > novasVitoriasJogador1) {
        setResultado("Jogador 2 venceu o jogo!");
      } else {
        setResultado("Empate geral!");
      }
    } else {
      setRodada(rodada + 1);
      setJogadorDaVez(1);
    }
  }

  function jogarNovamente() {
    setDadosJogador1([1, 1]);
    setDadosJogador2([1, 1]);
    setJogadorDaVez(1);
    setResultado("");
    setResultadoRodada("");
    setRodada(1);
    setVitoriasJogador1(0);
    setVitoriasJogador2(0);
    setJogoFinalizado(false);
  }

  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Jogo de Dados</Text>

          <Text style={styles.rodada}>
            Rodada {rodada} / {TOTAL_RODADAS}
          </Text>

          <View style={styles.placar}>
            <View style={styles.itemPlacar}>
              <Text style={styles.nomePlacar}>Jogador 1</Text>
              <Text style={styles.pontos}>{vitoriasJogador1}</Text>
            </View>

            <View style={styles.linhaPlacar} />

            <View style={styles.itemPlacar}>
              <Text style={styles.nomePlacar}>Jogador 2</Text>
              <Text style={styles.pontos}>{vitoriasJogador2}</Text>
            </View>
          </View>

          <View style={styles.jogadores}>
            <View style={styles.jogador}>
              <Text style={styles.nome}>Jogador 1</Text>

              <View style={styles.dados}>
                {jogadorDaVez === 1 && !jogoFinalizado ? (
                  <>
                    <Text style={styles.oculto}>❌</Text>
                    <Text style={styles.oculto}>❌</Text>
                  </>
                ) : (
                  <>
                    <Dado valor={dadosJogador1[0]} />
                    <Dado valor={dadosJogador1[1]} />
                  </>
                )}
              </View>

              <Botao
                titulo="Jogar"
                onPress={jogarJogador1}
                disabled={jogadorDaVez !== 1 || jogoFinalizado}
              />
            </View>

            <View style={styles.divisor} />

            <View style={styles.jogador}>
              <Text style={styles.nome}>Jogador 2</Text>

              <View style={styles.dados}>
                {jogadorDaVez === 2 && !jogoFinalizado ? (
                  <>
                    <Text style={styles.oculto}>❌</Text>
                    <Text style={styles.oculto}>❌</Text>
                  </>
                ) : (
                  <>
                    <Dado valor={dadosJogador2[0]} />
                    <Dado valor={dadosJogador2[1]} />
                  </>
                )}
              </View>

              <Botao
                titulo="Jogar"
                onPress={jogarJogador2}
                disabled={jogadorDaVez !== 2 || jogoFinalizado}
              />
            </View>
          </View>

          <View style={styles.mensagem}>
            <Text style={styles.tituloMensagem}>MENSAGEM</Text>
            <Text style={styles.textoMensagem}>
              {resultadoRodada}
            </Text>
          </View>

          {jogoFinalizado && (
            <View style={styles.fimDeJogo}>
              <Text style={styles.tituloFinal}>FIM DE JOGO</Text>
              <Text style={styles.textoFinal}>{resultado}</Text>

              <Botao
                titulo="Jogar Novamente"
                onPress={jogarNovamente}
                dourado
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const VERDE = "#01160f";
const CREME = "#fbf7ef";
const DOURADO = "#d4af37";

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: VERDE,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 460,
    backgroundColor: CREME,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(212,175,55,0.5)",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: VERDE,
    textAlign: "center",
  },
  rodada: {
    fontSize: 16,
    fontWeight: "600",
    color: "#b3462c",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  placar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#eee8da",
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  itemPlacar: {
    alignItems: "center",
    flex: 1,
  },
  nomePlacar: {
    color: VERDE,
    fontWeight: "600",
    fontSize: 14,
  },
  pontos: {
    fontSize: 24,
    fontWeight: "700",
    color: "#b3462c",
    marginTop: 4,
  },
  linhaPlacar: {
    width: 1,
    height: 40,
    backgroundColor: "#c9c1b1",
  },
  jogadores: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  jogador: {
    flex: 1,
    alignItems: "center",
    gap: 12,
  },
  divisor: {
    width: 1,
    backgroundColor: "rgba(28,28,28,0.12)",
    marginHorizontal: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1c1c1c",
  },
  dados: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    minHeight: 68,
  },
  oculto: {
    width: 68,
    textAlign: "center",
    fontSize: 28,
  },
  botao: {
    backgroundColor: VERDE,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoDesabilitado: {
    backgroundColor: "#d8d2c4",
  },
  botaoTexto: {
    color: CREME,
    fontSize: 15,
    fontWeight: "600",
  },
  textoDesabilitado: {
    color: "#928c7c",
  },
  botaoDourado: {
    backgroundColor: DOURADO,
    marginTop: 16,
  },
  textoDourado: {
    color: VERDE,
  },
  mensagem: {
    marginTop: 24,
    padding: 14,
    minHeight: 70,
    borderRadius: 12,
    backgroundColor: "rgba(15,61,46,0.08)",
    borderWidth: 1,
    borderColor: "rgba(15,61,46,0.18)",
    justifyContent: "center",
  },
  tituloMensagem: {
    color: VERDE,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 13,
  },
  textoMensagem: {
    textAlign: "center",
    fontWeight: "600",
    color: VERDE,
    marginTop: 6,
    fontSize: 16,
  },
  fimDeJogo: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: VERDE,
    alignItems: "center",
  },
  tituloFinal: {
    color: DOURADO,
    fontSize: 17,
    fontWeight: "700",
  },
  textoFinal: {
    color: CREME,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 10,
  },
});
