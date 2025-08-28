import React from "react";
import "./Header.css";
import Logo from "../assets/logoValidator.svg";
import HomeIcon from "../assets/home.svg";
import TicketIcon from "../assets/ticket-alt.svg";
import CardIcon from "../assets/address-card.svg";
import HeaderButton from "./HeaderButtons";
import UserIcon from "./UserIcon";

function Header() {
  return (
    <header className="container-header">
      <img src={Logo} alt="" />
      <div className="buttons-box">
        <HeaderButton ButtonIcon={HomeIcon} ButtonText="Home" />
        <HeaderButton ButtonIcon={TicketIcon} ButtonText="Ingressos" />
        <HeaderButton ButtonIcon={CardIcon} ButtonText="Minha carteirinha" />
      </div>
      <UserIcon />
    </header>
  );
}

export default Header;
