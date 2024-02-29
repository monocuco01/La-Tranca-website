import React from "react";
import "./sideBar.css";
import logito from "../../../img/la tranca amarillo2.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/loginSlice";

import { clearUser } from "../../redux/userSlice"; // Importa la acción clearUser
import { clearCart } from "../../redux/cardSlice";
const SideBar = () => {
  const dispatch = useDispatch();

  const handerSalir = () => {
    dispatch(clearUser());
    dispatch(logout());
    dispatch(clearCart());
  };
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
      <div onClick={handerSalir} className="salir">
        <Link to="/">Cerrar sesión</Link>
      </div>
    </div>
  );
};

export default SideBar;
