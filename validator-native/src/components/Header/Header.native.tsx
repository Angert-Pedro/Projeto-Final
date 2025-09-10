import React from "react";
import Logo from "@/assets/logoValidator.svg";
import { View, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.logoBox}>
      <Logo width={120} height={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoBox: {
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
