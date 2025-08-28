import React from "react";
import "./HeaderButtons.css";

function HeaderButton({ ButtonText, ButtonIcon }) {
  return (
    <a className="header-button" href="#">
      <img src={ButtonIcon} alt="" />
      <p>{ButtonText}</p>
    </a>
  );
}

export default HeaderButton;
