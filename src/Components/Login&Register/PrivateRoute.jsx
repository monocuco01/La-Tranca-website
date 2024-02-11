// PrivateRoute.js
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Lógica para determinar si el usuario está autenticado o no
  const isAuthenticated = true; // Reemplaza esto con tu lógica real

  return isAuthenticated ? (
    <Routes>{children}</Routes>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
