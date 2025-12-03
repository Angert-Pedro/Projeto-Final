import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function EditEvent() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [evento, setEvento] = useState({
    id: 0,
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

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await fetch(
          `https://localhost:7221/Evento/ObterEventoPorID?id=${id}`
        );
        const data = await res.json();

        setEvento({
          ...data,
          capacidade_Max: String(data.capacidade_Max),
          preco_base: String(data.preco_base),
          localizacao_: {
            nome: data.localizacao_?.nome,
            endereco: data.localizacao_?.endereco,
            capacidade: String(data.localizacao_?.capacidade)
          },
        });

        setLoading(false);

      } catch (err) {
        Alert.alert("Erro", "Não foi possível carregar o evento.");
        console.log(err);
      }
    };

    loadEvent();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await fetch("https://localhost:7221/Evento/atualizarEvento", {
        method: "PUT",
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

      if (!res.ok) throw new Error();

      Alert.alert("Sucesso", "Evento atualizado!");
      router.push(`/details-event?id=${id}`);

    } catch (err) {
      Alert.alert("Erro", "Falha ao atualizar evento");
      console.log(err);
    }
  };

  if (loading) return <Text style={{ padding: 20 }}>Carregando...</Text>;

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={styles.title}>Editar Evento</Text>

      <Text>Nome do Evento</Text>
      <TextInput
        style={styles.input}
        value={evento.nome}
        onChangeText={(t) => setEvento({ ...evento, nome: t })}
      />

      <Text>Data do Evento</Text>
      <TextInput
        style={styles.input}
        value={evento.data_Evento}
        onChangeText={(t) => setEvento({ ...evento, data_Evento: t })}
      />

      <Text>URL do Banner</Text>
      <TextInput
        style={styles.input}
        value={evento.urlBanner}
        onChangeText={(t) => setEvento({ ...evento, urlBanner: t })}
      />

      <Text>Capacidade Máxima</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={evento.capacidade_Max}
        onChangeText={(t) => setEvento({ ...evento, capacidade_Max: t })}
      />

      <Text>Horário Início</Text>
      <TextInput
        style={styles.input}
        value={evento.horario_Inicio}
        onChangeText={(t) => setEvento({ ...evento, horario_Inicio: t })}
      />

      <Text>Horário Final</Text>
      <TextInput
        style={styles.input}
        value={evento.horario_Final}
        onChangeText={(t) => setEvento({ ...evento, horario_Final: t })}
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
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "orange",
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
