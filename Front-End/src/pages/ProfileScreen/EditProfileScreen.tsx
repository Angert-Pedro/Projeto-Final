import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    login: "",
    senha: "",
    pessoa_: {
      nome: "",
      cpf: "",
      email: "",
      numero: "",
    },
  });
  const [value, setValue] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [loading, setLoading] = useState(true);

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

      {/* Senha */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={!showPassword} // alterna
          value={form.senha}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, senha: text }))
          }
          placeholderTextColor="#6b7280"
        />
        <Ionicons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="#6b7280"
          onPress={() => setShowPassword((prev) => !prev)}
        />
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
    marginBottom: 16,
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
    marginTop: 24,
    marginHorizontal: 44,
    gap: 12
  }
});

export default ProfileScreen;
