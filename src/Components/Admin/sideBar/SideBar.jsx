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
          <p>inicio</p>
        </Link>
        <p>pedidos</p>
        <p>Productos</p>
        <p>usuarios</p>
      </div>
      <div className="salir">Cerrar sesion</div>
    </div>
  );
};

export default SideBar;
