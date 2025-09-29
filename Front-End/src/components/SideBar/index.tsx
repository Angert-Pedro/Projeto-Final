import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

type SidebarProps = {
  activeScreen: string;
  onNavigate: (screenName: string) => void;
};

const Sidebar = ({ activeScreen, onNavigate }: SidebarProps) => {
  return (
    <View style={styles.sidebarContainer}>
      <TouchableOpacity onPress={() => onNavigate("edit")}>
        <Text
          style={[
            styles.tabText,
            activeScreen === "edit" ? styles.activeTabText : null,
          ]}
        >
          Editar dados
        </Text>{" "}
      </TouchableOpacity>

      {/* Botão Consultar carteirinha */}
      <TouchableOpacity onPress={() => onNavigate("id_card")}>
        <Text
          style={[
            styles.tabText,
            activeScreen === "id_card" ? styles.activeTabText : null,
          ]}
        >
          Consultar carteirinha
        </Text>
      </TouchableOpacity>

      {/* ... outros botões ... */}
    </View>
  );
};

export default Sidebar;
