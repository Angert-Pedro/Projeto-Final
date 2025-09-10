import React from "react";
import Logo from "@/assets/logoValidator.svg";
import HeaderButton from "./HeaderButtons";
import { styles } from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

export default function Header() {
  return (
    <View style={styles.headerContainerWeb}>
      <Logo />
      <View style={styles.buttonsBox}>
        <HeaderButton icon="home" label="Home" onPress={() => {}} />
        <HeaderButton icon="ticket" label="Meus ingressos" onPress={() => {}} />
        <HeaderButton
          icon="id-card"
          label="Minha carteirinha"
          onPress={() => {}}
        />
      </View>
      <FontAwesome name="user-circle" color="#000" size={48} />
    </View>
  );
}
