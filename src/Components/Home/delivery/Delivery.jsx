import React from "react";
import "./delivery.css";
const Delivery = () => {
  return (
    <div className="containerDeliveryPart">
      <div className="containerpanelD">
        <div className="containerlettras">
          <div className="elpropioh3">
            <h3>¿Te encuentras lejos?</h3>
            <h3>¿No Tienes Tiempo?</h3>
          </div>

          <h1>Tenemos domicilios</h1>
          <p>Con nuestro servicio disfruta del mejor cafe en minutos </p>
          <button>solicitar ahora</button>
        </div>
        <div className="photocontainer">
          <img
            src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1705436077/La%20Tranca/244023275_2671121533190663_1590550133037041859_n_phtfks.jpg"
            alt="risas"
          />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
