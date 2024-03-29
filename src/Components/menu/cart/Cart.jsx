import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/cardSlice";
import { setPaid } from "../../redux/orderSlice"; // Importa la acción setPaid
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Asegúrate de tener useNavigate

  const handleIncrement = (productId) => {
    dispatch(updateQuantity({ productId, newQuantity: 1 }));
  };

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ productId, newQuantity: -1 }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handlePayment = async () => {
    setLoading(true);

    navigate("/payment");

    setLoading(false);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + parseFloat(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="">
      {cartItems && cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.product.id}>
                <img src={item.product.photoUrl} alt={item.product.name} />
                <div className="containerCart">
                  <h3>{item.product.name}</h3>
                  <div className="mueta">
                    <p>
                      $
                      {(
                        parseFloat(item.product.price) * item.quantity
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3,
                      })}
                    </p>
                    <div className="botoncitossumapave">
                      <button
                        onClick={() =>
                          handleDecrement(item.product.id, item.quantity)
                        }
                      >
                        -
                      </button>
                      <p> {item.quantity}</p>
                      <button onClick={() => handleIncrement(item.product.id)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="subtotal-container">
            <button onClick={handleClearCart} className="trash-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </button>{" "}
            <button onClick={handlePayment} className="botonpaylink">
              <Link to="" className="pay-link">
                {" "}
                Ir a Pagar: $
                {subtotal.toLocaleString("en-US", {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                })}
              </Link>
            </button>
          </div>
        </>
      ) : (
        <p>El carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
