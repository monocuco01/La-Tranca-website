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
            to="https://wa.me/3104353091?text=¡Hola!%20Quisiera%20realizar%20un%20pedido."
            target="_blank"
          >
            <button>solicitar ahora</button>
          </Link>
        </div>
        <div className="photocontainer">
          <img
            src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1712008451/La%20Tranca/El_2023_fu%C3%A9_un_a%C3%B1o_de_muchos_retos_cambios_y_sorpresas_en_el_cual_nos_reinventamos_varias_veces_a_petici%C3%B3n_de_un_mundo_cambiante_pero_sobre_todo_una_tranca_que_busca_siempre_mejorar_desde_el_amor_po_yyojmn.jpg"
            alt="risas"
          />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
