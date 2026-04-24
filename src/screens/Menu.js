import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, Text, View } from "react-native";
import TabBar from "./TabBar";

const colors = {
  background: "#131313",
  surfaceContainerLow: "#1c1b1b",
  outlineVariant: "#4e4633",
  onSurface: "#e5e2e1",
  primaryContainer: "#f5c518",
};

const Drawer = createDrawerNavigator();

function Sobre() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sobre</Text>
      <Text style={styles.text}>
        Guia digital de filmes e series feito com React Native.
      </Text>
      <Text style={styles.text}>
        Navegue pelas abas para ver listas e toque em um item para abrir
        detalhes.
      </Text>
      <Text style={styles.text}>
        Utilizamos a api do TMDB para obter as informações de filmes e series, incluindo sinopse, elenco, genero e diretor.
      </Text>
    
    </View>
  );
}

function Creditos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creditos</Text>
      <Text style={styles.text}>
        Projeto desenvolvido com Expo e React Navigation.
      </Text>   
      <Text style={styles.text}>
        SENAI.
      </Text>        
      <Text style={styles.text}>
       Fabio Henrique
       Gustavo Teixeira Lisboa
      </Text>
    </View>
  );
}

export default function Menu() {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primaryContainer },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
        drawerActiveTintColor: colors.primaryContainer,
        drawerActiveBackgroundColor: colors.surfaceContainerLow,
        drawerInactiveTintColor: colors.onSurface,
        drawerStyle: { backgroundColor: colors.background, width: 260 },
      }}
    >
      <Drawer.Screen
        name="Inicio"
        component={TabBar}
        options={{ title: "Guia Digital" }}
      />
      <Drawer.Screen name="Sobre" component={Sobre} />
      <Drawer.Screen name="Creditos" component={Creditos} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primaryContainer,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.onSurface,
  },
});
