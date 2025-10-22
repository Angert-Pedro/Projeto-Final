import { styles } from "./styles";
import { Image } from "react-native";
import React, { useState } from "react";
import HeaderButton from "./HeaderButtons";
import Logo from "../../assets/logoValidator.svg";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, Modal, TouchableOpacity, View, Text } from "react-native";

export default function Header() {
  const navigation = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = Dimensions.get("window").width < 888;

  async function handleLogout() {
    const savedLogin = await AsyncStorage.getItem("userLogin");
    console.log(savedLogin);

    try {
      const response = await fetch("https://localhost:7221/Usuario/executarLogout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(savedLogin),
      });

      const result = await response.text();
      console.log(result);

      if (response.ok) {
        // Limpa storage também
        setMenuOpen(false);
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userLogin");

        navigation.navigate("index" as never);
      } else {
        console.error("Erro do servidor:", result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function goTo(page: string) {
    navigation.navigate(page as never);
    setMenuOpen(false);
  }



  return (
    <View style={styles.headerContainerWeb}>
      {/* Logo */}
      <Logo />

      {isMobile ? (
        <>
          {/* Botão de menu sanduíche */}
          <TouchableOpacity onPress={() => setMenuOpen(true)}>
            <FontAwesome name="bars" size={32} color="#000" />
          </TouchableOpacity>

          {/* Sidebar */}
          <Modal
            visible={menuOpen}
            transparent
            animationType="slide"
            onRequestClose={() => setMenuOpen(false)}
          >
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={1}
              onPressOut={() => setMenuOpen(false)}
            >
              <View style={styles.sidebar}>
                {/* Botão fechar */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setMenuOpen(false)}
                >
                  <FontAwesome name="arrow-left" size={28} color="#000" />
                </TouchableOpacity>

                {/* Meu Perfil */}
                <Text style={styles.sectionTitle}>Meu Perfil</Text>
                <HeaderButton icon="user" label="Perfil" onPress={() => { goTo("edit-profile"); }} />
                <HeaderButton icon="id-card" label="Minha Carteirinha" onPress={() => { goTo("register-student-card") }} />
                <HeaderButton icon="ticket" label="Meus Ingressos" onPress={() => { }} />

                {/* Ajuda */}
                <Text style={styles.sectionTitle}>Ajuda</Text>
                <HeaderButton icon="file-text" label="FAQ's" onPress={() => { }} />
                <HeaderButton icon="headphones" label="Suporte" onPress={() => { }} />
                <HeaderButton icon="comments" label="Feedback" onPress={() => { }} />

                {/* Sobre */}
                <Text style={styles.sectionTitle}>Sobre</Text>
                <HeaderButton icon="file-text" label="Termos e Condição" onPress={() => { }} />
                <HeaderButton icon="file-text" label="Políticas e Privacidade" onPress={() => { }} />

                <Text style={styles.sectionTitle}>Sair</Text>
                <HeaderButton icon="home" label="Sair" onPress={() => handleLogout()} />
              </View>
            </TouchableOpacity>
          </Modal>
        </>
      ) : (
        <>
          {/* Botões Desktop */}
          <View style={styles.buttonsBox}>
            <HeaderButton icon="home" label="Home" onPress={() => { }} />
            <HeaderButton icon="ticket" label="Meus ingressos" />
            <HeaderButton
              icon="id-card"
              label="Minha carteirinha"
              onPress={() => { }}
            />
          </View>
          <FontAwesome name="user-circle" color="#000" size={48} />
        </>
      )}
    </View>
  );
}