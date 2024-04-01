import React from "react";
import "./PaymentMethod.css";
import Nequi from "./nequi-colombia-seeklogo.svg";
import Cash from "./cash-icon.svg";
import Other from "./payment-methods-svgrepo-com.svg";

const PaymentM = () => {
  const nequiLink =
    "https://wa.me/3244707930?text=¡Hola!%20Quisiera%20realizar%20un%20pedido.";
  const cashLink =
    "https://wa.me/3244707930?text=¡Hola!%20Quisiera%20realizar%20un%20pedido.";
  const otherLink =
    "https://wa.me/3244707930?text=¡Hola!%20Quisiera%20realizar%20un%20pedido.";

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
