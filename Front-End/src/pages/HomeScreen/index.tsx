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
import { AuthProvider } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { useNavigation } from "expo-router";

type Evento = {
  id: number;
  title: string;
  image: { uri: string };
  tipo: string;
};

export default function Index() {
  const [data, setData] = useState<any[]>([]);
  const navigation = useNavigation();
  const [filmes, setFilmes] = useState<Evento[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);


  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch("https://localhost:7221/Evento/obterEventos");
        const eventos = await response.json();

        const mappedData = eventos.map((item: any) => ({
          id: item.id,
          title: item.nome,
          image: { uri: item.urlBanner },
          tipo: item.tipo, // 👈 include tipo
        }));

        // 👇 separate by tipo
        const filmes = mappedData.filter((x: Evento) => x.tipo === "FILME");
        const eventosProximos = mappedData.filter((x: Evento) => x.tipo === "EVENTO");

        setFilmes(filmes);
        setEventos(eventosProximos);

      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const renderEvent = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push(`/details-event?id=${item.id}`)}
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
  );

  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <Header />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>Filmes em cartaz</Text>
            <FlatList
              data={filmes}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderEvent}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
            />

            <Text style={styles.title}>Eventos próximos</Text>
            <FlatList
              data={eventos}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderEvent}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
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
});
