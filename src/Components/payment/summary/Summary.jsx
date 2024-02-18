import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPaid } from "../../redux/orderSlice";
import "./summary.css";

const Summary = ({ onSubmitOrder }) => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Calcular el costo de productos
  const productsCost = cartItems.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  // Tarifa de servicio (puedes ajustar este valor según tus necesidades)
  const serviceFee = 5;

  // Costo del envío (puedes ajustar este valor según tus necesidades)
  const shippingCost = 10;

  // Calcular el total sumando los costos
  const total = productsCost + serviceFee + shippingCost;

  const handlePlaceOrder = () => {
    // Aquí puedes realizar acciones relacionadas con el pedido
    // Por ejemplo, enviar los detalles de la orden al servidor
    const orderDetails = {
      productsCost,
      serviceFee,
      shippingCost,
      total,
    };

    // Llamar a la función onSubmitOrder para enviar los detalles de la orden
    onSubmitOrder(orderDetails);

    // Marcar el pedido como completado en el estado de Redux
    dispatch(setPaid(true));
  };

  return (
    <div className="containerSummaryPrincipal">
      <div className="containerdetoditocosto">
        <div className="resumen">
          <h3>Resumen</h3>
        </div>
        <div className="containercostos">
          <div className="brrrr">
            <p>Costo de productos:</p> <p>${productsCost.toFixed(3)}</p>
          </div>
          <div className="brrrr">
            <p>Tarifa de servicio:</p> <p>${serviceFee.toFixed(3)}</p>{" "}
          </div>
          <div className="brrrr">
            <p>Costo del envío: </p> <p>${shippingCost.toFixed(3)}</p>
          </div>
          <div className="brrrr">
            <h3>Total: </h3>
            <h3>${total.toFixed(3)}</h3>
          </div>
        </div>
        <div className="botoncontainercosto">
          <button onClick={handlePlaceOrder}>Realizar Pedido</button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
