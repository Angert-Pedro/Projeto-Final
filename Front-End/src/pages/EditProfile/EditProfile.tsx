import React from "react";
import { View, useWindowDimensions } from "react-native";
import Header from "@/components/Header/Index";
import { InputField } from "@/components/InputField";
import Logo from "@/assets/logoValidator.svg";
import { styles } from "./EditProfile";

const ProfileScreen = () => {
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  // (Aqui no futuro vamos guardar os dados do formulário, como nome, email, etc.)

  return (
    // 2. O container principal que muda de estilo
    <View style={isWeb ? styles.containerWeb : styles.containerMobile}>
      {isWeb && <Header />}

      {/* 4. O container do formulário */}
      <View style={isWeb ? styles.formContainer : styles.fullWidth}></View>
    </View>
  );
};

export default ProfileScreen;
