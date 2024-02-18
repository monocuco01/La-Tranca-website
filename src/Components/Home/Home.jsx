import React, { useState, useRef } from "react";
import "./home.css";
import Letter from "./Letter/Letter";
import About from "./About/About";
import Collage from "./Collage/Collage";
import Delivery from "./delivery/Delivery";
import Footer from "./footer/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [showMenu, setShowMenu] = useState(true);
  const aboutRef = useRef(null);
  const Domiref = useRef(null);
  const toggleMenu = () => {
    console.log("Toggle Menu");
    setShowMenu(!showMenu);
  };
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const domiscroll = () => {
    Domiref.current.scrollIntoView({ behavior: "smooth" });
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
          <h3 onClick={scrollToAbout}>Sobre nosotros</h3>
          <Link to="menu">
            <h3>Menú</h3>
          </Link>

          <div onClick={domiscroll} className="botondomicilio">
            <p>Domicilio</p>
          </div>
        </div>

        <div className="botonmenu">
          <button className="menuButton" onClick={toggleMenu}>
            ☰ Menú
          </button>
        </div>
      </div>
      <Letter />
      <div ref={aboutRef}>
        <About />
      </div>
      <Collage />
      <div ref={Domiref}>
        <Delivery />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
