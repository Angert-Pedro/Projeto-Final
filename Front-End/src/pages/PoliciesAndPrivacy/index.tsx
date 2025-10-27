import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import Header from "@/components/Header/Header";
import styles from "./styles";

const PoliciesAndPrivacy = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Política de Privacidade</Text>

        <Text style={styles.sectionTitle}>1. Introdução</Text>
        <Text style={styles.text}>
          Esta Política de Privacidade descreve como o Validator coleta, usa, armazena, compartilha e protege as informações pessoais dos usuários que utilizam o aplicativo Validator para a validação de carteirinhas estudantis para ingressos de filmes e eventos. Ao utilizar o aplicativo, você concorda com as práticas descritas nesta política.
        </Text>

        <Text style={styles.sectionTitle}>2. Informações Coletadas</Text>
        <Text style={styles.subSectionTitle}>2.1 Informações Pessoais</Text>
        <Text style={styles.text}>
          Nome completo;
          Endereço de e-mail;
          Número de matrícula;
          Imagens da carteirinha estudantil;
          Data de nascimento (caso necessário para a verificação de elegibilidade);
          Instituição de ensino.
        </Text>

        <Text style={styles.subSectionTitle}>2.2 Informações do Dispositivo</Text>
        <Text style={styles.text}>
          Modelo de dispositivo;
          Sistema operacional;
          Endereço IP;
          Tipo de conexão de rede (Wi-Fi, dados móveis, etc.);
          Informações de localização (caso o aplicativo precise acessar para funções específicas, como eventos próximos).
        </Text>

        <Text style={styles.subSectionTitle}>2.3 Informações de Uso</Text>
        <Text style={styles.text}>
          Logs de atividades (informações sobre como você usa o aplicativo, como interações com a interface, tempo gasto em telas específicas e outras métricas).
        </Text>

        <Text style={styles.sectionTitle}>3. Como Usamos Suas Informações</Text>
        <Text style={styles.subSectionTitle}>3.1 Validação da Carteirinha Estudantil</Text>
        <Text style={styles.text}>
          Usamos suas informações, como nome, matrícula e imagem da carteirinha, para validar a autenticidade do seu vínculo acadêmico e possibilitar descontos em ingressos de filmes e eventos.
        </Text>

        <Text style={styles.subSectionTitle}>3.2 Melhoria do Serviço</Text>
        <Text style={styles.text}>
          As informações de uso e dados do dispositivo ajudam a entender como os usuários interagem com o aplicativo e permitem melhorar a experiência de uso, corrigir bugs e otimizar funcionalidades.
        </Text>

        <Text style={styles.subSectionTitle}>3.3 Comunicação</Text>
        <Text style={styles.text}>
          Podemos usar seu endereço de e-mail para enviar notificações sobre o status da validação da carteirinha, promoções de eventos ou mudanças importantes nos nossos Termos de Uso ou Política de Privacidade.
        </Text>

        <Text style={styles.subSectionTitle}>3.4 Segurança</Text>
        <Text style={styles.text}>
          Para garantir a segurança do aplicativo e proteger suas informações pessoais contra fraudes ou acessos não autorizados, as informações coletadas podem ser usadas para identificar e prevenir atividades fraudulentas.
        </Text>

        <Text style={styles.sectionTitle}>4. Compartilhamento de Dados</Text>
        <Text style={styles.subSectionTitle}>4.1 Com Instituições de Ensino</Text>
        <Text style={styles.text}>
          Se necessário para validar a autenticidade da carteirinha estudantil, podemos compartilhar suas informações com a instituição de ensino que você informou, para que ela confirme o seu vínculo acadêmico.
        </Text>

        <Text style={styles.subSectionTitle}>4.2 Com Parceiros de Eventos</Text>
        <Text style={styles.text}>
          Caso você utilize o Validator para acessar descontos em eventos, podemos compartilhar as informações necessárias com os organizadores dos eventos para garantir que você receba o desconto ou benefício adequado.
        </Text>

        <Text style={styles.subSectionTitle}>4.3 Com Provedores de Serviços</Text>
        <Text style={styles.text}>
          Podemos compartilhar seus dados com fornecedores de serviços terceiros que nos ajudam a operar o aplicativo, como servidores de armazenamento, serviços de envio de e-mails ou processamento de pagamentos (se aplicável). Esses terceiros são obrigados a proteger seus dados de acordo com esta Política de Privacidade.
        </Text>

        <Text style={styles.subSectionTitle}>4.4 Cumprimento da Lei</Text>
        <Text style={styles.text}>
          Podemos divulgar suas informações quando solicitado por uma autoridade legal ou em resposta a um processo judicial, para cumprir com leis aplicáveis ou proteger nossos direitos, propriedade e segurança.
        </Text>

        <Text style={styles.sectionTitle}>5. Segurança das Informações</Text>
        <Text style={styles.text}>
          O Validator adota medidas de segurança técnicas e administrativas para proteger suas informações pessoais contra perda, uso indevido, acesso não autorizado, divulgação, alteração ou destruição. Contudo, é importante observar que nenhum método de transmissão pela internet ou de armazenamento eletrônico é 100% seguro, e, embora nos esforcemos para proteger suas informações, não podemos garantir total segurança.
        </Text>

        <Text style={styles.sectionTitle}>6. Retenção de Dados</Text>
        <Text style={styles.text}>
          Reteremos suas informações pessoais pelo tempo necessário para cumprir com as finalidades descritas nesta Política de Privacidade, a menos que a lei exija ou permita um período de retenção mais longo.
        </Text>

        <Text style={styles.sectionTitle}>7. Seus Direitos</Text>
        <Text style={styles.subSectionTitle}>7.1 Direito de Acesso</Text>
        <Text style={styles.text}>
          Você pode solicitar informações sobre quais dados pessoais estamos mantendo em nossos registros. Se solicitado, forneceremos uma cópia dessas informações.
        </Text>

        <Text style={styles.subSectionTitle}>7.2 Correção e Exclusão</Text>
        <Text style={styles.text}>
          Você pode atualizar ou corrigir qualquer dado pessoal incorreto ou incompleto. Também pode solicitar a exclusão de suas informações pessoais, exceto quando exigido por lei para retenção.
        </Text>

        <Text style={styles.subSectionTitle}>7.3 Retirada do Consentimento</Text>
        <Text style={styles.text}>
          Você pode retirar seu consentimento para o uso de suas informações pessoais a qualquer momento, o que pode afetar a sua capacidade de usar certos recursos do aplicativo. Para isso, entre em contato conosco diretamente.
        </Text>

        <Text style={styles.sectionTitle}>8. Alterações nesta Política de Privacidade</Text>
        <Text style={styles.text}>
          O Validator se reserva o direito de atualizar esta Política de Privacidade periodicamente. Caso ocorram alterações significativas, notificaremos os usuários por meio do aplicativo ou por e-mail, conforme apropriado. Recomendamos que você revise esta política regularmente para estar ciente de qualquer alteração.
        </Text>

        <Text style={styles.sectionTitle}>9. Contatos</Text>
        <Text style={styles.text}>
          Se você tiver dúvidas ou preocupações sobre nossa Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato conosco diretamente através do aplicativo.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PoliciesAndPrivacy;
