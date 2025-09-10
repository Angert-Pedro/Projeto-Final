import React from "react";
import { View, StyleSheet, Platform, ScrollView } from "react-native";
import Header from "./Header"; // importa automaticamente a versão correta
import { FontAwesome } from "@expo/vector-icons";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <View style={styles.container}>
      {/* Header (web ou mobile, o bundler escolhe) */}
      <Header />

      {/* Conteúdo scrollável */}
      <ScrollView style={styles.content}>{children}</ScrollView>

      {/* Bottom navigation apenas no mobile */}
      {Platform.OS !== "web" && (
        <View style={styles.bottomNav}>
          <FontAwesome name="home" size={28} />
          <FontAwesome name="ticket" size={28} />
          <FontAwesome name="id-card" size={28} />
          <FontAwesome name="user-circle" size={28} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
