import React from "react";
import "./HeaderButtons.css";

function HeaderButton({ ButtonText, ButtonIcon, Width }) {
  return (
    <a className="header-button" href="#">
      <img src={ButtonIcon} alt=""  width={Width}/>
      <p>{ButtonText}</p>
    </a>
  );
}

export default HeaderButton;
