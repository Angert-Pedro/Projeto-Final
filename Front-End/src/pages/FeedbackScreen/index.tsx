import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import Header from "@/components/Header/Header";

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (feedback.length < 10) {
      Alert.alert(
        "Pouco detalhe",
        "Por favor, escreva um pouco mais no seu feedback."
      );
      return;
    }

    setIsSubmitting(true);

    // --- LÓGICA DE ENVIO ---
    // Chamada para sua API de feedback
    console.log("Enviando feedback:", { feedback });

    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        "Obrigado pelo Feedback!",
        "Sua mensagem foi enviada e ajuda muito a melhorar o Validator."
      );
      setFeedback("");
    }, 1000);
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
        <Text style={styles.title}>Enviar Feedback</Text>
        <Text style={styles.description}>
          Gostou do app? Tem alguma sugestão de melhoria ou encontrou um bug?
          Nós queremos saber!
        </Text>

        <Text style={styles.label}>Sua mensagem</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Gostaria de sugerir que..."
          multiline
          numberOfLines={10}
          editable={!isSubmitting}
        />

        <View style={styles.buttonContainer}>
          <Button
            title={isSubmitting ? "Enviando..." : "Enviar Feedback"}
            onPress={handleSubmit}
            disabled={isSubmitting}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
