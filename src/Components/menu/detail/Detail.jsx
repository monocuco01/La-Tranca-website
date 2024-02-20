import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../redux/productSlice";
import "./detail.css";
import cape from "../../../img/cape.jpg";
import NavBar from "../NavBar/NavBar";
import { addToCart } from "../../redux/cardSlice";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Detail = ({ quantity }) => {
  const { selectedProduct } = useSelector((state) => state.products);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(quantity || 1);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  // Estado para manejar la visibilidad del modal y overlay
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    // Pide el producto por ID después de 1 segundo
    const timeoutId = setTimeout(() => {
      dispatch(getProductById(productId))
        .then((action) => {
          console.log("Action from getProductById:", action);
        })
        .catch((error) => {
          console.error("Error from getProductById:", error);
        })
        .finally(() => {
          setLoading(false);
          // Activa el modal después de otro segundo
          setTimeout(() => {
            setModalActive(true);
          }, 100);
        });
    });

    // Limpia el timeout cuando el componente se desmonta o cuando la petición se completa
    return () => clearTimeout(timeoutId);
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    const cartItem = {
      product: selectedProduct,
      quantity: counter,
    };

    dispatch(addToCart(cartItem));

    console.log("Producto agregado al carrito:", cartItem);

    if (isAuthenticated) {
      Toastify({
        text: "Producto agregado al carrito",
        duration: 1200,
        destination: "/",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          margin: "10px",
        },
      }).showToast();

      navigate("/menu");
    } else {
      navigate("/login");
    }
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
    return <p>Product not found.</p>;
  }

  return (
    <>
      {/* Agrega un overlay detrás del modal */}
      <div
        className={`overlay ${modalActive ? "active" : ""}`}
        onClick={() => navigate("/menu")}
      />

      {/* Agrega la clase "active" al modal cuando modalActive es true */}
      <div className={`modalElements ${modalActive ? "active" : ""}`}>
        <div className="containersallmodalelements">
          {" "}
          <Link className="oyecachon" to="/menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </Link>
          <div className="imgContainerARRO">
            <img
              src={selectedProduct.photoUrl}
              alt={selectedProduct.name}
              className="imgDetail"
            />
          </div>
          <div className="textContainer">
            <div className="containerx">
              <h2 className="name">{selectedProduct.name}</h2>
              <Link className="oyemelil" to="/menu">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-x-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </Link>
            </div>{" "}
            <p className="price"> $ {selectedProduct.price}</p>
            <p className="description">{selectedProduct.description}</p>
          </div>
        </div>{" "}
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
    </>
  );
};

export default Detail;
