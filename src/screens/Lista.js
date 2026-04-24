import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchPopularByCategory, isTmdbConfigured } from "../services/tmdb";

const colors = {
  background: "#131313",
  surfaceContainerLow: "#1c1b1b",
  outlineVariant: "#4e4633",
  onSurface: "#e5e2e1",
  onSurfaceVariant: "#d1c5ac",
  primaryContainer: "#f5c518",
  tertiaryContainer: "#49dbff",
};

function resumir(texto, limite = 90) {
  if (!texto) {
    return "";
  }

  if (texto.length <= limite) {
    return texto;
  }

  return `${texto.slice(0, limite)}...`;
}

export default function Lista({ route, navigation }) {
  const categoria = route.params?.categoria || "filmes";
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const titulo =
    categoria === "series" ? "Series em destaque" : "Filmes em destaque";

  async function carregarDados() {
    setLoading(true);
    setError("");

    try {
      if (!isTmdbConfigured()) {
        throw new Error("Configure API KEY no arquivo .env.");
      }

      const response = await fetchPopularByCategory(categoria);
      setItens(response);
    } catch (erro) {
      setError(erro.message || "Erro ao carregar dados da API.");
      setItens([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, [categoria]);

  if (loading) {
    return (
      <View style={styles.centerState}>
        <ActivityIndicator size="large" color={colors.primaryContainer} />
        <Text style={styles.stateText}>Carregando catalogo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerState}>
        <Text style={styles.stateTitle}>Nao foi possivel carregar</Text>
        <Text style={styles.stateText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={carregarDados}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhum titulo encontrado nesta categoria.
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("Detalhe", { item, categoria })}
          >
            {item.imagem ? (
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
            ) : (
              <View style={styles.semImagem}>
                <Text style={styles.semImagemText}>Sem imagem</Text>
              </View>
            )}
            <View style={styles.cardInfo}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.meta}>
                {item.genero} - {item.ano}
              </Text>
              <Text style={styles.meta}>Diretor: {item.diretor}</Text>
              <Text style={styles.meta} numberOfLines={1}>
                Atores:{" "}
                {(item.atoresPrincipais || []).join(", ") || "Nao informado"}
              </Text>
              <Text style={styles.descricao}>{resumir(item.descricao)}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  centerState: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    gap: 8,
  },
  stateTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primaryContainer,
  },
  stateText: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    color: colors.onSurface,
  },
  retryButton: {
    marginTop: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.primaryContainer,
  },
  retryText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#241a00",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primaryContainer,
    marginBottom: 12,
  },
  listContent: {
    gap: 12,
    paddingBottom: 12,
  },
  card: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  imagem: {
    width: 90,
    height: 130,
    borderRadius: 10,
  },
  semImagem: {
    width: 90,
    height: 130,
    borderRadius: 10,
    backgroundColor: "#2a2a2a",
    alignItems: "center",
    justifyContent: "center",
  },
  semImagemText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.onSurfaceVariant,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
    gap: 4,
  },
  nome: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.primaryContainer,
  },
  meta: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.onSurface,
  },
  descricao: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.onSurfaceVariant,
    textAlign: "center",
    paddingTop: 16,
  },
});
