import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const colors = {
  background: "#131313",
  surfaceContainerLow: "#1c1b1b",
  outlineVariant: "#4e4633",
  onSurface: "#e5e2e1",
  primaryContainer: "#f5c518",
};

export default function Detalhe({ route }) {
  const item = route.params?.item;
  const categoria = route.params?.categoria || "filmes";

  if (!item) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.vazioTitulo}>Nenhum item selecionado</Text>
        <Text style={styles.vazioTexto}>
          Volte para a lista e escolha um item.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {item.imagem ? (
        <Image source={{ uri: item.imagem }} style={styles.banner} />
      ) : (
        <View style={styles.semImagem}>
          <Text style={styles.semImagemText}>Sem imagem</Text>
        </View>
      )}

      <Text style={styles.categoria}>{categoria.toUpperCase()}</Text>
      <Text style={styles.titulo}>{item.nome}</Text>

      <View style={styles.tags}>
        <Text style={styles.tag}>{item.ano}</Text>
        <Text style={styles.tag}>{item.genero}</Text>
      </View>

      <Text style={styles.subtitulo}>Descrição</Text>
      <Text style={styles.texto}>{item.descricao}</Text>

      <Text style={styles.subtitulo}>Direção</Text>
      <Text style={styles.texto}>
        {item.direcao || item.diretor || item.direcaoFilme || "Nao informado"}
      </Text>

      <Text style={styles.subtitulo}>Principais Atores</Text>
      <Text style={styles.texto}>
        {(item.atoresPrincipais || []).join(", ") || "Nao informado"}
      </Text>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  banner: {
    width: "100%",
    height: 420,
    borderRadius: 12,
    marginBottom: 12,
  },
  semImagem: {
    width: "100%",
    height: 420,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: "center",
    justifyContent: "center",
  },
  semImagemText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.onSurface,
  },
  categoria: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primaryContainer,
    marginBottom: 4,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primaryContainer,
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },
  tag: {
    backgroundColor: colors.surfaceContainerLow,
    color: colors.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: "600",
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryContainer,
    marginBottom: 4,
    marginTop: 6,
  },
  texto: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.onSurface,
  },
  vazio: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  vazioTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primaryContainer,
  },
  vazioTexto: {
    marginTop: 8,
    fontSize: 15,
    color: colors.onSurface,
    textAlign: "center",
  },
});
