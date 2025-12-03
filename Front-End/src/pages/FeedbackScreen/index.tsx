import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { styles } from "./styles";
import Header from "@/components/Header/Header";
import Toast from "react-native-toast-message";
import { useNavigation } from "expo-router";

export default function FeedbackScreen() {
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (feedback.length < 10) {
      Toast.show({
        type: "error",
        text1: "Poucos detalhes!",
        text2: "Por favor, escreva um pouco mais no seu feedback.",
        visibilityTime: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      Toast.show({
        type: "success",
        text1: "Obrigado pelo Feedback!",
        text2: "Sua mensagem foi enviada e ajuda muito a melhorar o Validator.",
        visibilityTime: 4000,
      });
      setFeedback("");
      navigation.navigate("home" as never);
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
