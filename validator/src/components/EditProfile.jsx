import React from "react";
import UserEditIcon from "../assets/account-edit.svg";
import EditField from "./EditField";
import "./EditProfile.css";

function EditProfile() {
  return (
    <div className="box-editProfile">
      <h2>Editar perfil</h2>
      <img src={UserEditIcon} alt="" className="editPhoto" />
      <div>
        <EditField inputType="text" placeholder="Digite seu Nome" />
        <EditField inputType="text" placeholder="Digite seu Usuario" />
        <EditField inputType="password" placeholder="Digite sua Senha" />
        <EditField inputType="email" placeholder="Digite seu Email" />
        <EditField inputType="number" placeholder="Digite seu Telefone" />
      </div>
    </div>
  );
}

export default EditProfile;
