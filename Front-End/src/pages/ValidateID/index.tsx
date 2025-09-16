// ./components/CheckIdScreen.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select"; // Importando o dropdown
import { Feather as Icon } from "@expo/vector-icons";
import EditField from "@/components/EditField";

interface ValidationResult {
  id: string;
  name: string;
  birthDate: string;
  idNumber: string;
  photoUrl: string;
}

const CheckIdScreen = () => {
  const [entity, setEntity] = useState<string | null>(null);
  const [validity, setValidity] = useState("");
  const [cpf, setCpf] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleVerify = async () => {
    if (!entity || !validity || !cpf) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    setResult(null); // Limpa o resultado anterior

    try {
      // --- SIMULAÇÃO DE CHAMADA DE API (POST) ---
      // const response = await axios.post('/api/organizer/check-id', { entity, validity, cpf });
      // const data: ValidationResult = response.data;

      // Simulação de 1.5s de espera
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Dados mocados para o exemplo
      const mockResult: ValidationResult = {
        id: "1",
        name: "Usuário de Teste da Silva",
        birthDate: "10/05/1990",
        idNumber: "123.456.789-00",
        photoUrl: "https://via.placeholder.com/150",
      };

      setResult(mockResult);
    } catch (error) {
      Alert.alert("Erro", "Nenhuma carteirinha encontrada com esses dados.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.contentRow}>
        {/* Coluna da Esquerda (Formulário) */}
        <View style={styles.formColumn}>
          {/* Dropdown de Entidade Emissora */}
          <Text style={styles.label}>Entidade emissora</Text>
          <View style={styles.dropdownContainer}>
            <RNPickerSelect
              onValueChange={(value) => setEntity(value)}
              placeholder={{ label: "Selecione uma entidade", value: null }}
              items={[
                { label: "Entidade A", value: "entidade_a" },
                { label: "Entidade B", value: "entidade_b" },
                { label: "Entidade C", value: "entidade_c" },
              ]}
              style={pickerSelectStyles}
              Icon={() => <Icon name="chevron-down" size={20} color="#888" />}
            />
          </View>

          <EditField
            label="Validade"
            value={validity}
            onChangeText={setValidity}
            placeholder="DD/MM/AAAA"
          />
          <EditField
            label="CPF"
            value={cpf}
            onChangeText={setCpf}
            placeholder="000.000.000-00"
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={[
              styles.verifyButton,
              isLoading && styles.verifyButtonDisabled,
            ]}
            onPress={handleVerify}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.verifyButtonText}>Verificar</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Coluna da Direita (Resultados) */}
        <View style={styles.resultColumn}>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : result ? (
            <View style={styles.resultContent}>
              <Image source={{ uri: result.photoUrl }} style={styles.avatar} />
              <Text style={styles.resultLabel}>Nome completo do usuário</Text>
              <Text style={styles.resultValue}>{result.name}</Text>
              <Text style={styles.resultLabel}>Data de nascimento</Text>
              <Text style={styles.resultValue}>{result.birthDate}</Text>
              <Text style={styles.resultLabel}>Número da carteirinha</Text>
              <Text style={styles.resultValue}>{result.idNumber}</Text>
            </View>
          ) : (
            <View style={styles.placeholder}>
              <View style={styles.avatarPlaceholder} />
              <View style={styles.textPlaceholder} />
              <View style={styles.textPlaceholder} />
              <View style={styles.textPlaceholder} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
  },
  inputAndroid: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 4,
  },
  iconContainer: {
    top: 10,
    right: 5,
  },
});

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#F7F7F7",
    borderRadius: 24,
    padding: 25,
    alignItems: "center",
  },
  contentRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  formColumn: {
    flex: 1, // Ocupa 50% do espaço
    paddingRight: 15,
  },
  resultColumn: {
    flex: 1, // Ocupa 50% do espaço
    paddingLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  dropdownContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: "#4A4A4A",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  verifyButtonDisabled: {
    backgroundColor: "#AAA",
  },
  verifyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Estilos do Resultado
  resultContent: {
    alignItems: "flex-start",
    width: "100%",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: 15,
  },
  resultLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
  resultValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  // Placeholders da direita
  placeholder: {
    alignItems: "flex-start",
    width: "100%",
  },
  avatarPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 8,
    backgroundColor: "#EAEAEA",
    alignSelf: "center",
    marginBottom: 15,
  },
  textPlaceholder: {
    height: 20,
    width: "80%",
    backgroundColor: "#EAEAEA",
    borderRadius: 4,
    marginTop: 10,
  },
});

export default CheckIdScreen;
