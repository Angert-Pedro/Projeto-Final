import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import EditProfile from "./components/editProfile";
import "./App.css";

// Componentes simples de exemplo para as páginas
const Home = () => <h2>Página Inicial</h2>;
const Profile = () => <h2>Página de Perfil</h2>;

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editarperfil" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
