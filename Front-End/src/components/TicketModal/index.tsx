import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

type TicketModalProps = {
  visible: boolean;
  onClose: () => void;
  evento: any;
  onCreate: (ingresso: any) => void;
  precoBase: number;
};

export default function TicketModal({
  visible,
  onClose,
  evento,
  onCreate,
  precoBase,
}: TicketModalProps) {
  const [tipo, setTipo] = useState<"MEIA_ESTUDANTE" | "INTEIRA">("INTEIRA");
  const [lote, setLote] = useState<1 | 2>(1);

  const [userId, setUserId] = useState<number | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [hasCarteirinha, setHasCarteirinha] = useState(false);

  useEffect(() => {
    if (visible) loadUserData();
  }, [visible]);

  async function loadUserData() {
    try {
      setLoadingUser(true);

      const userLogin = await AsyncStorage.getItem("userLogin");

      if (!userLogin) {
        console.warn("Nenhum userLogin salvo no AsyncStorage.");
        setLoadingUser(false);
        return;
      }

      const response = await fetch(`https://localhost:7221/Usuario/consultarUsuario?usuario=${userLogin}`);

      if (!response.ok) {
        console.warn("Erro ao buscar usuário pela API.");
        setLoadingUser(false);
        return;
      }

      const usuario = await response.json();

      const carteirinhaResponse = await fetch(`https://localhost:7221/Validacao/listarValidacaoPorUsuario?usuario=${userLogin}`);

      if (!carteirinhaResponse.ok) {
        console.warn("Erro ao buscar carteirinha pela API.");
        setLoadingUser(false);
        return;
      }

      setHasCarteirinha(carteirinhaResponse.status === 200);

      if (usuario?.id) {
        setUserId(usuario.id);
      } else {
        console.warn("API não retornou ID do usuário.");
      }
    } catch (e) {
      console.warn("Erro ao carregar usuário:", e);
    } finally {
      setLoadingUser(false);
    }
  }

  function generateRandomCodigo() {
    return Math.floor(Math.random() * 900000 + 100000).toString();
  }

  function calculatePrecoFinal() {
    let preco = precoBase;
    if (tipo === "MEIA_ESTUDANTE") preco = preco / 2;
    return preco;
  }

  function handleCreate() {
    if (!userId) {
      console.warn("User ID ainda não carregado.");
      return;
    }

    const ingresso = {
      codigo: generateRandomCodigo(),
      tipo,
      evento_id: evento.id,
      data_Compra: new Date(),
      valido: true,
      lote,
      usuario_id: userId, // ← agora carregado corretamente
      preco_final: calculatePrecoFinal(),
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

          {loadingUser && (
            <View style={{ alignItems: "center", marginBottom: 10 }}>
              <ActivityIndicator size="large" />
              <Text>Carregando usuário...</Text>
            </View>
          )}

          {/* Tipo */}
          <Text style={styles.label}>Tipo</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btn, tipo === "INTEIRA" && styles.selected]}
              onPress={() => setTipo("INTEIRA")}
            >
              <Text>INTEIRA</Text>
            </TouchableOpacity>

            {hasCarteirinha && (
              <TouchableOpacity
                style={[styles.btn, tipo === "MEIA_ESTUDANTE" && styles.selected]}
                onPress={() => setTipo("MEIA_ESTUDANTE")}
              >
                <Text>MEIA ESTUDANTE</Text>
              </TouchableOpacity>
            )}
          </View>


          {/* Lote */}
          <Text style={styles.label}>Lote</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btn, lote === 1 && styles.selected]}
              onPress={() => setLote(1)}
            >
              <Text>Lote 1 (R$ {calculatePrecoFinal()})</Text>
            </TouchableOpacity>
          </View>

          {/* Botões */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleCreate}
              style={[styles.confirm, (!userId || loadingUser) && { opacity: 0.5 }]}
              disabled={!userId || loadingUser}
            >
              <Text style={{ color: "#fff" }}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
