import React from "react";
import { StyleSheet } from "react-native";
import Header from "@/components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";

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
  {
    id: "5",
    title: "Karate Kid",
    image: require("../assets/karatekid.jpg"),
    screen: "KarateScreen",
  },
];

export default function Index() {
  const navigation = useNavigation();

  return (
    <View style={styles.main}>
      <Header />
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
            style={{ alignItems: "center", height: 1 }}
          >
            <Image
              source={item.image}
              style={{ width: 170, height: 250, borderRadius: 8 }}
            />
            <Text
              style={{
                marginTop: 5,
                fontSize: 20,
                fontWeight: "500",
                letterSpacing: 0.8,
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
            style={{ alignItems: "center", height: 120 }}
          >
            <Image
              source={item.image}
              style={{ width: 170, height: 250, borderRadius: 8 }}
            />
            <Text
              style={{
                marginTop: 5,
                fontSize: 20,
                fontWeight: "500",
                letterSpacing: 0.8, 
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#d3d3d3",
    height: "100%",
  },
  title: {
    fontSize: 25,
    fontWeight: "semibold",
    margin: 20,
  },
  image: {
    width: 150,
    borderRadius: 12,
  },
});
