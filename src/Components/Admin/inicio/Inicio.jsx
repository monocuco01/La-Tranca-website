import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../sideBar/SideBar";
import "./inicio.css";


const Inicio = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [ACount, setACount] = useState(0);
  const [latestOrders, setLatestOrders] = useState([]);

  useEffect(() => {
    const fetchAcount = async () => {
      try {
        const respuesta = await axios.get("http://localhost:3001/users");
        setACount(respuesta.data.data.length);
      } catch (error) {
        console.error(
          "Error al obtener la cantidad de cuentas:",
          error.message
        );
      }
    };

    const fetchOrderCount = async () => {
      try {
        const response = await axios.get("http://localhost:3001/orders");
        setOrderCount(response.data.orders.length);
        const latestOrders = response.data.orders.slice(0, 4); // Cambié a 4
        setLatestOrders(latestOrders);
      } catch (error) {
        console.error(
          "Error al obtener la cantidad de órdenes:",
          error.message
        );
      }
    };

    fetchOrderCount();
    fetchAcount();
  }, []);

  return (
    <div className="containerallinicio">
      <SideBar />
      <div className="containerInicioAdmim">
   

        <div className="lape">
          <p>Inicio</p>
        </div>
        <div className="containeraccount">
          <div className="cuentascreadas">
            <p>Cantidad de cuentas creadas: {ACount}</p>
          </div>
          <div className="personitatotal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
          </div>
        </div>
        <div className="containerusers">
          <div className="ordenescreadas">
            <p>Cantidad de órdenes creadas: {orderCount}</p>
          </div>
          <div className="carritodemina">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              class="bi bi-minecart-loaded"
              viewBox="0 0 16 16"
            >
              <path d="M4 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2m0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4m8-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2m0 1a2 2 0 1 0 0-4 2 2 0 0 0 0 4M.115 3.18A.5.5 0 0 1 .5 3h15a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 14 12H2a.5.5 0 0 1-.491-.408l-1.5-8a.5.5 0 0 1 .106-.411zm.987.82 1.313 7h11.17l1.313-7z" />
              <path
                fill-rule="evenodd"
                d="M6 1a2.498 2.498 0 0 1 4 0c.818 0 1.545.394 2 1 .67 0 1.552.57 2 1h-2c-.314 0-.611-.15-.8-.4-.274-.365-.71-.6-1.2-.6-.314 0-.611-.15-.8-.4a1.497 1.497 0 0 0-2.4 0c-.189.25-.486.4-.8.4-.507 0-.955.251-1.228.638q-.136.194-.308.362H3c.13-.147.401-.432.562-.545a1.6 1.6 0 0 0 .393-.393A2.5 2.5 0 0 1 6 1"
              />
            </svg>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID de Orden</th>
              <th>Total</th>
              <th>Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.totalAmount}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inicio;
