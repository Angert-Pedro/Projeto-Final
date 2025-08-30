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
        <EditField inputType="text" placeholder="Joao Pedro Cabral" />
        <EditField inputType="email" placeholder="joaoPedro@gmail.com" />
        <EditField inputType="password" placeholder="*******" />
        <EditField inputType="number" placeholder="(61) 97896-9879" />
      </div>
    </div>
  );
}

export default EditProfile;
