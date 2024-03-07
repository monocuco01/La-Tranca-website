import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderEdit = ({ isOpen, onClose }) => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const urlParts = window.location.href.split("/");
        const extractedOrderId = urlParts[urlParts.length - 1];

        const response = await axios.get(
          `https://la-tranca-backend.onrender.com/orders/admin/${extractedOrderId}`
        );

        if (response.data.order) {
          const orderDetails = response.data.order;
          setOrderData(orderDetails);
        } else {
          console.error("No se encontraron detalles del pedido");
        }
      } catch (error) {
        console.error(
          "Error al obtener los detalles del pedido:",
          error.message
        );
      }
    };

    fetchOrderData();
  }, []);

  return (
    <div className={`orderContainer ${isOpen ? "open" : "closed"}`}>
      {orderData && (
        <>
          <div className="containerarribita">
            <h4 className="orderDetail">{orderData.orderDate}</h4>
            <p className="orderDetail">
              Order dirección: {orderData.shippingAddress}
            </p>
          </div>
          <h4 className="orderDetail">Total Total: {orderData.totalAmount}</h4>
          <h5 className="orderDetail">Status: {orderData.status}</h5>

          <div className="productContainer">
            {orderData.Cart &&
              orderData.Cart.Products &&
              orderData.Cart.Products.length > 0 && (
                <>
                  <h2>Productos en el pedido</h2>
                  {orderData.Cart.Products.map((product) => (
                    <div key={product.id} className="productDetail">
                      <p>{product.name}</p>
                      <p>Precio: {product.price}</p>
                    </div>
                  ))}
                </>
              )}
          </div>
        </>
      )}
      <button onClick={onClose} className="closeButton">
        Cerrar
      </button>
    </div>
  );
};

export default OrderEdit;
