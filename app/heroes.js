//https://akabab.github.io/superhero-api/api/

import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Heroes() {
  const [dados, setDados] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        const response = await axios.get(
          "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json"
        );
        setDados(response.data);
        setCarregando(false);
      } catch (error) {
        console.error(error);
      }
    }

    carregarDados();
  }, []);

  const totalPaginas = Math.ceil(dados.length / 10);
  const inicio = (pagina - 1) * 10;
  const fim = inicio + 10;
  const paginas = dados.slice(inicio, fim);

  if (carregando) {
    return <ActivityIndicator size="large" color="#F1F1F1" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Lista de personagens</Text>

      <FlatList
        data={paginas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.images.md }} style={styles.imagem} />
            <Text style={styles.nome}>{item.name}</Text>
          </View>
        )}
      />

      <View style={styles.paginacao}>
        <Button
          title="Primeira página"
          onPress={() => setPagina(1)}
          disabled={pagina === 1}
        />
        <Button
          title="Anterior"
          onPress={() => setPagina(pagina - 1)}
          disabled={pagina === 1}
        />
        <Text style={styles.numeroPagina}>
          {pagina} de {totalPaginas}
        </Text>
        <Button
          title="Próximo"
          onPress={() => setPagina(pagina + 1)}
          disabled={pagina === totalPaginas}
        />
        <Button
          title="Última página"
          onPress={() => setPagina(totalPaginas)}
          disabled={pagina === totalPaginas}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  nome: {
    fontSize: 18,
    fontWeight: "600",
  },
  paginacao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  numeroPagina: {
    fontSize: 16,
    fontWeight: "500",
  },
});
