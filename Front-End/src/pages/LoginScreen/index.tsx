import styles from "./styles";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
} from "react-native";
import FormField from "@/components/FormField";
import { FontAwesome } from "@expo/vector-icons";
import Logo from "@/assets/logoValidator.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const showError = (msg : any) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.LONG); // LONG ≈ 3,5s
  } else {
    Alert.alert("Erro", msg); // iOS não tem Toast nativo
  }
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => Alert.alert("Login com Google");
  const handleSignUp = () => Alert.alert("Navegar para Cadastro");
  const handleFacebookLogin = () => Alert.alert("Login com Facebook");
  const handleForgotPassword = () => Alert.alert("Navegar para Recuperar Senha");

  const handleLogin = async () => {
    try {
      const response = await fetch("https://localhost:7221/Usuario/executarLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Login: login,
          Senha: password,
        }),
      });

      // Aqui pegamos o texto em vez de JSON
      const result = await response.text();
  
      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Erro na tentativa de login",
          text2: result,
          visibilityTime: 4000,
        });
        return;
      }
  
      if (result === "Usuário logado!") {
        await AsyncStorage.setItem("authToken", "true");

        navigation.navigate("home" as never);
      } else {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível realizar o login.");
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* 1. Logo e Títulos */}
          <View style={styles.logoContainer}>
            <Logo />
          </View>

          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Digite seu nome de usuário e senha para fazer login
          </Text>

          {/* 2. Campos de Formulário */}
          <View style={styles.formContainer}>
            <FormField
              label=""
              placeholder="Usuário"
              value={login}
              onChangeText={setLogin}
              forgotText="Esqueceu seu usuário?"
              onForgotPress={handleForgotPassword}
            />
            <FormField
              label=""
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              isSecure={true}
              forgotText="Esqueceu sua senha?"
              onForgotPress={handleForgotPassword}
            />
            <TouchableOpacity
              onPress={handleLogin}
              style={{
                backgroundColor: "#34C759",
                paddingVertical: 15,
                borderRadius: 8,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Entrar
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.separatorContainer}>
            <View style={styles.line} />
            <Text style={styles.separatorText}>Ou faça login com</Text>
            <View style={styles.line} />
          </View>

          {/* 4. Botões de Login Social */}
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              onPress={handleFacebookLogin}
            >
              <FontAwesome name="facebook-f" size={20} color="#FFF" />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={handleGoogleLogin}
            >
              <FontAwesome name="google" size={20} color="#000" />
              <Text style={[styles.socialButtonText, styles.googleButtonText]}>
                Google
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.signupContainer}
            onPress={handleSignUp}
          >
            <Text style={styles.signupText}>
              Não tem uma conta?{" "}
              <Text style={styles.signupLink}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
