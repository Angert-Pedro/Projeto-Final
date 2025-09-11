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
      <Text style={styles.title}>
        Filmes em cartaz
      </Text>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen as never)}
            style={styles.imageContainer}
          >
            <Image source={item.image} style={styles.image} />
            <Text style={{ marginTop: 5, marginLeft: 2, fontSize: 20, fontWeight: "semibold" }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main:{
    backgroundColor: "#d3d3d3",
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "semibold",
    margin: 20,
  },
  container: {
    marginTop: 20,
  },
  imageContainer: {
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 12,
  },
})
