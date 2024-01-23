import React from "react";
import "./menu.css";
import carrito from "../../img/basket.svg";
import person from "../../img/person-circle (3).svg";
import Filtros from "./filtros/Filtros";
import Card from "./Card/Card";
import Cards from "./Cards/Cards";
const Menu = () => {
  return (
    <>
      <div className="containerNavBarMenu">
        <div className="containerimgMenu">
          <img
            src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1705371620/La%20Tranca/la_tranca_amarillo2_hcvwzp.png"
            alt="nada"
          />
        </div>
        <div className="second">
          <div className="botondomicilio">
            <p>inicio</p>
          </div>
          <div className="carrito">
            <img src={carrito} alt="" />
          </div>
          <div className="personita">
            <img src={person} alt="" />
          </div>
        </div>
      </div>
      <div className="containerMenu"></div>
      <Filtros />
      <div className="containerCards">
        <h2>Cafes Calientes</h2>
        <Cards/>
      </div>
    </>
  );
};

export default Menu;
