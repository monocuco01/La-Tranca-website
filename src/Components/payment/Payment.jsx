import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoginNavBar from "../Login&Register/NavBar/LoginNavBar";
import "./pay.css";
import Address from "./address/Address";
import Summary from "./summary/Summary";
import PaymentM from "./PaymentMethod/PaymentM";
import axios from "axios";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import Animation from "./Animation.json";

const Payment = () => {
  const [isMakingOrder, setIsMakingOrder] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser.id);
  const cartItems = useSelector((state) => state.cart);
  const [cartId, setCartId] = useState(null);
  const [isCartDataSent, setIsCartDataSent] = useState(false);

  const enviarNotificacion = async () => {
    try {
      const response = await axios.post(
        "https://la-tranca-backend.onrender.com/send",
        {
          title: "Nuevo Pedido $",
          body: "Ingresa a pedidos para revisar ",
          token:
            "eKOFsdTUkZ_1ZfwoUlNKpU:APA91bF38o79fkhjEDtR2wm3xvdIy4dyJZUNVLzLnAe6LM5aTsqFbWFpEQrQ7B2H4y0xltwtH6fkItigJSwkJrEoh0JFJ0sarCao12pAbCViiu4LOW5FyeXk4co_7uybcXtyL_yozVEa",
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Notificación enviada con éxito");
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
    instructions: null,
  });

  const updateAddress = (addressData) => {
    setOrderData((prevData) => ({
      ...prevData,
      shippingAddress: addressData.address,
      instructions: addressData.instructions || prevData.instructions,
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
      const response = await fetch(
        "https://la-tranca-backend.onrender.com/carts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const { cartId } = await response.json();
      setCartId(cartId);
      setIsCartDataSent(true);
    } catch (error) {
      console.error("Error al realizar la solicitud POST del carrito:", error);
      throw error;
    }
  };

  const sendOrderData = async () => {
    try {
      setIsMakingOrder(true);
      await sendCartData();

      setOrderData((prevData) => {
        if (
          prevData.totalAmount !== null &&
          prevData.shippingAddress !== null &&
          isCartDataSent
        ) {
          const formattedTotalAmount = prevData.totalAmount.toLocaleString(
            "es-CO",
            {
              style: "currency",
              currency: "COP",
            }
          );

          const totalAmountWithPoint = formattedTotalAmount.replace(",", ".");

          axios
            .post("https://la-tranca-backend.onrender.com/orders", {
              ...prevData,
              totalAmount: totalAmountWithPoint,
            })
            .then((response) => {
              console.log("Respuesta del servidor:", response.data);
              if (response.data.success === true) {
                Swal.fire({
                  title: "Pedido Realizado",
                  text: "¡Tu pedido ha sido realizado con éxito!",
                  icon: "success",
                }).then((result) => {
                  if (result.isConfirmed) {
                    enviarNotificacion();
                  }
                });
              }
            })
            .catch((error) => {
              console.error("Error al realizar el pedido:", error.message);
              Swal.fire({
                title: "Error",
                text: "Hubo un error al realizar el pedido. Por favor, inténtalo de nuevo.",
                icon: "error",
              });
            });
        }
        return prevData;
      });
    } catch (error) {
      console.error("Error al procesar la orden:", error.message);
    } finally {
      setIsMakingOrder(false);
    }
  };

  return (
    <>
      <LoginNavBar />
      <div className="containerallPaymentss">
        <Address onUpdateAddress={updateAddress} />
        <PaymentM />
        <Summary onSubmitOrder={sendOrderData} />
        {isMakingOrder && (
          <div className="making-order-message">
            <Lottie className="lotie" animationData={Animation} />
            <p>Haciendo pedido, por favor espera...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Payment;
