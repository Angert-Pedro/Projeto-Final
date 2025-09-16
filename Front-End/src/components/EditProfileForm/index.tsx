import { styles } from "./styles";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import EditField from "@/components/EditField";
import { Feather as Icon } from "@expo/vector-icons";

// (Este componente contém a lógica e a UI do formulário que criamos na resposta anterior)
// Ele recebe os dados e uma função de salvar como props.

interface EditProfileFormProps {
  initialData: {
    name: string;
    email: string;
    phone: string;
    avatarUrl: string | null;
  };
  onSave: (updatedData: {
    name: string;
    email: string;
    phone: string;
  }) => Promise<void>;
  navigation: any;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  initialData,
  onSave,
  navigation,
}) => {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [phone, setPhone] = useState(initialData.phone);
  const [avatar, setAvatar] = useState(initialData.avatarUrl);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveChanges = async () => {
    setIsSaving(true);
    await onSave({ name, email, phone });
    setIsSaving(false);
  };

  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        {/* ... Lógica do Avatar ... */}
      </View>
      <EditField label="Nome" value={name} onChangeText={setName} />
      <EditField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <EditField
        label="Senha"
        value=""
        isPassword={true}
        onChangeText={() => {}}
        onIconPress={() => navigation.navigate("ChangePasswordScreen")}
      />
      <EditField
        label="Celular"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveChanges}
        disabled={isSaving}
      >
        {isSaving ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.saveButtonText}>Salvar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileForm;
