import styles from "./styles";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import FormField from "@/components/FormField";
import { FontAwesome } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Funções para lidar com os cliques (placeholders)
  const handleLogin = () => Alert.alert("Login", `Email: ${email}`);
  const handleFacebookLogin = () => Alert.alert("Login com Facebook");
  const handleGoogleLogin = () => Alert.alert("Login com Google");
  const handleSignUp = () => Alert.alert("Navegar para Cadastro");
  const handleForgotPassword = () =>
    Alert.alert("Navegar para Recuperar Senha");

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* 1. Logo e Títulos */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>VALIDATOR</Text>
            <FontAwesome
              name="check-circle"
              size={30}
              color="#34C759"
              style={styles.logoIcon}
            />
          </View>

          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>
            Digite seu nome de usuário e senha para fazer login
          </Text>

          {/* 2. Campos de Formulário */}
          <View style={styles.formContainer}>
            <FormField
              label=""
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
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
