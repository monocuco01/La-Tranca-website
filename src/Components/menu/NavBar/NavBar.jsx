import React, { useState, useEffect } from "react";
import carrito from "../../../img/basket.svg";
import person from "../../../img/person-circle (3).svg";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import "./NavBar.css"; // Asegúrate de importar tus estilos CSS
import { logout, selectIsAuthenticated } from "../../redux/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/userSlice"; // Importa la acción clearUser
import { clearCart } from "../../redux/cardSlice";
const NavBar = () => {
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [isAccountModalOpen, setAccountModalOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const toggleCartModal = () => {
    setCartModalOpen(!isCartModalOpen);
    setAccountModalOpen(false);
  };

  const toggleAccountModal = () => {
    setAccountModalOpen(!isAccountModalOpen);
    setCartModalOpen(false);
  };
  const arrocitocerrao = () => {
    setCartModalOpen(false);
    console.log("ajajuanc");
  };
  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(logout());
    dispatch(clearCart());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(clearCart());
    }

    // Funciones para manejar el scroll y el click fuera del modal
    const handleScroll = () => {
      if (isCartModalOpen || isAccountModalOpen) {
        setCartModalOpen(false);
        setAccountModalOpen(false);
      }
    };

    const handleOutsideClick = (event) => {
      const cartModal = document.querySelector(".containerCartALL");
      const accountModal = document.querySelector(".accountButtons");

      if (
        cartModal &&
        accountModal &&
        !cartModal.contains(event.target) &&
        !accountModal.contains(event.target)
      ) {
        setCartModalOpen(false);
        setAccountModalOpen(false);
      }
    };

    // Agregar event listeners al montar el componente
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleOutsideClick);

    // Limpiar event listeners al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isCartModalOpen, isAccountModalOpen, isAuthenticated, dispatch]);
  return (
    <>
      <div className="containerNavBarMenu">
        <div className="containerimgMenu">
          <img
            src="https://res.cloudinary.com/dziwyqnqk/image/upload/v1705371620/La%20Tranca/la_tranca_amarillo2_hcvwzp.png"
            alt="nada"
          />
        </div>
        <div className="second">
          <Link to="/">
            <div className="botondomicilios">
              <p>inicio</p>
            </div>
          </Link>
          <div className="carrito" onClick={toggleCartModal}>
            <img src={carrito} alt="" />
          </div>
          <div className="personita" onClick={toggleAccountModal}>
            <img src={person} alt="" />
          </div>
          {isAuthenticated && isAccountModalOpen && (
            <div className="accountButtons">
              <button className="a">
                <Link to="/account">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                  </svg>
                  Mi cuenta
                </Link>
              </button>

              {/* Enlace a /orders */}

              <button className="b">
                <Link to="/orders">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-bag"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                  </svg>
                  Mis pedidos{" "}
                </Link>
              </button>

              <button className="c" onClick={handleLogout}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-left-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                  />
                </svg>
                Cerrar sesión
              </button>
            </div>
          )}{" "}
          {!isAuthenticated && isAccountModalOpen && (
            <div className="accountButtons">
              {/* Agrega aquí el botón para iniciar sesión */}
              <button className="login-button">
                <Link to="/login">Iniciar sesión</Link>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Fondo semi-transparente */}
      {isCartModalOpen && (
        <div className="containerCartOverlay" onClick={arrocitocerrao} />
      )}

      <div className={`containerCartALL ${isCartModalOpen ? "open" : ""}`}>
        <Cart />
      </div>
    </>
  );
};

export default NavBar;
