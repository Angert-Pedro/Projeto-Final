import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Header from "@/components/Header/Header";
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";

export default function CreateEvent() {
  const router = useRouter();
  const today = new Date();
  const maxDate = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

  const [tipo, setTipo] = useState("EVENTO");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const [evento, setEvento] = useState({
    nome: "",
    data_Evento: "",
    data_EventoDate: null as Date | null,
    urlBanner: "",
    capacidade_Max: "",
    horario_Inicio: "",
    horario_InicioTime: null as Date | null,
    horario_Final: "",
    horario_FinalTime: null as Date | null,
    preco_base: "",
    localizacao_: {
      nome: "",
      endereco: "",
      capacidade: ""
    }
  });

  const handleSubmit = async () => {
    try {
      // Format dates and times
      const formatDateTime = (dateObj: Date | null, timeObj: Date | null) => {
        if (!dateObj || !timeObj) return "";
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, "0");
        const d = String(dateObj.getDate()).padStart(2, "0");
        const h = String(timeObj.getHours()).padStart(2, "0");
        const min = String(timeObj.getMinutes()).padStart(2, "0");
        return `${y}-${m}-${d}T${h}:${min}`;
      };

      const formatDate = (dateObj: Date | null) => {
        if (!dateObj) return "";
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, "0");
        const d = String(dateObj.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
      };

      const response = await fetch("https://localhost:7221/Evento/criarEvento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: evento.nome,
          data_Evento: formatDateTime(evento.data_EventoDate, new Date(0, 0, 0, 0, 0)),
          localizacao_: {
            nome: evento.localizacao_.nome,
            endereco: evento.localizacao_.endereco,
            capacidade: Number(evento.localizacao_.capacidade)
          },
          urlBanner: evento.urlBanner,
          capacidade_Max: Number(evento.capacidade_Max),
          horario_Inicio: formatDateTime(evento.data_EventoDate, evento.horario_InicioTime),
          horario_Final: formatDateTime(evento.data_EventoDate, evento.horario_FinalTime),
          preco_base: Number(evento.preco_base),
          tipo: tipo
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar evento");
      }

      Toast.show({
        type: 'success',
        text1: "Sucesso!",
        text2: "Evento criado com sucesso."
      });
      router.push("/home"); 

    } catch (err) {
      Toast.show({
        type: 'error',
        text1: "Erro",
        text2: "Não foi possível cadastrar o evento."
      });
      console.error(err);
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Header></Header>
      <Text style={{ fontSize: 26, fontWeight: "bold", marginBottom: 20 }}>
        Criar Novo Evento
      </Text>

      <Text>Nome do Evento</Text>
      <TextInput
        style={styles.input}
        value={evento.nome}
        onChangeText={(text) => setEvento({ ...evento, nome: text })}
      />

      <Text>Tipo</Text>
      {Platform.OS === "web" ? (
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid #d1d1d6",
            backgroundColor: "#FFFFFF",
            fontSize: 16,
            marginBottom: 12,
            width: "100%",
            boxSizing: "border-box",
            color: "#000"
          } as any}
        >
          <option value="EVENTO">Evento</option>
          <option value="FILME">Filme</option>
        </select>
      ) : (
        <View style={styles.pickerContainer}>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowTypeDropdown(!showTypeDropdown)}
          >
            <Text style={styles.pickerText}>
              {tipo === "EVENTO" ? "Evento" : "Filme"}
            </Text>
          </TouchableOpacity>
          {showTypeDropdown && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => {
                  setTipo("EVENTO");
                  setShowTypeDropdown(false);
                }}
              >
                <Text style={styles.dropdownOptionText}>Evento</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dropdownOption}
                onPress={() => {
                  setTipo("FILME");
                  setShowTypeDropdown(false);
                }}
              >
                <Text style={styles.dropdownOptionText}>Filme</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <Text>Data do Evento</Text>
      <DatePicker
        date={evento.data_EventoDate}
        onChange={(date) =>
          setEvento({ ...evento, data_EventoDate: date })
        }
        maxDate={maxDate}
        placeholder="Data do Evento"
      />

      <Text>URL do Banner</Text>
      <TextInput
        style={styles.input}
        value={evento.urlBanner}
        onChangeText={(text) => setEvento({ ...evento, urlBanner: text })}
      />

      <Text>Capacidade Máxima</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(evento.capacidade_Max)}
        onChangeText={(text) => setEvento({ ...evento, capacidade_Max: text })}
      />

      <Text>Horário de Início</Text>
      <TimePicker
        time={evento.horario_InicioTime}
        onChange={(time) =>
          setEvento({ ...evento, horario_InicioTime: time })
        }
        label="Horário de Início"
      />

      <Text>Horário Final</Text>
      <TimePicker
        time={evento.horario_FinalTime}
        onChange={(time) =>
          setEvento({ ...evento, horario_FinalTime: time })
        }
        label="Horário Final"
      />

      <Text>Preço Base</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(evento.preco_base)}
        onChangeText={(text) => setEvento({ ...evento, preco_base: text })}
      />


      <Text style={{ marginTop: 20, fontSize: 18, fontWeight: "bold" }}>
        Localização
      </Text>

      <Text>Nome da Localização</Text>
      <TextInput
        style={styles.input}
        value={evento.localizacao_.nome}
        onChangeText={(text) =>
          setEvento({
            ...evento,
            localizacao_: { ...evento.localizacao_, nome: text }
          })
        }
      />

      <Text>Endereço</Text>
      <TextInput
        style={styles.input}
        value={evento.localizacao_.endereco}
        onChangeText={(text) =>
          setEvento({
            ...evento,
            localizacao_: { ...evento.localizacao_, endereco: text }
          })
        }
      />

      <Text>Capacidade da Localização</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(evento.localizacao_.capacidade)}
        onChangeText={(text) =>
          setEvento({
            ...evento,
            localizacao_: { ...evento.localizacao_, capacidade: text }
          })
        }
      />

      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>Criar Evento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d1d1d6",
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    color: "#000"
  },
  pickerContainer: {
    marginBottom: 12,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#d1d1d6",
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  pickerText: {
    fontSize: 16,
    color: "#000",
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: "#d1d1d6",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginTop: 4,
  },
  dropdownOption: {
    padding: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d1d6",
  },
  dropdownOptionText: {
    fontSize: 16,
    color: "#000",
  },
  btn: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  }
});