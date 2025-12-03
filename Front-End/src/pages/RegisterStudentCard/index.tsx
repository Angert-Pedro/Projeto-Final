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
  Modal
} from "react-native";
import Checkbox from "expo-checkbox";
import Logo from "@/assets/logoValidator.svg";
import FormField from "@/components/FormField";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

export default function RegisterStudentCard() {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState("");
  const [matricula, setMatricula] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCheckboxChange = () => {
    if (!isChecked) {
      setModalVisible(true);
    } else {
      setIsChecked(false);
    }
  };

  const aceitarTermos = () => {
    setIsChecked(true);
    setModalVisible(false);
  };

  const recusarTermos = () => {
    setIsChecked(false);
    setModalVisible(false);
  };

  async function handleRegistrateStudentCard() {
    try {
      const validacao = {
        cpf: cpf,
        matricula: matricula
      };

      const response = await fetch("https://localhost:7221/Validacao/CriarCarteirinha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validacao),
      });

      const result = await response.text();

      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: "Atenção!",
          text2: result
        });
        return;
      }

      Toast.show({
        type: 'success',
        text1: "Sucesso",
        text2: "Validação criada com sucesso!"
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro:", error.message);
        Toast.show({
          type: 'error',
          text1: "Atenção!",
          text2: "Erro ao enviar requisição: " + error.message
        });
      }
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
            <Text style={styles.title}>Registrar carteirinha</Text>
            <Text style={styles.subtitle}>
              Insira os dados da sua carteirinha
            </Text>
            <FormField
              label=""
              placeholder="CPF"
              value={cpf}
              keyboardType="numeric"
              onChangeText={(text) => {
                const onlyNumbers = text.replace(/\D/g, "");

                if (onlyNumbers.length <= 11) {
                  setCpf(onlyNumbers);
                }
              }}
            />
            <FormField
              label=""
              placeholder="Matrícula"
              value={matricula}
              onChangeText={setMatricula}
            />
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={isChecked}
                onValueChange={handleCheckboxChange}
                color={isChecked ? "#34C759" : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.text}>Concordo com os termos e condições</Text>
            </View>
            {/* Modal de Termos e Condições */}
            <Modal animationType="fade" transparent visible={modalVisible}>
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Termos e Condições</Text>

                  <ScrollView style={styles.scrollArea}>
                    <Text style={styles.modalText}>
                      Ao registrar sua carteirinha, você concorda em fornecer
                      informações verdadeiras e atualizadas. O uso deste aplicativo é
                      destinado exclusivamente à validação de carteirinhas estudantis
                      para fins de meia-entrada em eventos culturais e educacionais.
                      Seus dados serão utilizados apenas para validação junto à
                      instituição de ensino e organizadores de eventos. É proibido o
                      uso indevido ou a falsificação de informações. Ao prosseguir,
                      você autoriza o tratamento dos seus dados conforme a Lei Geral
                      de Proteção de Dados (LGPD).
                    </Text>
                  </ScrollView>

                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.cancelButton]}
                      onPress={recusarTermos}
                    >
                      <Text style={styles.cancelText}>Recusar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton, styles.confirmButton]}
                      onPress={aceitarTermos}
                    >
                      <Text style={styles.confirmText}>Aceitar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("home" as never)}
                style={{
                  backgroundColor: "#6b6b6b",
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
                onPress={handleRegistrateStudentCard}
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
                  Validar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
