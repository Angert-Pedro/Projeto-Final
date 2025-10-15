import { Stack } from "expo-router/stack";
import React from "react";
import Toast from "react-native-toast-message";

export default function Layout() {
  return (
    <><Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
      <Stack.Screen name="create-profile" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="RecuperarSenha" options={{ headerShown: false }} />
    </Stack><Toast /></>
  );
} 