import { styles } from "./styles";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// Usamos 'any' por simplicidade, mas em um projeto grande,
// você pode importar o tipo específico do React Navigation.
type FooterProps = {
  navigation: any;
};

// --- Dados dos Links ---
// Organizar os links em arrays facilita a manutenção.
const leftColumnLinks = [
  { title: "Home", route: "home" },
  { title: "Minha Carteirinha", route: "register-student-card" },
  { title: "Meus Ingressos", route: "my-tickets" },
  { title: "FAQ’s", route: "faq" },
];

const rightColumnLinks = [
  { title: "Suporte", route: "support" },
  { title: "Feedback", route: "feedback" },
  { title: "Termos e Condições", route: "terms-and-conditions" },
  { title: "Políticas e Privacidade", route: "policies-and-privacy" },
];

const Footer: React.FC<FooterProps> = ({ navigation }) => {
  const handleNavigation = (routeName: string) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.footerContainer}>
      <View style={styles.linksContainer}>
        {/* Coluna da Esquerda */}
        <View style={styles.column}>
          {leftColumnLinks.map((link) => (
            <TouchableOpacity
              key={link.title}
              onPress={() => handleNavigation(link.route)}
            >
              <Text
                style={[
                  styles.linkText,
                  link.title === "Home" && styles.boldText,
                ]}
              >
                {link.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Separador Vertical */}
        <View style={styles.separator} />

        {/* Coluna da Direita */}
        <View style={styles.column}>
          {rightColumnLinks.map((link) => (
            <TouchableOpacity
              key={link.title}
              onPress={() => handleNavigation(link.route)}
            >
              <Text style={styles.linkText}>{link.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.copyrightText}>Todos os direitos reservados</Text>
    </View>
  );
};

export default Footer;
