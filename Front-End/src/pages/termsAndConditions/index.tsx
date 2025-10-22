import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import Header from "@/components/Header/Header";
import styles from "./styles";

const TermsAndConditions = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
        <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Termos e Condições de Uso</Text>

        <Text style={styles.sectionTitle}>1. Introdução</Text>
        <Text style={styles.text}>
          Bem-vindo ao Validator! Ao usar nosso aplicativo de validação de carteirinhas estudantis para ingressos de filmes e eventos, você concorda com os seguintes Termos e Condições. Caso não concorde com estes termos, pedimos que não utilize nosso serviço.
        </Text>

        <Text style={styles.sectionTitle}>2. Aceitação dos Termos</Text>
        <Text style={styles.text}>
          Ao acessar ou usar o aplicativo Validator, você concorda em cumprir todos os termos e condições estabelecidos aqui, incluindo as Políticas de Privacidade e qualquer outro termo ou política vinculada a este serviço.
        </Text>

        <Text style={styles.sectionTitle}>3. Objetivo do Aplicativo</Text>
        <Text style={styles.text}>
          O Validator tem como objetivo validar e verificar a autenticidade de carteirinhas estudantis, oferecendo aos usuários a possibilidade de obter descontos em ingressos para filmes, eventos culturais e outras atividades relacionadas, mediante comprovação de vínculo acadêmico.
        </Text>

        <Text style={styles.sectionTitle}>4. Cadastro e Conta de Usuário</Text>
        <Text style={styles.text}>
          Para utilizar os serviços do aplicativo, pode ser necessário realizar um cadastro, fornecendo informações precisas e verdadeiras, como nome completo, número de matrícula, e-mail e outros dados pessoais. O usuário é responsável por manter a confidencialidade da sua conta e por todas as atividades realizadas em sua conta.
        </Text>

        <Text style={styles.subSectionTitle}>4.1 Responsabilidade do Usuário</Text>
        <Text style={styles.text}>
          O usuário concorda em notificar imediatamente a equipe do Validator sobre qualquer uso não autorizado de sua conta. O Validator não se responsabiliza por danos ou perdas resultantes de falhas no processo de segurança ou do uso indevido da conta.
        </Text>

        <Text style={styles.sectionTitle}>5. Uso do Aplicativo</Text>
        <Text style={styles.subSectionTitle}>5.1 Licença Limitada</Text>
        <Text style={styles.text}>
          O Validator concede ao usuário uma licença limitada, não exclusiva, intransferível e revogável para utilizar o aplicativo de acordo com estes Termos e Condições. O uso do aplicativo está restrito aos fins descritos aqui, e o usuário concorda em não usar o aplicativo para qualquer outra finalidade sem o consentimento prévio do Validator.
        </Text>

        <Text style={styles.subSectionTitle}>5.2 Proibições</Text>
        <Text style={styles.text}>
          O usuário concorda em não:
          - Submeter informações falsas ou fraudulentas ao aplicativo.
          - Utilizar o aplicativo para atividades ilegais ou fraudulentas.
          - Modificar, distribuir ou criar trabalhos derivados do aplicativo.
          - Interferir na funcionalidade do aplicativo ou em sua segurança.
        </Text>

        <Text style={styles.sectionTitle}>6. Validação de Carteirinha Estudantil</Text>
        <Text style={styles.text}>
          O processo de validação da carteirinha estudantil depende da verificação de informações enviadas pelo usuário, como foto da carteirinha e dados pessoais. O Validator pode validar esses dados com a instituição educacional do usuário ou por meio de outros métodos de verificação, conforme disponível.
        </Text>

        <Text style={styles.sectionTitle}>7. Coleta e Uso de Dados Pessoais</Text>
        <Text style={styles.text}>
          O Validator coleta dados pessoais para oferecer seus serviços e garantir a validade das carteirinhas estudantis. As informações coletadas podem incluir, mas não estão limitadas a:
          - Dados de identificação pessoal (nome, e-mail, matrícula);
          - Imagens da carteirinha estudantil;
          - Dados de dispositivos móveis.
        </Text>

        <Text style={styles.subSectionTitle}>7.1 Compartilhamento de Dados</Text>
        <Text style={styles.text}>
          O Validator pode compartilhar dados pessoais com terceiros apenas nos seguintes casos:
          - Quando necessário para cumprir a lei ou regulamentos governamentais.
          - Para validar a carteirinha estudantil com instituições educacionais.
        </Text>

        <Text style={styles.sectionTitle}>8. Propriedade Intelectual</Text>
        <Text style={styles.text}>
          O aplicativo Validator, incluindo todos os seus conteúdos, marcas, logotipos, design e funcionalidades, são de propriedade do Validator ou licenciados para ele. O usuário não adquire nenhum direito de propriedade sobre o aplicativo ou seus conteúdos ao usá-lo.
        </Text>

        <Text style={styles.sectionTitle}>9. Responsabilidade</Text>
        <Text style={styles.text}>
          O Validator se empenha para oferecer um serviço seguro e eficiente, mas não se responsabiliza por:
          - A precisão das informações fornecidas pelo usuário;
          - Problemas técnicos, falhas ou interrupções no serviço;
          - Danos diretos ou indiretos resultantes do uso ou da incapacidade de uso do aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>10. Alterações nos Termos</Text>
        <Text style={styles.text}>
          O Validator se reserva o direito de alterar ou atualizar estes Termos e Condições a qualquer momento, com ou sem aviso prévio. O usuário deve revisar periodicamente os termos para se manter informado sobre qualquer modificação.
        </Text>

        <Text style={styles.sectionTitle}>11. Cancelamento e Suspensão</Text>
        <Text style={styles.text}>
          O Validator pode suspender ou cancelar a conta de um usuário caso identifique violação dos Termos e Condições ou comportamento fraudulentos. O usuário pode, a qualquer momento, encerrar sua conta, seguindo as instruções no aplicativo.
        </Text>

        <Text style={styles.sectionTitle}>12. Rescisão</Text>
        <Text style={styles.text}>
          A rescisão de qualquer parte deste contrato pode ocorrer caso o usuário ou o Validator decida interromper o uso do aplicativo, conforme os termos definidos.
        </Text>

        <Text style={styles.sectionTitle}>13. Isenção de Garantias</Text>
        <Text style={styles.text}>
          O aplicativo é fornecido "como está", sem garantias de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a, garantias de comercialização ou adequação para um propósito específico.
        </Text>

        <Text style={styles.sectionTitle}>14. Disposições Gerais</Text>
        <Text style={styles.subSectionTitle}>14.1 Lei Aplicável</Text>
        <Text style={styles.text}>
          Estes Termos e Condições serão regidos e interpretados de acordo com as leis do Brasil.
        </Text>

        <Text style={styles.subSectionTitle}>14.2 Resolução de Disputas</Text>
        <Text style={styles.text}>
          Qualquer disputa ou reclamação resultante ou relacionada a este contrato será resolvida por meio de mediação ou arbitragem, conforme estabelecido na legislação vigente.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};



export default TermsAndConditions;