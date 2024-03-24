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

  const shippingCost = 2.5;

  const total = productsCost + shippingCost;

  const handlePlaceOrder = () => {
    const orderDetails = {
      productsCost,
      serviceFee,
      shippingCost,
      total,
    };

    onSubmitOrder(orderDetails);

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
