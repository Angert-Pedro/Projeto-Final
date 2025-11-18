import styles from "./styles";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
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
import { Toast } from "react-native-toast-message/lib/src/Toast";
import validateRegister from "@/utils/validateRegister";

export default function RegistrationScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
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

  function formatDateDisplay(d: Date | null) {
    if (!d) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  function formatDateForInput(d: Date) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`; // value for <input type="date" />
  }

  async function handleRegister() {
    const errorMessage = validateRegister({
      nome,
      username,
      email,
      celular,
      cpf,
      senha,
      confirmarSenha,
      isChecked,
    });

    if (errorMessage) {
      Toast.show({
        type: "error",
        text1: errorMessage,
        visibilityTime: 4000,
      });
      return;
    }

    let dataNascParaBackend: string | null = null;
    if (birthDate) {
      dataNascParaBackend = formatDateForInput(birthDate);
    } else if (dataNascimento) {
      const m = dataNascimento.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (m) dataNascParaBackend = `${m[3]}-${m[2]}-${m[1]}`;
    }

    if (!dataNascParaBackend) {
      Toast.show({ type: "error", text1: "Data de nascimento inválida.", visibilityTime: 4000 });
      return;
    }

    try {
      const response = await fetch("https://localhost:7221/Usuario/criarUsuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Login: username,
          Senha: senha,
          Pessoa_: {
            Nome: nome,
            Email: email,
            Numero: celular,
            Cpf: cpf,
            Data_Nasc: dataNascParaBackend,
          },
        }),
      });

      const result = await response.text();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Erro ao cadastrar usuário",
          text2: result,
          visibilityTime: 4000,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Cadastro realizado com sucesso!",
        visibilityTime: 4000,
      });

      navigation.navigate("index" as never);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao cadastrar usuário",
        text2: error.message || "Não foi possível cadastrar.",
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
          {/* 1. Logo e Títulos */}
          <View style={styles.logoContainer}>
            <Logo />
          </View>

          <Text style={styles.title}>Cadastro</Text>

          <View style={styles.formContainer}>
            <FormField
              label=""
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
            />
            <FormField
              label=""
              placeholder="CPF"
              value={cpf}
              onChangeText={setCpf}
            />

            {Platform.OS === "web" ? (
              <View style={styles.datePickerWeb}>
    
                {/* Input fake com placeholder */}
                <input
                  type="text"
                  placeholder="   Data de Nascimento"
                  value={birthDate ? "   " + formatDateDisplay(birthDate) : ""}
                  onClick={() => (document.getElementById("realDateInput") as any)?.showPicker?.()}
                  readOnly
                  style={styles.fakeDateInput}
                />
    
                {/* Input real escondido */}
                <input
                  id="realDateInput"
                  type="date"
                  value={birthDate ? formatDateForInput(birthDate) : ""}
                  onChange={(e: any) => {
                    const val = e.target.value;
                    if (val) {
                      const [y, m, d] = val.split("-");
                      const dt = new Date(Number(y), Number(m) - 1, Number(d));
                      setBirthDate(dt);
                      setDataNascimento(`${d}/${m}/${y}`);
                    }
                  }}
                  style={{
                    ...styles.dateInputWeb,
                    position: "absolute",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  style={styles.datePickerButton}
                >
                  <Text style={styles.datePickerText}>
                    {birthDate ? formatDateDisplay(birthDate) : "Data de Nascimento"}
                  </Text>
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={birthDate || new Date(2000, 0, 1)}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    maximumDate={new Date()}
                    onChange={(event: any, selectedDate?: Date) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setBirthDate(selectedDate);
                        setDataNascimento(formatDateDisplay(selectedDate));
                      }
                    }}
                  />
                )}
              </View>
            )}
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
