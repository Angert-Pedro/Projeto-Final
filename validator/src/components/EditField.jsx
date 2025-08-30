import React from "react";
import EditSquare from "../assets/square-edit-outline.svg";
import "./EditField.css";

function EditField({ inputType, placeholder }) {
  //placeholder vai ter os dados tirados do BD do usuario, nome, email, senha representada por ****
  return (
    <div className="box-editField">
      <input type={inputType} placeholder={placeholder} />
      <img src={EditSquare} alt="Ícone de edição" />
    </div>
  );
}

export default EditField;
