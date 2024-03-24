import React from "react";
import "./delivery.css";
import { Link } from "react-router-dom";
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
          <Link
            to="https://wa.me/3244707930?text=¡Hola!%20Bienvenido/a%20a%20Tranca%20Café.%20Para%20poder%20procesar%20tu%20pedido,%20¿podrías%20proporcionarme%20la%20siguiente%20información%3F%0A%0ADirección%20de%20entrega%3A%0ANombre%20completo%3A%0AProductos%20que%20deseas%20ordenar%3A%0ANúmero%20de%20teléfono%20de%20contacto%3A%0A%0A¡Gracias%20por%20tu%20ayuda!
            "
            target="_blank"
          >
            <button>solicitar ahora</button>
          </Link>
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
