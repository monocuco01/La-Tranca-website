import React from "react";
import { Link } from "react-router-dom"; // Asegúrate de importar Link si estás utilizando react-router
import "./usernvabar.css";
import logito from "../../../img/la tranca amarillo2.png";

const UserNavBar = () => {
  return (
    <nav className="user-navbar">
      <div className="logo">
        {" "}
        <img src={logito} alt="" />
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/orders">Mis Pedidos</Link>
        </li>
        <li>
          <Link to="/account">Perfil</Link>
        </li>
        {/* Agrega más elementos de menú según tus necesidades */}
      </ul>
    </nav>
  );
};

export default UserNavBar;
