import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

export type EventStatus = "Validado" | "Em Análise" | "Reprovado";

type EventCardProps = {
  imageUrl: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  status: EventStatus;
};

const statusConfig = {
  Validado: {
    iconName: "check-circle" as const,
    color: "#2E7D32",
  },
  "Em Análise": {
    iconName: "radio-button-unchecked" as const,
    color: "#FF8F00",
  },
  Reprovado: {
    iconName: "close" as const,
    color: "#C62828",
  },
};

const EventCard = ({
  imageUrl,
  eventName,
  eventDate,
  eventLocation,
  status,
}: EventCardProps) => {
  const currentStatus = statusConfig[status];

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: imageUrl }} style={styles.eventImage} />

      <View style={styles.textContainer}>
        <Text style={styles.eventName}>{`Evento: ${eventName}`}</Text>
        <Text style={styles.eventDetails}>{`Data: ${eventDate}`}</Text>
        <Text style={styles.eventDetails}>{`Local: ${eventLocation}`}</Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { color: currentStatus.color }]}>
          {status}
        </Text>
        <MaterialIcons
          name={currentStatus.iconName}
          size={28}
          color={currentStatus.color}
        />
      </View>
    </View>
  );
};

export default EventCard;
