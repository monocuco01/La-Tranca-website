import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../redux/productSlice";
import "./detail.css";
import cape from "../../../img/cape.jpg";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cardSlice";

const Detail = ({ quantity }) => {
  const { selectedProduct } = useSelector((state) => state.products);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(quantity || 1); // Inicia el contador en 1 si quantity es undefined

  useEffect(() => {
    dispatch(getProductById(productId))
      .then((action) => {
        console.log("Action from getProductById:", action);
      })
      .catch((error) => {
        console.error("Error from getProductById:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    // Crea un objeto que representa el producto y la cantidad
    const cartItem = {
      product: selectedProduct,
      quantity: counter,
    };

    // Despacha la acción para agregar al carrito
    dispatch(addToCart(cartItem)); // No es necesario actions.addToCart

    // Console.log para imprimir la información del carrito
    console.log("Producto agregado al carrito:", cartItem);

    // Puedes hacer otras cosas aquí, como redireccionar a la página de productos, etc.
  };

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!selectedProduct) {
    return <p>Product not found.</p>; // Puedes redirigir a una página de error aquí si lo prefieres.
  }

  return (
    <div className="container">
      <NavBar />
      <div className="modalElements">
        <div className="imgContainerARRO">
          <img
            src={selectedProduct.photoUrl}
            // src={cape}
            alt={selectedProduct.name}
            className="imgDetail"
          />
        </div>
        <div className="textContainer">
          <div className="containerx">
            <h2 className="name">{selectedProduct.name}</h2>
            <Link to="/menu">
              <h3>x</h3>
            </Link>
          </div>
          <p className="price"> $ {selectedProduct.price}</p>
          <p className="description">{selectedProduct.description}</p>
          <div className="botonesaquellos">
            <div className="counter">
              <button onClick={handleDecrement}>-</button>
              <span>{counter}</span>
              <button onClick={handleIncrement}>+</button>
            </div>{" "}
            <button className="palcarro" onClick={handleAddToCart}>
              Agregar y seguir comprando
            </button>
            <button className="comprar">
              Agregar y pagar ${selectedProduct.price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
