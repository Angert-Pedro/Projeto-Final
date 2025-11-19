import { View, Text } from "react-native"
import React from "react"
import { useEffect, useState } from "react"
import { Image } from "react-native"
import styles from "./styles"
import Header from "@/components/Header/Header"
import { Feather } from "@expo/vector-icons";
import TicketModal from "@/components/TicketModal";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message"
import { useLocalSearchParams } from "expo-router"

type Localizacao = {
  nome: string;
  endereco: string;
  capacidade: number;
}

type EventProps = {
  id: string;
  nome: string;
  data_Evento: string;
  localizacao_: Localizacao;
  urlBanner: string;
  capacidade_Max: number;
  horario_Inicio: string;
  horario_Final: string;
  preco_base: number;
}

export default function DetailsEvent() {
  const [data, setData] = useState<EventProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const { id } = useLocalSearchParams()

  console.log("ID do evento:", id);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch(`https://localhost:7221/Evento/ObterEventoPorID?id=${id}`);
        const eventos = await response.json();
        setData(eventos);
        console.log(eventos)
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  async function sendIngresso(ingresso: any) {
    try {
      const response = await fetch("https://localhost:7221/Ingresso/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(ingresso),
      });

      if (!response.ok) {
        throw new Error(`Erro ao criar ingresso: ${response.status}`);
      }

      const data = await response.json();
      console.log("Ingresso salvo com sucesso:", data);

      return data;

    } catch (error) {
      console.error("Erro no POST:", error);
      throw error;
    }
  }


  return (
    <View>
      <Header />
      <View style={styles.container}>

        <Image
          source={{ uri: data?.urlBanner }}
          style={{ width: "100%", height: 250, borderRadius: 10 }}
        />

        <Text style={styles.title}>
          {data?.nome}
        </Text>

        <View style={styles.innerContainer}>
          <Text style={styles.innerText}>
            <Text style={{ fontWeight: "bold" }}>
              <Feather name="calendar" size={20} color="#333" />
              {data?.data_Evento
                ? new Date(data.data_Evento)
                  .toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                  })
                  .replace(",", "")
                  .replace("-feira", "")
                : ""}
            </Text>

            {" "}das{" "}

            <Text style={{ fontWeight: "bold" }}>
              {data?.horario_Inicio
                ? new Date(data.horario_Inicio).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : ""}
            </Text>

            {" "}até{" "}

            <Text style={{ fontWeight: "bold" }}>
              {data?.horario_Final
                ? new Date(data.horario_Final).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : ""}
            </Text>
          </Text>

          <View style={{
            height: 1,
            backgroundColor: "#ccc",
            marginVertical: 12
          }} />

          <Text style={styles.innerText}>
            <Feather name="users" size={20} color="#333" />
            Capacidade Máxima: {data?.capacidade_Max}
          </Text>
        </View>

        <View style={{
          height: 1,
          backgroundColor: "#ccc",
        }} />

        <View style={styles.innerContainer}>
          <Text style={styles.innerText}>
            <Feather name="map-pin" size={20} color="#333" />
            {data?.localizacao_?.nome}
          </Text>

          <View style={{
            height: 1,
            backgroundColor: "#ccc",
            marginVertical: 12
          }} />

          <Text style={styles.innerText}>
            <Feather name="map-pin" size={20} color="#333" />
            Endereço: {data?.localizacao_?.endereco}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: "#007bff",
            padding: 14,
            borderRadius: 10,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Comprar Ingresso
          </Text>
        </TouchableOpacity>

      </View>

      <TicketModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        evento={data}
        precoBase={data ? data.preco_base : 0}
        onCreate={async (ingresso) => {
          try {
            await sendIngresso(ingresso);
            Toast.show({
              type: 'success',
              text1: 'Ingresso criado com sucesso!'
            });

            router.push("/my-tickets"); 

          } catch (err) {
            Toast.show({
              type: 'error',
              text1: 'Erro ao criar ingresso. Tente novamente.'
            });
          }
        }}
      />
    </View>
  )
}