import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../sideBar/SideBar";
import "./pedidos.css";
import CardsOrder from "../Pedidos/CardsOrder";
import { getAuth, signInAnonymously } from "firebase/auth";

import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tokenSet } from "../../redux/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const Pedidos = () => {
  useEffect(() => {
    const loguearseYActivarMensajes = async () => {
      try {
        // Intenta autenticar al usuario de manera anónima
        await signInAnonymously(getAuth());

        console.log("Usuario autenticado exitosamente.");

        // Una vez autenticado, intenta activar los mensajes
        try {
          const token = await getToken(messaging, {
            vapidKey:
              "BO_bBRKa_IufEqaZPNpiGFRomLPYXSLTe24zFhnv41-seWzbrGMEAD-3rwsf_JvaObBmuiUN8IZz6i6jmZCRuLU",
          });

          if (token) {
            console.log("Tu token:", token);
          } else {
            console.log("No tienes token, rey.");
          }
        } catch (error) {}
      } catch (error) {
        console.error("Error al autenticar al usuario:", error);
      }
    };

    const handleNotification = (message) => {
      console.log("Tu mensaje:", message);
      toast(message.notification.title);
    };

    // Escuchar mensajes cuando la app está en primer plano
    const unsubscribe = onMessage(messaging, handleNotification);

    loguearseYActivarMensajes();

    return () => {
      // Limpiar el suscriptor cuando el componente se desmonte
      unsubscribe();
    };
  }, []);

  return (
    <div className="containerAllPedidos">
      <SideBar />
      <div className="containercardsOrder">
        {" "}
        <ToastContainer />
        <div className="containerordene">
          <h3>Pedidos</h3>
        </div>
        <div className="containercardsORDERdeverdad">
          <CardsOrder />
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
