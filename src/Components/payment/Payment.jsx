import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoginNavBar from "../Login&Register/NavBar/LoginNavBar";
import "./pay.css";
import Address from "./address/Address";
import Summary from "./summary/Summary";
import PaymentM from "./PaymentMethod/PaymentM";
import axios from "axios";

const Payment = () => {
  const currentUser = useSelector((state) => state.user.currentUser.id);
  const cartItems = useSelector((state) => state.cart);
  const [cartId, setCartId] = useState(null);
  const [isCartDataSent, setIsCartDataSent] = useState(false);

  const [orderData, setOrderData] = useState({
    totalAmount: null,
    shippingAddress: null,
    userId: currentUser,
    cartId: cartId,
  });

  const updateAddress = (addressData) => {
    setOrderData((prevData) => ({
      ...prevData,
      shippingAddress: addressData.address,
    }));
  };

  const calculateTotalAmount = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + parseFloat(item.product.price) * item.quantity,
      0
    );

    return subtotal;
  };

  useEffect(() => {
    const newTotalAmount = calculateTotalAmount();
    setOrderData((prevData) => ({
      ...prevData,
      totalAmount: newTotalAmount,
      cartId: cartId,
    }));
  }, [cartId, cartItems]);

  const sendCartData = async () => {
    try {
      const total = orderData.totalAmount.toFixed(2);
      const productIds = cartItems.map((item) => item.product.id);
      const requestData = {
        productIds: productIds,
        quantities: cartItems.map((item) => item.quantity),
      };
      const response = await fetch("http://localhost:3001/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(requestData),
      });
      console.log(requestData);
      const { cartId } = await response.json();

      setCartId(cartId);
      setIsCartDataSent(true);
    } catch (error) {
      console.error("Error al realizar la solicitud POST del carrito:", error);
    }
  };

  const sendOrderData = async () => {
    if (
      orderData.totalAmount !== null &&
      orderData.shippingAddress !== null &&
      isCartDataSent
    ) {
      try {
        const formattedTotalAmount = orderData.totalAmount.toLocaleString(
          "es-CO",
          {
            style: "currency",
            currency: "COP",
          }
        );

        const totalAmountWithPoint = formattedTotalAmount.replace(",", ".");

        const response = await axios.post("http://localhost:3001/orders", {
          ...orderData,
          totalAmount: totalAmountWithPoint,
        });

        console.log("Respuesta del servidor:", response.data);
      } catch (error) {
        console.error("Error al crear la orden:", error.message);
      }
    }
  };

  return (
    <>
      <LoginNavBar />
      <div className="containerallPaymentss">
        <Address onUpdateAddress={updateAddress} />
        <PaymentM />
        <Summary
          onSubmitOrder={() => {
            sendCartData();
            sendOrderData();
          }}
        />
      </div>
    </>
  );
};

export default Payment;
