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

export default function AccountActivate() {
  const navigation = useNavigation();
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
                <Text style={{ backgroundColor: "#96ffb4", color: "green", borderColor: "green", borderWidth: 1, marginTop: 20, textAlign: "center", padding: 10, borderRadius: 5 }}>
                  Conta ativada com sucesso!{'\n'}
                  Você já pode fazer login.
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
                  <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
                    Realizar Login
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={{ backgroundColor: "#ff9999", color: "red", borderColor: "red", borderWidth: 1, marginTop: 20, textAlign: "center", padding: 10, borderRadius: 5 }}>
                  Token inválido ou expirado.{'\n'}
                  Solicite um novo link de recuperação.
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
                  <Text style={{ color: "#FFF", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
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
