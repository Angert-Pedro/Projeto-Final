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
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function AtivarConta() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // 🔹 Extrair token da URL (igual RecuperarSenha)
  useEffect(() => {
    async function extractTokenFromUrl() {
      try {
        const url = await Linking.getInitialURL();
        if (url) {
          const parsed = Linking.parse(url);
          const tokenParam = parsed.queryParams?.token as string;
          const emailParam = parsed.queryParams?.email as string;

          if (tokenParam && emailParam) {
            setToken(tokenParam);
            setEmail(emailParam);
          } else {
            setTokenValid(false);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("Erro ao extrair token:", err);
      }
    }

    extractTokenFromUrl();
  }, []);

  useEffect(() => {
    if (!token) return;

    async function validateToken() {
      try {
        const response = await fetch("https://localhost:7221/Usuario/ativarUsuario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: token,
            email: email,
          })
        });

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
            <Text style={styles.title}>Ativar conta</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#454B60" />
            ) : tokenValid ? (
              <>
                <Text
                  style={{
                    backgroundColor: "#96ffb4",
                    color: "green",
                    borderColor: "green",
                    borderWidth: 1,
                    marginTop: 20,
                    textAlign: "center",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  Sua conta foi ativada com sucesso!{"\n"}
                  Agora você já pode fazer login.
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate("index" as never)}
                  style={{
                    marginTop: 20,
                    backgroundColor: "#454B60",
                    paddingVertical: 12,
                    paddingHorizontal: 30,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Realizar Login
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text
                  style={{
                    backgroundColor: "#ff9999",
                    color: "red",
                    borderColor: "red",
                    borderWidth: 1,
                    marginTop: 20,
                    textAlign: "center",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  Token inválido ou expirado.{"\n"}
                  Solicite um novo link de ativação.
                </Text>

                <TouchableOpacity
                  onPress={() => navigation.navigate("index" as never)}
                  style={{
                    marginTop: 20,
                    backgroundColor: "#454B60",
                    paddingVertical: 12,
                    paddingHorizontal: 30,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Voltar para Home
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
