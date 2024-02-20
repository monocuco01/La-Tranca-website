import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "./Components/menu/Menu";
import Detail from "./Components/menu/detail/Detail";
import Login from "./Components/Login&Register/Login/Login";
import Register from "./Components/Login&Register/Register/Register";
import Admin from "./Components/Admin/Admin";
import Inicio from "./Components/Admin/inicio/Inicio";
import Home from "./Components/Home/Home";
import Account from "./Components/account/Account";
import Payment from "./Components/payment/Payment";
import Whatsapp from "./Components/Whatsapp/Whatsapp";
import "./App.css";
import Pedidos from "./Components/Admin/Pedidos/Pedidos";
import Productos from "./Components/Admin/Productos/Productos";
import Users from "./Components/Admin/Users/Users";
import OrderEdit from "./Components/Admin/Pedidos/orderEdit";
import ProductEdit from "./Components/Admin/Productos/ProductEdit";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const ProtectedRoute = ({ element, path }) => {
    // Verifica si está autenticado antes de renderizar el elemento
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const ProtectedAdminRoute = ({ element, path }) => {
    // Verifica si está autenticado y no es un administrador antes de renderizar el elemento
    const isAdmin = useSelector((state) => state.user.currentUser?.isAdmin);
    return isAuthenticated && !isAdmin ? element : <Navigate to="/login" />;
  };

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Whatsapp />
              <Home />
            </>
          }
        />
        <Route
          path="/menu"
          element={
            <>
              <Whatsapp />
              <Menu />
            </>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <>
              <Menu />

              <Detail />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Utiliza ProtectedAdminRoute para proteger la ruta de Admin */}
        <Route
          path="/adminpart"
          element={<ProtectedAdminRoute element={<Admin />} />}
        />
        <Route
          path="/adminpart/inicio"
          element={<ProtectedAdminRoute element={<Inicio />} />}
        />
        <Route
          path="/adminpart/pedidos"
          element={<ProtectedAdminRoute element={<Pedidos />} />}
        />
        <Route
          path="/adminpart/productos"
          element={<ProtectedAdminRoute element={<Productos />} />}
        />

        <Route
          path="/productos/editar/:productid"
          element={
            <ProtectedAdminRoute
              element={
                <>
                  <Productos />
                  <ProductEdit />
                </>
              }
            />
          }
        />

        <Route
          path="/adminpart/users"
          element={<ProtectedAdminRoute element={<Users />} />}
        />
        {/* Utiliza ProtectedRoute para proteger las rutas de Account y Payment */}
        <Route
          path="/account"
          element={<ProtectedRoute element={<Account />} />}
        />
        <Route
          path="/payment"
          element={<ProtectedRoute element={<Payment />} />}
        />
        {/* Ruta predeterminada en caso de acceso no autorizado */}
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </div>
  );
};

export default App;
