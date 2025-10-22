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
  Image,
  Modal
} from "react-native";
import Checkbox from "expo-checkbox";
import Logo from "@/assets/logoValidator.svg";
import FormField from "@/components/FormField";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { MaskedTextInput } from "react-native-mask-text";

export default function RegisterStudentCard() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [matricula, setMatricula] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [instituicao, setInstituicao] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataNascimento, setDataNascimento] = useState("");
  const [fotoTemp, setFotoTemp] = useState<string | null>(null);

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

  const handleFotoChange = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setFotoTemp(result.assets[0].uri);
      setModalVisible(true);
    }
  };

  const confirmarFoto = () => {
    setFoto(fotoTemp);
    setFotoTemp(null);
    setModalVisible(false);
  };

  const cancelarFoto = () => {
    setFotoTemp(null);
    setModalVisible(false);
  };

  function handleRegistrateStudentCard() {
    // Lógica de registro da carteirinha de estudante
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
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
            />
            <FormField
              label=""
              placeholder="Instituição de Ensino"
              value={instituicao}
              onChangeText={setInstituicao}
            />
            <FormField
              label=""
              placeholder="Curso"
              value={curso}
              onChangeText={setCurso}
            />
            <MaskedTextInput
              mask="99/99/9999"
              placeholder="Data de Nascimento"
              keyboardType="numeric"
              value={dataNascimento}
              onChangeText={(text) => setDataNascimento(text)}
              style={styles.maskedInput}
            />
            <FormField
              label=""
              placeholder="Número da Matrícula"
              value={matricula}
              onChangeText={setMatricula}
            />
            <View>
              <Text style={styles.fotoLabel}>Foto do Estudante</Text>
              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  foto && styles.uploadButtonDisabled,
                ]}
                onPress={handleFotoChange}
                disabled={!!foto}
              >
                <Text style={styles.uploadButtonText}>
                  {foto ? "Foto Selecionada" : "Selecionar Foto"}
                </Text>
              </TouchableOpacity>

              {/* Modal de pré-visualização */}
              <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={cancelarFoto}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Confirmar foto?</Text>
                    {fotoTemp && (
                      <Image source={{ uri: fotoTemp }} style={styles.modalImage} />
                    )}
                    <View style={styles.modalButtons}>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.cancelButton]}
                        onPress={cancelarFoto}
                      >
                        <Text style={styles.cancelText}>Cancelar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.confirmButton]}
                        onPress={confirmarFoto}
                      >
                        <Text style={styles.confirmText}>Confirmar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
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
