import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../sideBar/SideBar";
import "./inicio.css";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "../../../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inicio = () => {
  const loguearse = async () => {
    try {
      const usuario = await signInAnonymously(getAuth());
      console.log(usuario);
    } catch (error) {}
  };

  const activarMensajes = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BAa8Ixi3hEKHLv_HwjrWr70FuRokWI1xknTsFNq6pg9fGgH_YUy8NHIjebY4nAXsFAZG03xpPOt2lgZbEmziamU",
      });

      if (token) {
        console.log("Tu token:", token);
      } else {
        console.log("No tienes token, rey");
      }
    } catch (error) {
      console.error("Error al obtener el token:", error);
    }
  };

  useEffect(() => {
    const handleNotification = (message) => {
      console.log("Tu mensaje:", message);
      toast(message.notification.title);
    };

    const unsubscribe = onMessage(messaging, handleNotification);

    return () => {
      // Limpiar el suscriptor cuando el componente se desmonte
      unsubscribe();
    };
  }, []);

  const [orderCount, setOrderCount] = useState(0);
  const [ACount, setACount] = useState(0);
  const [latestOrders, setLatestOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseAcount, responseOrders] = await Promise.all([
          axios.get("http://localhost:3001/users"),
          axios.get("http://localhost:3001/orders"),
        ]);

        setACount(responseAcount.data.data.length);
        setOrderCount(responseOrders.data.orders.length);

        const latestOrders = responseOrders.data.orders.slice(0, 4);
        setLatestOrders(latestOrders);
      } catch (error) {
        console.error("Error al obtener datos:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Wenas</h1>

      <ToastContainer />
      <button onClick={loguearse}>Loguearse</button>
      <button onClick={activarMensajes}>Recibir noti</button>
    </div>
  );
};

export default Inicio;
