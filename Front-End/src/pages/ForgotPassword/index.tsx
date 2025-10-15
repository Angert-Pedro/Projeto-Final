import styles from "./styles";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Logo from "@/assets/logoValidator.svg";
import FormField from "@/components/FormField";
import { useNavigation } from "@react-navigation/native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  async function handleSendEmail() {
    try {
      const response = await fetch("https://localhost:7221/Usuario/recuperarSenha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
      });

      const result = await response.text();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Erro ao enviar e-mail!",
          text2: result,
          visibilityTime: 4000,
        });
        return;
      } else{
        Toast.show({
          type: "success",
          text1: "E-mail de recuperação enviado com sucesso!\nVerifique sua caixa de entrada para mais detalhes.",
        });
        navigation.navigate("index" as never);
      }

    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao enviar e-mail!",
        text2: error.message || "Não foi possível enviar o e-mail.",
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
            <Text style={styles.title}>Esqueceu sua senha?</Text>
            <Text style={styles.subtitle}>
              Digite seu email para redefinir sua senha.
            </Text>
            <FormField
              label=""
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("index" as never)}
                style={{
                  backgroundColor: "#c1c1c1",
                  paddingVertical: 15,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 30,
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
                onPress={handleSendEmail}
                style={{
                  backgroundColor: "#454B60",
                  paddingVertical: 15,
                  borderRadius: 8,
                  alignItems: "center",
                  marginTop: 30,
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
                  Enviar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
