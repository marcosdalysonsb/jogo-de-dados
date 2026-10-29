import { Image, StyleSheet, View } from "react-native";

const TAMANHO_DADO = 68;

const imagensDados = {
  1: require("../assets/dados/dado1.png"),
  2: require("../assets/dados/dado2.png"),
  3: require("../assets/dados/dado3.png"),
  4: require("../assets/dados/dado4.png"),
  5: require("../assets/dados/dado5.png"),
  6: require("../assets/dados/dado6.png"),
};

export default function Dado({ valor }) {
  const imagem = imagensDados[valor];

  if (!imagem) {
    return <View style={styles.dadoVazio} accessible={false} />;
  }

  return (
    <Image
      source={imagem}
      style={styles.dado}
      resizeMode="contain"
      accessible
      accessibilityRole="image"
      accessibilityLabel={`Dado mostrando o número ${valor}`}
    />
  );
}

const styles = StyleSheet.create({
  dado: {
    width: TAMANHO_DADO,
    height: TAMANHO_DADO,
  },
  dadoVazio: {
    width: TAMANHO_DADO,
    height: TAMANHO_DADO,
  },
});
