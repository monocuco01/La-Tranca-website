import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "./Components/menu/Menu";
import Detail from "./Components/menu/detail/Detail";
import Login from "./Components/Login&Register/Login/Login";
import Register from "./Components/Login&Register/Register/Register";
import Admin from "./Components/Admin/Admin";
import Inicio from "./Components/Admin/inicio/Inicio";
import Home from "./Components/Home/Home";
import { selectIsAuthenticated } from "./Components/redux/validateSlice";
import Account from "./Components/account/Account";
import Payment from "./Components/payment/Payment";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
 
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/products/:productId" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Renderización condicional basada en isAuthenticated */}
        {isAuthenticated ? (
          <>
            <Route path="/adminpart" element={<Admin />} />
            <Route path="/adminpart/inicio" element={<Inicio />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/payment" element={<Payment />} />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        {!isAuthenticated && <Navigate to="/login" />}
      </Routes>
    </div>
  );
}

export default App;
