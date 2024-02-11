import React from "react";
import SideBar from "../sideBar/SideBar";
import "./inicio.css";
const Inicio = () => {
  return (
    <div className="containerallinicio">
      <SideBar />
      <div className="containerInicioAdmim">
        Inicio
        <div className="containeraccount">
          aqui van a ir la cantidad de cuentas creadas{" "}
        </div>
        <div className="containerusers">
          aqui van a ir la cantidad de ordenes creadas
        </div>
        <table>assa</table>
      </div>
    </div>
  );
};

export default Inicio;
