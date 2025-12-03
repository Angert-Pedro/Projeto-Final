import styles from "./styles";
import React, { useState, useEffect, useCallback } from "react";
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
import { useFocusEffect, useNavigation, StackActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import StudentCard from "@/components/StudentCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "@/components/Header/Header";

type Carteirinha = {
  id: number;
  pessoa_id: number;
  instituicao: string;
  curso: string;
  matricula: string;
  foto: string;
  dataNascimento: string;
  tipoCurso: string;
  entidadeEmissora: string;
  nome: string;
  qrCode: string;
  turno: string;
  codigoUso: string;
  validade: string;
};

export default function RegisterStudentCard() {
  const navigation = useNavigation();
  const [cpf, setCpf] = useState("");
  const [matricula, setMatricula] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasCarteirinha, setHasCarteirinha] = useState(true);
  const [carteirinha, setCarteirinha] = useState<Carteirinha | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCarteirinha = async () => {
    const userLogin = await AsyncStorage.getItem("userLogin");

    if (!userLogin) {
      console.warn("Nenhum userLogin salvo no AsyncStorage.");
      setLoading(false);
      return;
    }

    if (!userLogin) {
      console.log("No user login found, skipping fetch");
      setLoading(false);
      return;
    }

    try {
      console.log("Fetching carteirinha for user:", userLogin);
      const response = await fetch(
        `https://localhost:7221/Validacao/listarValidacaoPorUsuario?usuario=${encodeURIComponent(userLogin)}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Carteirinha found:", data);
        setCarteirinha(data);
        setHasCarteirinha(true);
      } else {
        console.log("No carteirinha found, status:", response.status);
        setHasCarteirinha(false);
      }
    } catch (error) {
      console.error("Erro ao buscar carteirinha:", error);
      setHasCarteirinha(false);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCarteirinha();
    }, [])
  );


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
        matricula: matricula,
        usuario: await AsyncStorage.getItem("userLogin"),
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

      setTimeout(() => {
        navigation.dispatch(StackActions.replace("register-student-card"));
      }, 1000); 


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
    <SafeAreaView style={[styles.safeArea, { flex: 1 }]}>
      <Header />
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text>Carregando...</Text>
          </View>
        ) : hasCarteirinha && carteirinha ? (
          <StudentCard route={{ params: { carteirinha } }} />
        ) : (
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
        )}
      </View>
    </SafeAreaView>
  );
}
