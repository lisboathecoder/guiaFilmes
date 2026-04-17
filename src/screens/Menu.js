import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text, View } from 'react-native';
import TabBar from './TabBar';

const Drawer = createDrawerNavigator();

function Sobre() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Sobre</Text>
			<Text style={styles.text}>
				Guia digital de filmes e series feito com React Native.
			</Text>
			<Text style={styles.text}>
				Navegue pelas abas para ver listas e toque em um item para abrir detalhes.
			</Text>
		</View>
	);
}

function Creditos() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Creditos</Text>
			<Text style={styles.text}>Projeto desenvolvido com Expo e React Navigation.</Text>
		</View>
	);
}

export default function Menu() {
	return (
		<Drawer.Navigator
			initialRouteName="Inicio"
			screenOptions={{
				headerStyle: { backgroundColor: '#1e40af' },
				headerTintColor: '#ffffff',
				headerTitleStyle: { fontWeight: 'bold' },
				drawerActiveTintColor: '#1e40af',
				drawerActiveBackgroundColor: '#dbeafe',
				drawerInactiveTintColor: '#1e3a8a',
				drawerStyle: { backgroundColor: '#f8fafc', width: 260 },
			}}
		>
			<Drawer.Screen name="Inicio" component={TabBar} options={{ title: 'Guia Digital' }} />
			<Drawer.Screen name="Sobre" component={Sobre} />
			<Drawer.Screen name="Creditos" component={Creditos} />
		</Drawer.Navigator>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f4ff',
		padding: 20,
		gap: 10,
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#1e40af',
	},
	text: {
		fontSize: 16,
		lineHeight: 24,
		color: '#334155',
	},
});
