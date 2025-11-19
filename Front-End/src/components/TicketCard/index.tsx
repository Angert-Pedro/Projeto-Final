import React, { useState } from "react";
import styles from "./styles";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";

type TicketCardProps = {
  title: string;
  date: string;
  time_start: string;
  time_end: string;
  imgURL: string;
  preco_final: number;
};

function formatDateToPt(dateInput: string) {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return dateInput;
  const months = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];
  const day = d.getDate();
  const month = months[d.getMonth()] ?? "";
  return `${day} de ${month}`;
}

// new: format time to "HH:MM"
function formatTimeToHours(dateTime: string) {
  if (!dateTime) return "";
  // Try ISO parse
  const d = new Date(dateTime);
  if (!Number.isNaN(d.getTime())) {
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }
  // Fallback: extract first HH:MM occurrence
  const m = dateTime.match(/(\d{1,2}):(\d{2})/);
  if (m) {
    const hh = String(Number(m[1])).padStart(2, "0");
    return `${hh}:${m[2]}`;
  }
  return dateTime;
}

export default function TicketCard(props: TicketCardProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const start = formatTimeToHours(props.time_start);
  const end = formatTimeToHours(props.time_end);

  return (
    <>
      <TouchableOpacity activeOpacity={0.9} onPress={() => setModalVisible(true)}>
        <View style={styles.outerContainer}>
          <Image source={{ uri: props.imgURL }} style={styles.image} />
          <View style={styles.container}>
            <Text style={styles.date}>{formatDateToPt(props.date)}</Text>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{start}</Text>
              <Text style={styles.timeText}>{end}</Text>
              <Text >R$ {props.preco_final.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 420,
              backgroundColor: "#fff",
              borderRadius: 10,
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
              {props.title}
            </Text>
            <Text style={{ marginBottom: 4 }}>{formatDateToPt(props.date)}</Text>
            <Text>
              {start} — {end}
            </Text>

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 12, alignSelf: "flex-end" }}
            >
              <Text style={{ color: "#007AFF", fontWeight: "600" }}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}