import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import TabBar from './src/screens/TabBar';

const colors = {
	background: '#131313',
	surfaceContainerLow: '#1c1b1b',
	surfaceContainerHighest: '#353534',
	outlineVariant: '#4e4633',
	onSurface: '#e5e2e1',
	onSurfaceVariant: '#d1c5ac',
	textMuted: '#9a9078',
	primaryContainer: '#f5c518',
};

const Drawer = createDrawerNavigator();

const navTheme = {
	...DarkTheme,
	colors: {
		...DarkTheme.colors,
		background: colors.background,
		card: colors.surfaceContainerLow,
		border: colors.outlineVariant,
		text: colors.onSurface,
		primary: colors.primaryContainer,
	},
};

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView
			{...props}
			style={styles.drawerScroll}
			contentContainerStyle={styles.drawerContent}
		>
			<Text style={styles.brand}>THE CURATOR</Text>
			<DrawerItemList {...props} />

			<View style={styles.drawerFooter}>
				<View style={styles.avatar}>
					<MaterialIcons name="person" size={18} color={colors.onSurfaceVariant} />
				</View>
				<View>
					<Text style={styles.footerName}>Guest Curator</Text>
					<Text style={styles.footerRole}>VIEW PROFILE</Text>
				</View>
			</View>
		</DrawerContentScrollView>
	);
}

function Sobre() {
	return (
		<View style={styles.containerScreen}>
			<Text style={styles.title}>SOBRE</Text>
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
		<View style={styles.containerScreen}>
			<Text style={styles.title}>CREDITOS</Text>
			<Text style={styles.text}>Projeto desenvolvido com Expo e React Navigation.</Text>
		</View>
	);
}

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<NavigationContainer theme={navTheme}>
				<StatusBar style="light" />
				<Drawer.Navigator
					drawerContent={(props) => <CustomDrawerContent {...props} />}
					initialRouteName="Inicio"
					screenOptions={{
						headerStyle: { backgroundColor: colors.surfaceContainerLow },
						headerTintColor: colors.onSurface,
						headerShadowVisible: false,
						headerTitleStyle: {
							fontWeight: '900',
							letterSpacing: 1,
							color: colors.primaryContainer,
						},
						drawerStyle: {
							backgroundColor: colors.surfaceContainerLow,
							width: 280,
							borderRightColor: colors.outlineVariant,
							borderRightWidth: 1,
						},
						drawerActiveTintColor: colors.primaryContainer,
						drawerInactiveTintColor: colors.onSurface,
						drawerActiveBackgroundColor: colors.surfaceContainerHighest,
						drawerLabelStyle: {
							fontSize: 13,
							fontWeight: '700',
							letterSpacing: 1,
						},
					}}
				>
					<Drawer.Screen
						name="Inicio"
						component={TabBar}
						options={{
							title: 'CINEMA',
							drawerIcon: ({ color, size }) => (
								<MaterialIcons name="home" color={color} size={size} />
							),
						}}
					/>
					<Drawer.Screen
						name="Sobre"
						component={Sobre}
						options={{
							drawerIcon: ({ color, size }) => (
								<MaterialIcons name="info" color={color} size={size} />
							),
						}}
					/>
					<Drawer.Screen
						name="Creditos"
						component={Creditos}
						options={{
							drawerIcon: ({ color, size }) => (
								<MaterialIcons name="mail" color={color} size={size} />
							),
						}}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	drawerScroll: {
		backgroundColor: colors.surfaceContainerLow,
	},
	drawerContent: {
		paddingTop: 22,
		paddingBottom: 14,
	},
	brand: {
		marginLeft: 16,
		marginBottom: 20,
		fontSize: 20,
		fontWeight: '900',
		letterSpacing: 1.2,
		color: colors.primaryContainer,
	},
	drawerFooter: {
		marginTop: 20,
		marginHorizontal: 14,
		paddingTop: 16,
		borderTopWidth: 1,
		borderTopColor: colors.outlineVariant,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	avatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: colors.surfaceContainerHighest,
		alignItems: 'center',
		justifyContent: 'center',
	},
	footerName: {
		fontSize: 13,
		fontWeight: '700',
		color: colors.onSurface,
	},
	footerRole: {
		fontSize: 10,
		fontWeight: '600',
		letterSpacing: 0.8,
		color: colors.textMuted,
	},
	containerScreen: {
		flex: 1,
		backgroundColor: colors.background,
		padding: 20,
		gap: 10,
	},
	title: {
		fontSize: 28,
		fontWeight: '900',
		letterSpacing: 1,
		color: colors.primaryContainer,
	},
	text: {
		fontSize: 16,
		lineHeight: 24,
		color: colors.onSurfaceVariant,
	},
});
