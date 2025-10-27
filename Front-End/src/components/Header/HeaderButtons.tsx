import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { IconName } from "@/helpers/iconNames";
import { FontAwesome } from "@expo/vector-icons";

type HeaderButtonProps = {
  icon: IconName;
  label: string;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  iconSize?: number;
  iconColor?: string;
};

const HeaderButton: React.FC<HeaderButtonProps> = ({
  icon,
  label,
  onPress,
  containerStyle,
  textStyle,
  iconSize = 24,
  iconColor = "#000",
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      <FontAwesome IconName={icon} size={iconSize} color={iconColor} />
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    color: "#000",
  },
});
