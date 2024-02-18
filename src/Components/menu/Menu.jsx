import React from "react";
import "./menu.css";
import Filtros from "./filtros/Filtros";
import Cards from "./Cards/Cards";
import NavBar from "./NavBar/NavBar";

const Menu = () => {
  return (
    <>
      <div className="ajapollo">
        <NavBar />
        <Filtros />
      </div>
      <div className="containerCards">
        <Cards />
      </div>
    </>
  );
};

export default Menu;
