import React from "react";
import {
  Text,
  View,
  SectionList,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { styles } from "./styles";

const FAQ_DATA = [
  {
    title: "Para Estudantes",
    data: [
      {
        id: "E1",
        q: "Como minha carteirinha é validada?",
        a: "Você deve apresentar sua carteirinha (física ou digital) ao organizador do evento. Ele usará o app Validator para escanear ou digitar seu número e verificar a autenticidade.",
      },
      {
        id: "E2",
        q: "Minha carteirinha foi recusada. O que fazer?",
        a: "O sistema verifica múltiplos fatores, como data de validade, entidade emissora e frequência escolar. Se sua carteirinha for inválida, você deve procurar a entidade que a emitiu para regularizar sua situação.",
      },
      {
        id: "E3",
        q: "Posso ver onde usei minha carteirinha?",
        a: "Sim, o aplicativo permite que você consulte seu histórico de validações.",
      },
    ],
  },
  {
    title: "Para Organizadores",
    data: [
      {
        id: "O1",
        q: "Como valido uma carteirinha?",
        a: "Após se autenticar, acesse a função de validação no app. Você pode escanear o QR code ou inserir o número da carteirinha. O sistema retornará o status em tempo real.",
      },
      {
        id: "O2",
        q: "O que acontece se a internet falhar?",
        a: "O Validator possui um modo de validação offline. As validações são salvas no dispositivo e sincronizadas com o sistema assim que a conexão for restabelecida.",
      },
      {
        id: "O3",
        q: "Como cadastro um novo evento?",
        a: 'No seu painel, você encontrará a opção "Novo Evento", onde poderá inserir dados como nome, local, data, etc.',
      },
      {
        id: "O4",
        q: "Posso extrair um relatório das validações?",
        a: "Sim. O sistema permite gerar relatórios de validação, com filtros e opção de exportação.",
      },
      {
        id: "O5",
        q: "O que o app faz se a carteirinha for falsa?",
        a: "O sistema é projetado para bloquear a entrada de carteirinhas inválidas e exibirá uma mensagem de erro clara para o operador.",
      },
    ],
  },
];

export default function FAQScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <SectionList
        sections={FAQ_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.question}>{item.q}</Text>
            <Text style={styles.answer}>{item.a}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ListFooterComponent={<View style={{ height: 30 }} />}
      />
    </SafeAreaView>
  );
}
