// import React from "react";
// import "./Header.css";
// import HeaderButton from "./HeaderButtons";
import Logo from "@/assets/logoValidator.svg";
// import HomeIcon from "../assets/home.svg";
// import TicketIcon from "../assets/ticket-alt.svg";
// import CardIcon from "../assets/address-card.svg";
// import UserIcon from "../UserIcon";

import {
  View,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageSourcePropType,
} from "react-native";

interface HeaderProps extends TouchableOpacityProps {
  ImageSource: "";
}

export default function Header({ ImageSource }: HeaderProps) {
  return (
    <View className="container-header">
      <Image source={ImageSource} />
      <View className="buttons-box">
        <HeaderButton ButtonIcon={HomeIcon} ButtonText="Home" />
        <HeaderButton ButtonIcon={TicketIcon} ButtonText="Ingressos" />
        <HeaderButton ButtonIcon={CardIcon} ButtonText="Minha carteirinha" />
      </View>
      <UserIcon />
    </View>
  );
}
