import React from "react";
import "./PaymentMethod.css";
import Nequi from "./nequi-colombia-seeklogo.svg";
import Cash from "./cash-icon.svg";
import Other from "./payment-methods-svgrepo-com.svg";

const PaymentM = () => {
  const nequiLink =
    "https://wa.me/3244707930?text=¡Hola!%20Bienvenido/a%20a%20Tranca%20Café.%20Para%20poder%20procesar%20tu%20pedido,%20¿podrías%20proporcionarme%20la%20siguiente%20información%3F%0A%0ADirección%20de%20entrega%3A%0ANombre%20completo%3A%0AProductos%20que%20deseas%20ordenar%3A%0ANúmero%20de%20teléfono%20de%20contacto%3A%0A%0A¡Gracias%20por%20tu%20ayuda!";
  const cashLink =
    "https://wa.me/3244707930?text=¡Hola!%20Bienvenido/a%20a%20Tranca%20Café.%20Para%20poder%20procesar%20tu%20pedido,%20¿podrías%20proporcionarme%20la%20siguiente%20información%3F%0A%0ADirección%20de%20entrega%3A%0ANombre%20completo%3A%0AProductos%20que%20deseas%20ordenar%3A%0ANúmero%20de%20teléfono%20de%20contacto%3A%0A%0A¡Gracias%20por%20tu%20ayuda!";
  const otherLink =
    "https://wa.me/3244707930?text=¡Hola!%20Bienvenido/a%20a%20Tranca%20Café.%20Para%20poder%20procesar%20tu%20pedido,%20¿podrías%20proporcionarme%20la%20siguiente%20información%3F%0A%0ADirección%20de%20entrega%3A%0ANombre%20completo%3A%0AProductos%20que%20deseas%20ordenar%3A%0ANúmero%20de%20teléfono%20de%20contacto%3A%0A%0A¡Gracias%20por%20tu%20ayuda!";

  return (
    <div className="containerPaymentM">
      <h3>Método de pago</h3>
      <div className="containersLogos">
        {" "}
        <a href={nequiLink} target="_blank" rel="noopener noreferrer">
          <div className="containerNequi">
            <img src={Nequi} alt="" />
            <p>Nequi</p>
          </div>
        </a>
        <a href={cashLink} target="_blank" rel="noopener noreferrer">
          <div className="containerCashLogo">
            <img src={Cash} alt="" />
            <p>Efectivo</p>
          </div>{" "}
        </a>{" "}
        <a href={otherLink} target="_blank" rel="noopener noreferrer">
          <div className="containerCashLogo">
            <img src={Other} alt="" />
            <p>Otros Métodos de pago</p>
          </div>{" "}
        </a>
      </div>
    </div>
  );
};

export default PaymentM;
