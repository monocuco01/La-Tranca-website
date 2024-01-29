import React from "react";
import Coffe from "../../../img/undraw_coffee_with_friends_3cbj.svg";

import "./about.css";
const About = () => {
  return (
    <div className="containerAbout">
      <div className="svgAndContainer">
        <div className="containerSVG20">
          <img src={Coffe} alt="" srcset="" />
        </div>
       
        <div className="containerLetterAbout">
          <h1>La Tranca</h1>
          <p>
            La Tranca café, es una Sociedad de Acciones Simplificadas S.A.S.
            creada en el año 2020, con el objeto de vender en tienda café 100%
            orgánico, ofreciendo como complemento crear una ruta turista
            alrededor del café
          </p>
          <p>
            Nos enfocamos en café 100% orgánico que se produce en el municipio
            de Ciénaga Magdalena. Implicando no solo que seremos los únicos,
            sino que contamos con una cadena de agricultores (emprendedores) que
            producen el café para nuestra tienda.
          </p>
        </div>
      </div>
      <div className="elcoffe">
        <div className="coffeimg">
          <img
            src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1705391196/La%20Tranca/375508064_266374823009439_2418664737622461337_n_q5knhu.jpg"
            alt="nada"
            srcset=""
          />
        </div>
        <div className="lettercoffe">
          <p>
            Ciénaga, Magdalena Colombia considerado como el sexto municipio más
            grande en extensión cafetera de Colombia con 10.599 Has que equivale
            al 58 % del área cafetera del Magdalena. La producción promedio es
            de 168.904 sacos de 60 kilos de café pergamino seco, generando
            alrededor de unos 1.209.520 jornales directos e indirectos al año
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
