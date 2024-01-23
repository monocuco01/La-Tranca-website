import React, { useState } from "react";
import "./home.css";
import Letter from "./Letter/Letter";
import About from "./About/About";
import Collage from "./Collage/Collage";
import Delivery from "./delivery/Delivery";
import Footer from "./footer/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    console.log("Toggle Menu");
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div className="containerNavBar">
        <div className="containerLogo">
          <img
            src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1705371620/La%20Tranca/la_tranca_amarillo2_hcvwzp.png"
            alt="nada"
          />
        </div>

        <div className="Words">
          <h3>Inicio</h3>
          <h3>Sobre nosotros</h3>
          <h3>Menú</h3>
          <h3>Información</h3>
          <Link to="/menu">
            <div className="botondomicilio">
              <p>Domicilio</p>
            </div>
          </Link>
        </div>
    
        <div className="botonmenu">
          <button className="menuButton" onClick={toggleMenu}>
            ☰ Menú
          </button>
        </div>
      </div>
      <Letter />
      <About />
      <Collage />
      <Delivery />
      <Footer />
    </div>
  );
};

export default Home;
