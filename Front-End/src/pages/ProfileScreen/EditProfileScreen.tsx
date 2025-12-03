import React, { useState, useEffect, useCallback } from "react";
import UserIcon from "@/assets/user-icon.svg"
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header/Header";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const ProfileScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(true);
  const [sobrenome, setSobrenome] = useState("");
  const [form, setForm] = useState({
    login: "",
    pessoa_: {
      nome: "",
      cpf: "",
      email: "",
      numero: "",
    },
  });

  useFocusEffect(
    useCallback(() => {
      const fetchUsuario = async () => {
        try {
          const userLogin = await AsyncStorage.getItem("userLogin");

          if (!userLogin) {
            console.warn("Nenhum usuário salvo no AsyncStorage.");
            return;
          }

          const url = `https://localhost:7221/Usuario/consultarUsuario?usuario=${userLogin}`;

          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
          }

          const data = await response.json();

          const nomeCompleto = data.pessoa_?.nome || "";

          if (nomeCompleto) {
            const partes = nomeCompleto.trim().split(" ");
            setForm(data);
            setNome(partes[0]);
            setSobrenome(partes.slice(1).join(" "));
          }

        } catch (error) {
          console.error("Erro ao consultar usuário:", error);
        }
      };

      fetchUsuario();
    }, [])
  );

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      pessoa_: {
        ...prev.pessoa_,
        nome: `${nome} ${sobrenome}`.trim(),
      },
    }));
  }, [nome, sobrenome]);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  async function editarPerfil() {
    try {
      await fetch("https://localhost:7221/Usuario/atualizarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      Toast.show({
        type: "success",
        text1: "Cadastro atualizado com sucesso!",
        text2: "Suas informações foram salvas.",
        visibilityTime: 4000,
      });

    } catch (error) {
      console.error("Erro ao editar perfil:", error);
    }
  }


  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <Text style={styles.pageTitle}>Editar Perfil</Text>
      <UserIcon style={styles.userIcon} />

      {/* Nome */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#6b7280"
        />
        <Ionicons name="create-outline" size={20} color="#6b7280" />
      </View>

      {/* Sobrenome */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Sobrenome"
          value={sobrenome}
          onChangeText={setSobrenome}
          placeholderTextColor="#6b7280"
        />
        <Ionicons name="create-outline" size={20} color="#6b7280" />
      </View>

      {/* Usuário -> login */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={form.login}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, login: text }))
          }
          editable={false}
          placeholderTextColor="#6b7280"
        />
        <Ionicons name="create-outline" size={20} color="#6b7280" />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={form.pessoa_.email}
          onChangeText={(text) =>
            setForm((prev) => ({
              ...prev,
              pessoa_: { ...prev.pessoa_, email: text },
            }))
          }
          placeholderTextColor="#6b7280"
        />
        <Ionicons name="create-outline" size={20} color="#6b7280" />
      </View>

      {/* Celular -> numero */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Celular"
          value={form.pessoa_.numero}
          onChangeText={(text) =>
            setForm((prev) => ({
              ...prev,
              pessoa_: { ...prev.pessoa_, numero: text },
            }))
          }
          placeholderTextColor="#6b7280"
        />
        <Ionicons name="create-outline" size={20} color="#6b7280" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("home" as never)}
          style={{
            backgroundColor: "#9c9c9c",
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 20,
            width: "50%"
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#4990e2",
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: "center",
            marginTop: 20,
            width: "50%"
          }}
          onPress={editarPerfil}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Atualizar
          </Text>
        </TouchableOpacity>
      </View>
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
    color: "#454B60"
  },
  userIcon: {
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 16,
    width: 140,
    height: 140,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#4b5563",
    marginVertical: 10,
    marginHorizontal: 44,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 94,
    marginHorizontal: 44,
    gap: 12
  }
});

export default ProfileScreen;
