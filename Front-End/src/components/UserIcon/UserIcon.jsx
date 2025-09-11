import React from "react";
import "./UserIcon.css";
import UserLogo from "../assets/bxs-user.svg";

function UserIcon({ href }) {
  return (
    <a className="user-icon" href={href}>
      <img src={UserLogo} alt="Foto de Perfil" />
    </a>
  );
}

export default UserIcon;
