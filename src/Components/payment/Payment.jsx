import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoginNavBar from "../Login&Register/NavBar/LoginNavBar";
import "./pay.css";
import Address from "./address/Address";
import Summary from "./summary/Summary";
import PaymentM from "./PaymentMethod/PaymentM";
import axios from "axios";
import Swal from "sweetalert2";

const Payment = () => {
  const currentUser = useSelector((state) => state.user.currentUser.id);
  const cartItems = useSelector((state) => state.cart);
  const [cartId, setCartId] = useState(null);
  const [isCartDataSent, setIsCartDataSent] = useState(false);
  const tokenajas = useSelector((state) => state.order.tokenaja);

  const enviarNotificacion = async () => {
    try {
      const response = await axios.post("http://localhost:3001/send", {
        title: "Título de la notificación",
        body: "Cuerpo de la notificación",
        token: tokenajas,
      });
      console.log(response);
      if (response.status === 200) {
        console.log("Notificación enviada con éxito");
        // Puedes manejar la respuesta exitosa aquí si es necesario
      }
    } catch (error) {
      console.error("Error al enviar la notificación:", error);
    }
  };
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

      const { cartId } = await response.json();

      setCartId(cartId);
      setIsCartDataSent(true);
    } catch (error) {
      console.error("Error al realizar la solicitud POST del carrito:", error);
      throw error; // Relanzar el error para que sea manejado por la función llamante
    }
  };

  const sendOrderData = async () => {
    try {
      // Esperar a que sendCartData termine antes de continuar
      await sendCartData();

      if (
        orderData.totalAmount !== null &&
        orderData.shippingAddress !== null &&
        isCartDataSent
      ) {
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

        // Agregar lógica específica para el log y el SweetAlert
        if (response.data.success == true) {
          Swal.fire({
            title: "Pedido Realizado",
            text: "¡Tu pedido ha sido realizado con éxito!",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              enviarNotificacion();
            }
          });
        } else {
          console.error("Error al realizar el pedido");
          // Muestra un mensaje de error al usuario
          Swal.fire({
            title: "Error",
            text: "Hubo un error al realizar el pedido. Por favor, inténtalo de nuevo.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error al crear la orden:", error.message);
      // Tratar el error según sea necesario
    }
  };

  const onSubmitOrder = async () => {
    try {
      // Realizar las operaciones en orden utilizando async/await
      await sendOrderData();
    } catch (error) {
      console.error("Error al procesar la orden:", error.message);
      // Tratar el error según sea necesario
    }
  };

  return (
    <>
      <LoginNavBar />
      <div className="containerallPaymentss">
        <Address onUpdateAddress={updateAddress} />
        <PaymentM />
        <Summary onSubmitOrder={onSubmitOrder} />
      </div>
    </>
  );
};

export default Payment;
