import React from "react";
import "./menu.css";
import Filtros from "./filtros/Filtros";
import Cards from "./Cards/Cards";
import NavBar from "./NavBar/NavBar";

const Menu = () => {
  return (
    <>
      <NavBar />
      <Filtros />
      <div className="containerCards">
        <Cards />
      </div>
    </>
  );
};

export default Menu;
