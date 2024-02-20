import React from "react";
import "./footer.css";
import facebook from "../../../img/facebook (1).svg";
import instagram from "../../../img/instagram (1).svg";
const Footer = () => {
  return (
    <div className="containerPfooter">
      <div className="footerparser">
        <img
          src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1705708482/La%20Tranca/la_tranca_marron2_wispwh.png"
          alt=""
          srcset=""
        />
        <div className="hidee">
          <p>
            Probar una taza de Café orgánico es viajar a la sierra con todos tus
            sentidos, consumes toda la bondad de los más finos granos de café,
            con el mejor aroma, sabor y calidad.
          </p>
        </div>
      </div>
      <div className="social">
        <h3>Siguenos en </h3>
        <img logito src={facebook} alt="" />
        <img className="logito" src={instagram} alt="" srcset="" />
      </div>
      <div className="contact">
        <h3>contactanos</h3>
      </div>
      
    </div>
  );
};

export default Footer;
