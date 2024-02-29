import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserNavBar from "../NavbarUSER/UserNavBar";
import "./mispedidos.css";
const MiPedidos = () => {
  const [cartData, setCartData] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users/cart");

        if (response.data.success && response.data.data.length > 0) {
          const userCarts = response.data.data;
          setCartData(userCarts);

          console.log(userCarts);
        } else {
          console.error("No se encontraron carritos de usuarios");
        }
      } catch (error) {
        console.error(
          "Error al obtener los carritos de usuarios:",
          error.message
        );
      }
    };
    fetchCartData();
  }, []);
  const handleDeleteOrder = async (orderId) => {
    try {
      // Envía una solicitud para eliminar la orden con el orderId
      await axios.delete(`http://localhost:3001/orders/${orderId}`);
      // Actualiza la interfaz después de eliminar la orden
      setCartData((prevCartData) => {
        const updatedCartData = [...prevCartData];
        // Encuentra la orden en el carrito y elimínala
        const cartIndex = updatedCartData.findIndex(
          (cart) => cart.id === expandedOrderId
        );
        if (cartIndex !== -1) {
          updatedCartData[cartIndex].Orders = updatedCartData[
            cartIndex
          ].Orders.filter((order) => order.id !== orderId);
        }
        return updatedCartData;
      });
    } catch (error) {
      console.error("Error al eliminar la orden:", error.message);
    }
  };
  const handleOrderClick = async (cartId) => {
    setExpandedOrderId((prevId) => (prevId === cartId ? null : cartId));

    // Utiliza el ID del carrito para obtener detalles específicos del carrito
    try {
      const response = await axios.get(`http://localhost:3001/carts/${cartId}`);
      setCarrito(response.data.products);
    } catch (error) {
      console.error("Error al obtener detalles del carrito:", error.message);
    }
  };
  const formatCurrency = (amount) => {
    // Elimina cualquier símbolo no numérico y convierte la cadena a un número
    const numericAmount = parseFloat(amount.replace(/[^\d.-]/g, ""));

    // Verifica si el valor numérico es válido antes de formatearlo
    if (!isNaN(numericAmount)) {
      // Multiplica por 10 para mover la coma decimal a la izquierda
      const adjustedAmount = numericAmount * 10;

      // Formatea el valor con separador de miles y una posición decimal
      return adjustedAmount.toLocaleString("es-CO", {
        minimumFractionDigits: 0,
      });
    } else {
      return "Cantidad no válida";
    }
  };
  return (
    <div className="containerallcositas">
      <UserNavBar />
      <div className="containerMains">
        {cartData.map((cart) => (
          <div key={cart.id} className="cartContainer">
            {cart.Orders.sort(
              (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
            ).map((order) => (
              <div key={order.id} className="orderContainer">
                <div
                  className={`clickableOrder ${
                    expandedOrderId === cart.id ? "expanded" : ""
                  }`}
                  onClick={() => handleOrderClick(order.Cart.id)}
                >
                  <div className="containerarribita">
                    <h5 className="orderDetail">
                      {new Date(order.createdAt).toLocaleString()}
                    </h5>

                    <h5 className="orderDetail">Status: {order.status}</h5>
                  </div>
                  <h4 className="orderDetail">
                    Total Total: {formatCurrency(order.totalAmount)}
                  </h4>
                  <p>direccion: {order.shippingAddress}</p>
                  <br />
                  <p>instrucciones de envio: {order.instructions}</p>
                </div>

                {expandedOrderId === order.Cart.id && (
                  <div className="expandedOrderDetails">
                    <div className="pillemos">
                      <p></p>
                    </div>

                    {carrito.length > 0 && (
                      <div className="productosaquellos">
                        <h4>Productos a enviar:</h4>

                        {carrito.map((product) => (
                          <div
                            className="productosmapeadosaja"
                            key={product.id}
                          >
                            <p> {product.name}</p>
                            <h6>Cantidad: {product.quantity}</h6>
                          </div>
                        ))}
                        <div className="ajajuanasitequeriaencontrar"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiPedidos;
