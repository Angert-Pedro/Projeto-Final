import React, { useEffect, useState } from "react";
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

export default function Index() {
  const [data, setData] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("https://localhost:7221/Evento/obterEventos"); // ajuste a URL
        const eventos = await response.json();

        // adapta os dados do backend para o formato usado no carrossel
        const mappedData = eventos.map((item: any) => ({
          id: item.id,
          title: item.nome,
          image: { uri: item.urlBanner }, // ← usa a url que vem do banco
          screen: "details-event",       // você pode definir uma tela padrão
        }));

        setData(mappedData);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <Header />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>Filmes em cartaz</Text>
            <FlatList
              data={data}
              horizontal
              pagingEnabled={false}
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
              pagingEnabled={false}
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
    flexGrow: 1,
    justifyContent: "space-between",
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
