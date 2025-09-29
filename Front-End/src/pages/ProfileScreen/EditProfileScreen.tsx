// ./screens/ProfileScreen.tsx (Versão ATUALIZADA)

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import EditProfileForm from "@/components/EditProfileForm";
import CheckIdScreen from "@/pages/ValidateID";
import Header from "@/components/Header/Header";

// Nossas abas
const TABS = [
  { key: "edit", title: "Editar dados" },
  { key: "check", title: "Consultar carteirinha" },
  { key: "history", title: "Histórico" },
  { key: "reports", title: "Relatórios" },
];

const ProfileScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Estado para controlar a aba ativa
  const [activeTab, setActiveTab] = useState("check"); // Começa na aba "Consultar"

  useEffect(() => {
    // ... (lógica de fetch de dados do perfil)
    // A lógica de carregar os dados do *perfil* (EditProfileForm)
    // pode ser movida para dentro do próprio EditProfileForm para ser mais limpa.
    // Por ora, vamos focar na troca de abas.
    setLoading(false); // Apenas para o exemplo
  }, [user]);

  const handleSaveProfile = async (updatedData) => {
    /* ... */
  };

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <Text style={styles.pageTitle}>
        Editar Perfil
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFF" },
  container: {
    alignItems: "center",
    padding: 24,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
    marginTop: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#EAEAEA",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  tab: {
    fontSize: 13,
    color: "#666",
    fontWeight: "500",
  },
  activeTab: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default ProfileScreen;
