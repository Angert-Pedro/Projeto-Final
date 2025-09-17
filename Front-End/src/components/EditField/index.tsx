import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./style";

interface ProfileInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onIconPress?: () => void; // Função para quando o ícone for pressionado
  isPassword?: boolean;
}

const ProfileInputField: React.FC<ProfileInputProps> = ({
  label,
  value,
  onChangeText,
  onIconPress,
  isPassword = false,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={isPassword ? "••••••••" : value} // Mostra pontos para senha
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
          placeholderTextColor="#999"
          editable={!isPassword} // Impede a edição direta no campo de senha
          {...rest}
        />
        <TouchableOpacity onPress={onIconPress}>
          <Feather name="edit-2" size={20} color="#888" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileInputField;
