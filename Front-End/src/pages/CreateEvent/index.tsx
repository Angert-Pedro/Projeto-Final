import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet  } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Header from "@/components/Header/Header";

export default function CreateEvent() {
  const router = useRouter();

  const [evento, setEvento] = useState({
    nome: "",
    data_Evento: "",
    urlBanner: "",
    capacidade_Max: "",
    horario_Inicio: "",
    horario_Final: "",
    preco_base: "",
    localizacao_: {
      nome: "",
      endereco: "",
      capacidade: ""
    }
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://localhost:7221/Evento/criarEvento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...evento,
          capacidade_Max: Number(evento.capacidade_Max),
          preco_base: Number(evento.preco_base),
          localizacao_: {
            nome: evento.localizacao_.nome,
            endereco: evento.localizacao_.endereco,
            capacidade: Number(evento.localizacao_.capacidade)
          }
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
      router.push("/"); 

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

      <Text>Data do Evento (YYYY-MM-DD)</Text>
      <TextInput
        style={styles.input}
        value={evento.data_Evento}
        onChangeText={(text) => setEvento({ ...evento, data_Evento: text })}
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

      <Text>Horário de Início (YYYY-MM-DDTHH:mm)</Text>
      <TextInput
        style={styles.input}
        value={evento.horario_Inicio}
        onChangeText={(text) => setEvento({ ...evento, horario_Inicio: text })}
      />

      <Text>Horário Final (YYYY-MM-DDTHH:mm)</Text>
      <TextInput
        style={styles.input}
        value={evento.horario_Final}
        onChangeText={(text) => setEvento({ ...evento, horario_Final: text })}
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
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12
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