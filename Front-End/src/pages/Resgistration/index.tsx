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
  Modal,
} from "react-native";
import Checkbox from "expo-checkbox";
import Logo from "@/assets/logoValidator.svg";
import FormField from "@/components/FormField";
import { useNavigation } from "@react-navigation/native";

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [celular, setCelular] = useState("");
  const [username, setUsername] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");

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

  function handleRegister() { }

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

          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.subtitle}>
            Insira seus dados para se registrar
          </Text>

          <View style={styles.formContainer}>
            <FormField
              label=""
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
            />
            <FormField
              label=""
              placeholder="Usuário"
              value={username}
              onChangeText={setUsername}
            />
            <FormField
              label=""
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
            />
            <FormField
              label=""
              placeholder="Celular"
              value={celular}
              onChangeText={setCelular}
            />
            <FormField
              label=""
              placeholder="Senha"
              value={senha}
              isSecure={true}
              onChangeText={setSenha}
            />
            <FormField
              label=""
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              isSecure={true}
              onChangeText={setConfirmarSenha}
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
                      Ao marcar "Concordo" e clicar em "Cadastrar", você aceita nossos Termos e Condições. Você declara que todas as informações fornecidas (Nome, E-mail, Celular, etc.) são verdadeiras e pertencem a você. Você entende que esses dados serão coletados e tratados conforme a Lei Geral de Proteção de Dados (LGPD) com a finalidade exclusiva de criar e gerenciar sua conta, permitir seu acesso seguro e enviar comunicações necessárias. Você é o único responsável pela segurança da sua senha e concorda em não compartilhá-la. O fornecimento de dados falsos pode levar ao cancelamento da sua conta.
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
                onPress={handleRegister}
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
                  Cadastrar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
