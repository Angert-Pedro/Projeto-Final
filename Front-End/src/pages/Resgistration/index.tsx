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
  ActivityIndicator,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import FontAwesone from "@expo/vector-icons/FontAwesome";
import FormField from "@/components/FormField";
import axios from "axios"; // Importante para futuras requisições HTTP
import { styles } from "./styles";

// # Instalar a biblioteca de checkbox
// npm install @react-native-community/checkbox
// # Instalar axios para futuras chamadas de API
// npm install axios

const RegistrationScreen = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [loading, setLoading] = useState(false);

  /**
   * Esta é a função principal que prepara e "envia" os dados.
   */
  const handleRegister = async () => {
    // --- 1. Validação no Frontend ---
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    if (!agreedToTerms) {
      Alert.alert("Erro", "Você precisa concordar com os termos e condições.");
      return;
    }
    // --- 2. Preparar os Dados para Envio ---
    // Apenas os dados essenciais do usuário.
    const userData = {
      name: fullName,
      email: email,
      phone: phone,
      password: password,
    };

    // --- 3. Simular e Preparar para o Futuro Envio ao Backend ---
    setLoading(true); // Inicia o indicador de carregamento

    try {
      // **PARTE MAIS IMPORTANTE**
      // Quando o backend estiver pronto, você substituirá o código abaixo.
      console.log("Dados prontos para serem enviados:", userData);

      // EXEMPLO DE COMO FICARÁ A CHAMADA REAL COM AXIOS (MANTENHA COMENTADO POR ENQUANTO)
      /*
      const response = await axios.post('https://sua-api.com/register', userData);
      
      if (response.status === 201) { // 201 Created = Sucesso
        Alert.alert('Sucesso!', 'Seu cadastro foi realizado.');
        // Aqui você navegaria para a tela de login ou para a home
      }
      */

      // Simulação de tempo de resposta da rede
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert(
        "Simulação de Sucesso",
        "Cadastro realizado! Verifique o console."
      );
    } catch (error) {
      console.error(error);
      // EXEMPLO DE TRATAMENTO DE ERRO REAL
      /*
      if (axios.isAxiosError(error) && error.response) {
        // O backend respondeu com um erro (ex: email já existe)
        Alert.alert('Erro no Cadastro', error.response.data.message || 'Ocorreu um erro.');
      } else {
        // Erro de rede ou outro problema
        Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
      }
      */
      Alert.alert("Erro na Simulação", "Não foi possível realizar o cadastro.");
    } finally {
      setLoading(false); // Para o indicador de carregamento, ocorrendo sucesso ou falha
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.card}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>VALIDATOR</Text>
              <FontAwesone
                name="check-circle"
                size={24}
                color="#34C759"
                style={{ marginLeft: 8 }}
              />
            </View>

            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>
              Insira seus dados para se registrar
            </Text>

            <FormField
              label=""
              placeholder="Nome completo"
              value={fullName}
              onChangeText={setFullName}
            />
            <FormField
              label=""
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <FormField
              label=""
              placeholder="Celular"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <FormField
              label=""
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              isSecure={true}
            />
            <FormField
              label=""
              placeholder="Confirme a Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isSecure={true}
            />

            <View style={styles.termsContainer}>
              <CheckBox
                disabled={false}
                value={agreedToTerms}
                onValueChange={(newValue) => setAgreedToTerms(newValue)}
                tintColors={{ true: "#4A4A4A", false: "#4A4A4A" }}
              />
              <Text style={styles.termsText}>
                Concordo com os termos e condições
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                loading && styles.submitButtonDisabled,
              ]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.submitButtonText}>Próximo</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
