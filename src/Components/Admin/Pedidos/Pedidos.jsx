import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../sideBar/SideBar";
import "./pedidos.css";
import CardsOrder from "./cardsOrder";

const Pedidos = () => {
  return (
    <div className="containerAllPedidos">
      <SideBar />
      <div className="containercardsOrder">
        <div className="containerordene">
          <h3>Pedidos</h3>
        </div>
        <div className="containercardsORDERdeverdad">
          <CardsOrder />
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
