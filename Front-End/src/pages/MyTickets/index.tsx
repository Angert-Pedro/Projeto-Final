import styles from "./styles";
import React, { useEffect, useState } from "react";
import TicketCard from "@/components/TicketCard";
import { View, Platform, Text } from "react-native";
import Header from "@/components/Header/Header";

type Ticket = {
  title: string;
  date: string;
  time_start: string;
  time_end: string;
  imgURL: string;
  codigo?: string | number;
};

type ApiTicket = {
  id: number;
  codigo: string | number;
  evento_: {
    nome: string;
    data_Evento: string;
    localizacao_: {
      nome: string;
      endereco: string;
      capacidade: number;
    }
    urlBanner: string;
    capacidade_max: number;
    horario_Inicio: string;
    horario_Final: string;
  };
  data_compra: string;
  valido: boolean;
  lote: number;
  preco_base: number;
};

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // platform-aware host for dev:
  const host =
    Platform.OS === "android"
      ? "http://10.0.2.2:7221" // Android emulator
      : "http://localhost:7221"; // iOS simulator or web

  useEffect(() => {
    let mounted = true;
    async function loadTickets() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://localhost:7221/Ingresso", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        console.log("fetch response:", res);
        const data: ApiTicket[] = await res.json();

        if (!mounted) return;

        // transform API shape to TicketCard props
        const transformed: Ticket[] = (data || []).map((item) => {
          const ev = item.evento_ || ({} as ApiTicket["evento_"]);
          return {
            codigo: item.codigo,
            title: ev.nome ?? "Evento",
            date: ev.data_Evento ?? "",
            time_start: ev.horario_Inicio ?? "",
            time_end: ev.horario_Final ?? "",
            imgURL: ev.urlBanner ?? "",
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
    <View style={styles.container}>
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
        <TicketCard key={t.codigo ?? i} {...t} />
      ))}
    </View>
  );
}