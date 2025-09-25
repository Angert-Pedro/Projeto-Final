import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Navigator } from "expo-router";

function handleNavigate(screenName: string) {
  Navigator.push(screenName);}
