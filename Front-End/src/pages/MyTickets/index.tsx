import styles from "./styles";
import React from 'react';
import TicketCard from "@/components/TicketCard";
import { View } from "react-native";
import Header from "@/components/Header/Header";

export default function MyTickets() {
  const ticketProps = {
    title: "Show da Banda X",
    date: "2024-07-15",
    time_start: "20:00",
    time_end: "23:00",
    imgURL: "https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg"
  }

  return (
    
    <View style={styles.container}>
      <Header />
      <TicketCard {...ticketProps} />
    </View>
  )
}