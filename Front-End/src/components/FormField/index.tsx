import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { styles } from "./styles";

type FormFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isSecure?: boolean;
  forgotText?: string;
  onForgotPress?: () => void;
  errorMessage?: string;
} & TextInputProps;

const FormField: React.FC<FormFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  isSecure = false,
  forgotText,
  onForgotPress,
  errorMessage,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, !!errorMessage && styles.inputError]}
        placeholder={placeholder}
        placeholderTextColor="#8A8A8E"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        {...rest}
      />

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {/* Renderiza o link "Esqueceu?" somente se o texto for fornecido */}
      {forgotText && onForgotPress && (
        <TouchableOpacity onPress={onForgotPress}>
          <Text style={styles.forgotUserText}>{forgotText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormField;
