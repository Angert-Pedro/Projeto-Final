import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Header from "@/components/Header/Header";
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";

export default function EditEvent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [tipo, setTipo] = useState("EVENTO");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const [evento, setEvento] = useState({
    id: 0,
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

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetch(
          `https://localhost:7221/Evento/ObterEventoPorID?id=${id}`
        );
        const data = await res.json();

        // Parse dates from ISO format
        const parseDateTime = (dateTimeString: string): Date => {
          if (!dateTimeString) return new Date();
          return new Date(dateTimeString);
        };

        const dataEventoDate = parseDateTime(data.data_Evento);
        const horarioInicioTime = parseDateTime(data.horario_Inicio);
        const horarioFinalTime = parseDateTime(data.horario_Final);

        setEvento({
          ...data,
          data_EventoDate: dataEventoDate,
          horario_InicioTime: horarioInicioTime,
          horario_FinalTime: horarioFinalTime,
          capacidade_Max: String(data.capacidade_Max),
          preco_base: String(data.preco_base),
          localizacao_: {
            nome: data.localizacao_?.nome,
            endereco: data.localizacao_?.endereco,
            capacidade: String(data.localizacao_?.capacidade)
          },
        });

        setTipo(data.tipo || "EVENTO");
        setLoading(false);

      } catch (err) {
        Toast.show({
          type: 'error',
          text1: "Atenção!",
          text2: "Não foi possível carregar o evento."
        });
      }
    };

    loadEvent();
  }, []);

  const handleUpdate = async () => {
    try {
      const formatDateTime = (dateObj: Date | null, timeObj: Date | null) => {
        if (!dateObj || !timeObj) return "";
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, "0");
        const d = String(dateObj.getDate()).padStart(2, "0");
        const h = String(timeObj.getHours()).padStart(2, "0");
        const min = String(timeObj.getMinutes()).padStart(2, "0");
        return `${y}-${m}-${d}T${h}:${min}`;
      };

      const res = await fetch("https://localhost:7221/Evento/atualizarEvento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: evento.id,
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

      if (!res.ok) throw new Error();

      Toast.show({
        type: 'success',
        text1: "Sucesso",
        text2: "Evento atualizado!"
      });
      
      router.push("/home");

    } catch (err) {
      Toast.show({
        type: 'error',
        text1: "Atenção!",
        text2: "Falha ao atualizar evento"
      });
    }
  };

  if (loading) return <Text style={{ padding: 20 }}>Carregando...</Text>;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Header></Header>
      <Text style={styles.title}>Editar Evento</Text>

      <Text>Nome do Evento</Text>
      <TextInput
        style={styles.input}
        value={evento.nome}
        onChangeText={(t) => setEvento({ ...evento, nome: t })}
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
        maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
        placeholder="Data do Evento"
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
        value={evento.preco_base}
        onChangeText={(t) => setEvento({ ...evento, preco_base: t })}
      />

      {/* LOCALIZAÇÃO */}
      <Text style={styles.subtitle}>Localização</Text>

      <Text>Nome</Text>
      <TextInput
        style={styles.input}
        value={evento.localizacao_.nome}
        onChangeText={(t) =>
          setEvento({
            ...evento,
            localizacao_: { ...evento.localizacao_, nome: t }
          })
        }
      />

      <Text>Endereço</Text>
      <TextInput
        style={styles.input}
        value={evento.localizacao_.endereco}
        onChangeText={(t) =>
          setEvento({
            ...evento,
            localizacao_: { ...evento.localizacao_, endereco: t }
          })
        }
      />

      <Text>Capacidade</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={evento.localizacao_.capacidade}
        onChangeText={(t) =>
          setEvento({
            ...evento,
            localizacao_: { ...evento.localizacao_, capacidade: t }
          })
        }
      />

      {/* SAVE BUTTON */}
      <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
        <Text style={styles.btnText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
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
  },
});
