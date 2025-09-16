import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/";
import { useNavigation } from "@react-navigation/native";
import { AuthProvider } from "@/contexts/AuthContext";

const data = [
  {
    id: "1",
    title: "Premonição 6",
    image: require("../assets/premonicao.jpg"),
    screen: "PremonicaoScreen",
  },
  {
    id: "2",
    title: "Vitória",
    image: require("../assets/vitoria.jpg"),
    screen: "VitoriaScreen",
  },
  {
    id: "3",
    title: "Karate Kid",
    image: require("../assets/karatekid.jpg"),
    screen: "KarateScreen",
  },
  {
    id: "4",
    title: "Karate Kid",
    image: require("../assets/karatekid.jpg"),
    screen: "KarateScreen",
  },
];

export default function Index() {
  const navigation = useNavigation();

  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <Header />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* O wrapper para o conteúdo que vai "empurrar" o footer para baixo */}
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>Filmes em cartaz</Text>
            <FlatList
              data={data}
              horizontal
              pagingEnabled={false} // se quiser que pare "item por item", pode colocar true
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.screen as never)}
                  style={{ alignItems: "center" }}
                >
                  <Image
                    source={item.image}
                    style={{ width: 120, height: 180, borderRadius: 8 }}
                  />
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: 16,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <Text style={styles.title}>Eventos próximos</Text>
            <FlatList
              data={data}
              horizontal
              pagingEnabled={false} // se quiser que pare "item por item", pode colocar true
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(item.screen as never)}
                  style={{ alignItems: "center" }}
                >
                  <Image
                    source={item.image}
                    style={{ width: 120, height: 180, borderRadius: 8 }}
                  />
                  <Text
                    style={{
                      marginTop: 5,
                      fontSize: 16,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <Footer navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#d3d3d3",
  },
  scrollContainer: {
    flexGrow: 1, // MUITO IMPORTANTE: Permite que o container cresça
    justifyContent: "space-between", // Empurra o conteúdo e o footer para as extremidades
  },
  contentWrapper: {},
  title: {
    fontSize: 25,
    fontWeight: "600",
    margin: 20,
    color: "#333",
  },
  listPadding: {
    paddingHorizontal: 10,
  },
  cardContainer: {
    alignItems: "center",
    width: 170,
  },
  cardImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
  },
  cardTitle: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 0.5,
    textAlign: "center",
    color: "#1C1C1E",
  },
});
