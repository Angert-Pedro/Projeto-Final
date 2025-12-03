import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// (Opcional) Instale 'expo-dev-client' ou 'expo-application' para pegar a versão do app
// import * as Application from 'expo-application';
import { styles } from "./styles";
import Header from "@/components/Header/Header";
import Toast from "react-native-toast-message";
import { Redirect, useNavigation } from "expo-router";

export default function SupportScreen() {
  const navigation = useNavigation();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!subject || !message) {
      Toast.show({
        type: "error",
        text1: "Campos incompletos!",
        text2: "Por favor, preencha o assunto e a mensagem.",
        visibilityTime: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      Toast.show({
        type: "success",
        text1: "Sua solicitação foi recebida. ",
        text2: "Nossa equipe responderá no seu e-mail de cadastro em breve.",
        visibilityTime: 4000,
      });
      setSubject("");
      setMessage("");
      navigation.navigate("home" as never);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Header />
        <Text style={styles.title}>Formulário de Suporte</Text>
        <Text style={styles.description}>
          Encontrou um problema ou tem uma dúvida que o FAQ não respondeu?
          Descreva seu problema em detalhes.
        </Text>

        <Text style={styles.label}>Assunto</Text>
        <TextInput
          style={styles.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Ex: Não consigo gerar relatório de evento"
          editable={!isSubmitting}
        />

        <Text style={styles.label}>Descrição Detalhada</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={message}
          onChangeText={setMessage}
          placeholder="Por favor, inclua o máximo de detalhes: nome do evento, data, hora, e qualquer mensagem de erro que apareceu."
          multiline
          numberOfLines={8}
          editable={!isSubmitting}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={isSubmitting ? "Enviando..." : "Enviar Chamado"}
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
