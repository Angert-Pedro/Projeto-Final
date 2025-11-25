import styles from "./styles";
import React, { useEffect, useState } from "react";
import TicketCard from "@/components/TicketCard";
import { View, Platform, Text, ScrollView } from "react-native";
import Header from "@/components/Header/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Ticket = {
  nome: string;
  data_evento: string;
  horario_inicio: string;
  horario_final: string;
  urlBanner: string;
  codigo?: string | number;
  preco_final: number; // ✅ ADD THIS
};

type ApiTicket = {
  id: number;
  codigo: string | number;
  tipo: string;
  evento_id: number;
  evento_: {
    id: number;
    nome: string;
    data_Evento: string;
    localizacao_: { nome: string; endereco: string; capacidade: number };
    urlBanner: string;
    capacidade_max: number;
    horario_Inicio: string;
    horario_Final: string;
    preco_base: number;
  };
  data_compra: string;
  valido: boolean;
  lote: number;
  usuario_id: number;
  preco_final: number;
};

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // platform-aware host for dev:
  const host =
    Platform.OS === "android"
      ? "https://10.0.2.2:7221" // Android emulator
      : "https://localhost:7221"; // iOS simulator or web

  useEffect(() => {
    let mounted = true;

    async function loadTickets() {
      setLoading(true);
      setError(null);

      try {
        const userLogin = await AsyncStorage.getItem("userLogin");

        const res = await fetch(`https://localhost:7221/Ingresso/ListarPorUsuario?usuario=${userLogin}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: ApiTicket[] = await res.json();

        if (!mounted) return;

        const ticketArray = Array.isArray(data) ? data : [data];

        const transformed: Ticket[] = ticketArray.map((item) => {
          const ev = item.evento_ || ({} as ApiTicket["evento_"]);
          return {
            codigo: item.codigo,
            nome: ev.nome ?? "Evento",
            data_evento: ev.data_Evento ?? "",
            horario_inicio: ev.horario_Inicio ?? "",
            horario_final: ev.horario_Final ?? "",
            urlBanner: ev.urlBanner ?? "",
            preco_final: item.preco_final,
          };
        });

        setTickets(transformed);
      } catch (err: any) {
        console.error("fetch error:", err);
        if (mounted) setError(err.message ?? "Fetch error");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadTickets();

    return () => {
      mounted = false;
    };
  }, [host]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />

      {loading && (
        <View>
          <Text>Carregando...</Text>
        </View>
      )}

      {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}

      {!loading && tickets.length === 0 && !error && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🎟️</Text>
          <Text style={styles.emptyTitle}>Você ainda não possui ingressos</Text>
          <Text style={styles.emptySubtitle}>
            Quando você comprar um ingresso, ele aparecerá aqui 😉
          </Text>
        </View>
      )}

      {tickets.map((t, i) => (
        <View key={t.codigo ?? i} style={{ marginBottom: 10 }}>
          <TicketCard {...t} preco_final={t.preco_final} />
        </View>
      ))}
    </ScrollView>
  );
}
