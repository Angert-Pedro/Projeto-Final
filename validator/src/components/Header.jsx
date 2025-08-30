import "./Header.css";
import HomeIcon from "../assets/home.svg";
import HeaderButton from "./HeaderButtons";
import Logo from "../assets/logoValidator.svg";
import TicketIcon from "../assets/ticket-alt.svg";
import CardIcon from "../assets/address-card.svg";
import BurguerMenu from "../assets/burger-menu-svgrepo-com.svg";

function Header() {
  return (
    <>
      <header className="container-header">
        <img src={Logo} alt="Logo" />

        <div className="buttons-box">
          <div className="desktop-buttons">
            <HeaderButton ButtonIcon={HomeIcon} ButtonText="Home" />
            <HeaderButton ButtonIcon={TicketIcon} ButtonText="Ingressos" />
            <HeaderButton
              ButtonIcon={CardIcon}
              ButtonText="Minha carteirinha"
            />
          </div>

          <div className="mobile-button">
            <HeaderButton
              ButtonIcon={BurguerMenu}
              ButtonText="Menu"
              Width={40}
            />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
