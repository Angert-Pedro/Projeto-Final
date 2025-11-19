  import React, { useState } from "react";
  import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
  import styles from "./styles";

  type TicketModalProps = {
    visible: boolean;
    onClose: () => void;
    evento: any; // or the real type of Evento
    onCreate: (ingresso: any) => void;
  };


  export default function TicketModal({ visible, onClose, evento, onCreate }: TicketModalProps) {
    const [tipo, setTipo] = useState<"MEIA_ESTUDANTE" | "INTEIRA">("INTEIRA");
    const [lote, setLote] = useState<1 | 2>(1);

    function generateRandomCodigo() {
      return Math.floor(Math.random() * 900000 + 100000).toString(); // 6 digits
    }

    function handleCreate() {
      const ingresso = {
        codigo: generateRandomCodigo(),
        tipo: tipo,
        eventoId: evento.id,
        data_Compra: new Date(),
        valido: true,
        lote: lote,
        preco_Base: lote === 1 ? 200 : 250,
      };
      console.log("JSON enviado:", JSON.stringify(ingresso));
      onCreate(ingresso);
      onClose();
    }

    return (
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.backdrop}>
          <View style={styles.box}>
            <Text style={styles.title}>Criar Ingresso</Text>

            {/* Tipo */}
            <Text style={styles.label}>Tipo</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.btn, tipo === "INTEIRA" && styles.selected]}
                onPress={() => setTipo("INTEIRA")}
              >
                <Text>INTEIRA</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, tipo === "MEIA_ESTUDANTE" && styles.selected]}
                onPress={() => setTipo("MEIA_ESTUDANTE")}
              >
                <Text>MEIA ESTUDANTE</Text>
              </TouchableOpacity>
            </View>

            {/* Lote */}
            <Text style={styles.label}>Lote</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.btn, lote === 1 && styles.selected]}
                onPress={() => setLote(1)}
              >
                <Text>Lote 1 (R$ 200)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, lote === 2 && styles.selected]}
                onPress={() => setLote(2)}
              >
                <Text>Lote 2 (R$ 250)</Text>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity onPress={onClose} style={styles.cancel}>
                <Text>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleCreate} style={styles.confirm}>
                <Text style={{ color: "#fff" }}>Criar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    );
  }