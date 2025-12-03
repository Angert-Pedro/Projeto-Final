import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import styles from './styles';

type Carteirinha = {
  id: number;
  pessoa_id: number;
  instituicao: string;
  curso: string;
  matricula: string;
  foto: string;
  dataNascimento: string; 
  tipoCurso: string;
  entidadeEmissora: string;
  nome: string;
  qrCode: string; 
  turno: string;
  codigoUso: string;
  validade: string; 
};


function formatDate(iso?: string) {
  if (!iso) return '-';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch (e) {
    return iso;
  }
}

export default function CarteirinhaScreen({ route }: any) {
  // Expecting route.params.carteirinha to be passed from navigation
  const data: Carteirinha = route?.params?.carteirinha;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Image
            source={{ uri: data.foto }}
            style={styles.photo}
            resizeMode="cover"
          />
          <View style={styles.headerText}>
            <Text style={styles.instituicao} numberOfLines={2}>
              {data.instituicao}
            </Text>
            <Text style={styles.curso}>{data.curso}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Nome</Text>
          <Text style={styles.value}>{data.nome}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Data de nascimento</Text>
          <Text style={styles.value}>{formatDate(data.dataNascimento)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Matrícula</Text>
          <Text style={styles.value}>{data.matricula}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Tipo de curso</Text>
          <Text style={styles.value}>{data.tipoCurso}</Text>
        </View>

        <View style={styles.infoRow}
          accessibilityRole="image"
          accessibilityLabel={`QR code com código ${data.codigoUso}`}>
          <Text style={styles.label}>Validade</Text>
          <Text style={styles.value}>{formatDate(data.validade)}</Text>
        </View>

        <View style={styles.qrContainer}>
          {data.qrCode ? (

            <View>
              <QRCode
                value={data.qrCode}
                size={160}
              />
            </View>
          ) : (
            <Text style={styles.value}>QR não disponível</Text>
          )}
        </View>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Código de uso: {data.codigoUso}</Text>
        </View>
      </View>
    </ScrollView>
  );
}


