import React from "react";
import LoginNavBar from "../Login&Register/NavBar/LoginNavBar";
import "./pay.css"
const Payment = () => {
  return (
    <div className="containerallPaymentss">
      <LoginNavBar />
      <div className="containerallPayment">
        <div className="containerDireccion">
          <h3>Dirrecion de entrega</h3>
        </div>
      </div>
    </div>
  );
};

export default Payment;
