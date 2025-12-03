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
  TextInput,
} from "react-native";
import Checkbox from "expo-checkbox";
import Logo from "@/assets/logoValidator.svg";
import FormField from "@/components/FormField";
import { styles as fieldStyles } from "@/components/FormField/styles";
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
  const [showPasswords, setShowPasswords] = useState(false);

  // data máxima permitida para nascimento: hoje menos 18 anos
  const today = new Date();
  const maxBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

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
              Cpf: cpf.replace(/\D/g, ""),
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

  function formatCpfInput(text: string) {
    const digits = text.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
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
              onChangeText={(text) => {
                const clean = text.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s~\^´]/g, "");
                setNome(clean);
              }}
            />
            <FormField
              label=""
              placeholder="CPF"
              value={cpf}
              onChangeText={(text) => setCpf(formatCpfInput(text))}
              keyboardType={Platform.OS === 'web' ? 'default' : 'numeric'}
              maxLength={14}
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
                  max={formatDateForInput(maxBirthDate)}
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
                    value={birthDate || maxBirthDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    maximumDate={maxBirthDate}
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
              onChangeText={(text) => {
                const clean = text.replace(/[^a-zA-Z0-9]/g, "");
                setUsername(clean);
              }}
            />
            <FormField
              label=""
              placeholder="E-mail"
              value={email}
              onChangeText={(text) => setEmail(text.slice(0, 90))}
              keyboardType={Platform.OS === 'web' ? 'default' : 'email-address'}
              maxLength={90}
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
              isSecure={!showPasswords}
              onChangeText={setSenha}
            />

            <View style={{ width: '100%', marginBottom: 20 }}>
              <TextInput
                placeholder="Confirmar Senha"
                placeholderTextColor="#8A8A8E"
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={!showPasswords}
                autoCapitalize="none"
                style={[fieldStyles.input, { width: '100%' }]}
              />

              <TouchableOpacity
                onPress={() => setShowPasswords((s) => !s)}
                style={{ marginTop: 8, alignSelf: 'flex-start' }}
              >
                <Text style={{ color: "#454B60", fontWeight: "600" }}>
                  {showPasswords ? "Ocultar senha" : "Mostrar senhas"}
                </Text>
              </TouchableOpacity>
            </View>
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
