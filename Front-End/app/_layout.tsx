import { Stack } from "expo-router/stack";
import React from "react";
import Toast from "react-native-toast-message";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <><Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
        <Stack.Screen name="create-profile" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="faq" options={{ headerShown: false }} />
        <Stack.Screen name="feedback" options={{ headerShown: false }} />
        <Stack.Screen name="support" options={{ headerShown: false }} />
        <Stack.Screen name="RecuperarSenha" options={{ headerShown: false }} />
        <Stack.Screen name="register-student-card" options={{ headerShown: false }} />
        <Stack.Screen name="my-tickets" options={{ headerShown: false }} />
        <Stack.Screen name="AtivarConta" options={{ headerShown: false }} />
        <Stack.Screen name="terms-and-conditions" options={{ headerShown: false }} />
        <Stack.Screen name="policies-and-privacy" options={{ headerShown: false }} />
        <Stack.Screen name="details-event" options={{ headerShown: false }} />
        <Stack.Screen name="edit-event" options={{ headerShown: false }} />
        <Stack.Screen name="create-event" options={{ headerShown: false }} />
      </Stack><Toast /></>
    </AuthProvider>
  );
} 