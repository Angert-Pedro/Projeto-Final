import { View, Text } from "react-native"
import React from "react"
import { useEffect, useState } from "react"
import { Image } from "react-native"
import styles from "./styles"
import Header from "@/components/Header/Header"
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";


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
}

export default function DetailsEvent() {
  const [data, setData] = useState<EventProps | null>(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch(`https://localhost:7221/Evento/ObterEventoPorID?id=${12}`);
        const eventos = await response.json();
        setData(eventos);
        console.log(eventos)
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

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
      </View>
    </View>
  )
}