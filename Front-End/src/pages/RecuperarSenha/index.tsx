import styles from "./styles";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as Linking from "expo-linking";
import Logo from "@/assets/logoValidator.svg";
import FormField from "@/components/FormField";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function RecuperarSenha() {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function extractTokenFromUrl() {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          const parsed = Linking.parse(url);
          const tokenParam = parsed.queryParams?.token as string;
          const email = parsed.queryParams?.email as string;
          if (tokenParam && email) {
            setToken(tokenParam);
            setEmail(email);
          } else {
            console.warn("URL inválida.");
          }
        }
      } catch (err) {
        console.error("Erro ao extrair token:", err);
      }
    }

    extractTokenFromUrl();
  }, []);

  // ✅ Valida o token assim que ele é capturado
  useEffect(() => {
    if (!token) return;

    async function validateToken() {
      try {
        const response = await fetch(
          `https://localhost:7221/Usuario/ValidarToken?token=${token}&email=${email}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        setLoading(false);
        setTokenValid(response.ok);

        if (!response.ok) {
          Toast.show({
            type: "error",
            text1: "Token inválido ou expirado!",
            visibilityTime: 4000,
          });
        }
      } catch (error: any) {
        setLoading(false);
        setTokenValid(false);
        Toast.show({
          type: "error",
          text1: "Erro ao validar token!",
          text2: error.message || "Não foi possível validar o token.",
          visibilityTime: 4000,
        });
      }
    }

    validateToken();
  }, [token]);

  // 🔐 Requisição de redefinição
  async function handleResetPassword() {
    if (!password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Preencha todos os campos.",
        visibilityTime: 4000,
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "As senhas não coincidem.",
        visibilityTime: 4000,
      });
      return;
    }

    try {
      const response = await fetch("https://localhost:7221/Usuario/RedefinirSenha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          novaSenha: password,
        }),
      });

      const result = await response.text();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Erro ao redefinir senha!",
          text2: result,
          visibilityTime: 4000,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Senha redefinida com sucesso!",
        visibilityTime: 4000,
      });

      navigation.navigate("index" as never);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao redefinir senha!",
        text2: error.message || "Não foi possível redefinir a senha.",
        visibilityTime: 4000,
      });
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.logoContainer}>
            <Logo />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Redefinir Senha</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#454B60" />
            ) : tokenValid ? (
              <>
                <Text style={styles.subtitle}>Digite sua nova senha abaixo.</Text>

                <FormField
                    placeholder="Nova senha"
                    value={password}
                    onChangeText={setPassword}
                    isSecure label={""}
                />
                <FormField
                    placeholder="Confirme a nova senha"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    isSecure label={""}
                />

                <TouchableOpacity
                  onPress={handleResetPassword}
                  style={{
                    backgroundColor: "#454B60",
                    paddingVertical: 15,
                    borderRadius: 8,
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Redefinir Senha
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={{ color: "red", marginTop: 20 }}>
                Token inválido ou expirado. Solicite um novo link de recuperação.
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
