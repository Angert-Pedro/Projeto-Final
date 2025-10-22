import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
// (Opcional) Instale 'expo-dev-client' ou 'expo-application' para pegar a versão do app
// import * as Application from 'expo-application';
import { styles } from "./styles";

export default function SupportScreen() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!subject || !message) {
      Alert.alert(
        "Campos incompletos",
        "Por favor, preencha o assunto e a mensagem."
      );
      return;
    }

    setIsSubmitting(true);

    // --- LÓGICA DE ENVIO ---
    // Aqui você faria a chamada para sua API de suporte (ex: Zendesk, Freshdesk, ou um endpoint seu)
    // Ex: api.post('/support-ticket', { subject, message, appVersion: Application.nativeApplicationVersion })

    console.log("Enviando chamado:", { subject, message });

    // Simula uma chamada de API
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Chamado Enviado!",
        "Sua solicitação foi recebida. Nossa equipe responderá no seu e-mail de cadastro em breve."
      );
      setSubject("");
      setMessage("");
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
