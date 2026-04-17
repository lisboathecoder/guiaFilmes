import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import filmes from '../data/filmes.json';
import series from '../data/series.json';
const colors = {
	background: '#131313',
	surfaceContainerLow: '#1c1b1b',
	outlineVariant: '#4e4633',
	onSurface: '#e5e2e1',
	primaryContainer: '#f5c518',
};

const dados = {
	filmes,
	series,
};

function resumir(texto, limite = 90) {
	if (!texto) {
		return '';
	}

	if (texto.length <= limite) {
		return texto;
	}

	return `${texto.slice(0, limite)}...`;
}

export default function Lista({ route, navigation }) {
	const categoria = route.params?.categoria || 'filmes';
	const itens = dados[categoria] || [];
	const titulo = categoria === 'series' ? 'Series em destaque' : 'Filmes em destaque';

	return (
		<View style={styles.container}>
			<Text style={styles.titulo}>{titulo}</Text>

			<FlatList
				data={itens}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				renderItem={({ item }) => (
					<Pressable
						style={styles.card}
						onPress={() => navigation.navigate('Detalhe', { item, categoria })}
					>
						<Image source={{ uri: item.imagem }} style={styles.imagem} />
						<View style={styles.cardInfo}>
							<Text style={styles.nome}>{item.nome}</Text>
							<Text style={styles.meta}>{item.genero} • {item.ano}</Text>
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
	titulo: {
		fontSize: 28,
		fontWeight: 'bold',
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
		flexDirection: 'row',
		gap: 12,
		shadowColor: '#000',
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
	cardInfo: {
		flex: 1,
		justifyContent: 'center',
		gap: 4,
	},
	nome: {
		fontSize: 17,
		fontWeight: 'bold',
		color: colors.primaryContainer,
	},
	meta: {
		fontSize: 13,
		fontWeight: '600',
		color: colors.onSurface,
	},
	descricao: {
		fontSize: 14,
		color: colors.onSurface,
		lineHeight: 20,
	},
});
