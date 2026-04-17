import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import Lista from './Lista';
import Detalhe from './Detalhe';

const colors = {
	background: '#131313',
	surfaceContainerLow: '#1c1b1b',
	outlineVariant: '#4e4633',
	onSurface: '#e5e2e1',
	primaryContainer: '#f5c518',
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function FilmesStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: colors.surfaceContainerLow },
				headerTintColor: colors.onSurface,
				headerShadowVisible: false,
				headerTitleStyle: {
					fontWeight: '900',
					letterSpacing: 1,
					color: colors.primaryContainer,
				},
				contentStyle: { backgroundColor: colors.background },
			}}
		>
			<Stack.Screen
				name="ListaFilmes"
				component={Lista}
				initialParams={{ categoria: 'filmes' }}
				options={{ title: 'TRENDING FILMES' }}
			/>
			<Stack.Screen
				name="Detalhe"
				component={Detalhe}
				options={({ route }) => ({
					title: route.params?.item?.nome || 'DETALHES',
				})}
			/>
		</Stack.Navigator>
	);
}

function SeriesStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: colors.surfaceContainerLow },
				headerTintColor: colors.onSurface,
				headerShadowVisible: false,
				headerTitleStyle: {
					fontWeight: '900',
					letterSpacing: 1,
					color: colors.primaryContainer,
				},
				contentStyle: { backgroundColor: colors.background },
			}}
		>
			<Stack.Screen
				name="ListaSeries"
				component={Lista}
				initialParams={{ categoria: 'series' }}
				options={{ title: 'TRENDING SERIES' }}
			/>
			<Stack.Screen
				name="Detalhe"
				component={Detalhe}
				options={({ route }) => ({
					title: route.params?.item?.nome || 'DETALHES',
				})}
			/>
		</Stack.Navigator>
	);
}

function getTabDisplay(route) {
	const routeName = getFocusedRouteNameFromRoute(route) || '';
	return routeName === 'Detalhe' ? 'none' : 'flex';
}

export default function TabBar() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarShowLabel: true,
				tabBarActiveTintColor: colors.primaryContainer,
				tabBarInactiveTintColor: '#7d7d7d',
				tabBarStyle: {
					height: 74,
					paddingBottom: 9,
					paddingTop: 8,
					backgroundColor: colors.surfaceContainerLow,
					borderTopColor: colors.outlineVariant,
					borderTopWidth: 1,
				},
				tabBarLabelStyle: {
					fontSize: 10,
					fontWeight: '700',
					textTransform: 'uppercase',
					letterSpacing: 0.8,
				},
				tabBarIcon: ({ color, size, focused }) => {
					const iconName = route.name === 'Filmes' ? 'movie' : 'tv';
					return (
						<MaterialIcons
							name={iconName}
							size={size + (focused ? 2 : 0)}
							color={color}
						/>
					);
				},
				tabBarItemStyle: {
					paddingTop: 2,
				},
			})}
		>
			<Tab.Screen
				name="Filmes"
				component={FilmesStack}
				options={({ route }) => ({
					tabBarStyle: [
						{
							height: 74,
							paddingBottom: 9,
							paddingTop: 8,
							backgroundColor: colors.surfaceContainerLow,
							borderTopColor: colors.outlineVariant,
							borderTopWidth: 1,
							display: getTabDisplay(route),
						},
					],
				})}
			/>
			<Tab.Screen
				name="Series"
				component={SeriesStack}
				options={({ route }) => ({
					tabBarStyle: [
						{
							height: 74,
							paddingBottom: 9,
							paddingTop: 8,
							backgroundColor: colors.surfaceContainerLow,
							borderTopColor: colors.outlineVariant,
							borderTopWidth: 1,
							display: getTabDisplay(route),
						},
					],
				})}
			/>
		</Tab.Navigator>
	);
}
