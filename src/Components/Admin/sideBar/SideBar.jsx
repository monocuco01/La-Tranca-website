import React from "react";
import "./sideBar.css";
import logito from "../../../img/la tranca amarillo2.png";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="containerSideBarAdmin">
      <div className="containerIMGadminbar">
        <img src={logito} alt="" />
      </div>
      <div className="containerOpcionesBar">
        <Link to="/adminpart/inicio">
          <p>Inicio</p>
        </Link>
        <Link to="/adminpart/pedidos">
          <p>Pedidos</p>
        </Link>
        <Link to="/adminpart/productos">
          <p>Productos</p>
        </Link>
        <Link to="/adminpart/users">
          <p>Usuarios</p>
        </Link>
      </div>
      <div className="salir">Cerrar sesión</div>
    </div>
  );
};

export default SideBar;
