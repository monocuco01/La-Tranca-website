import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  // Podes usar el useEffect para cargar los datos del usuario solo cuando cambie currentUser
  useEffect(() => {
    // Aquí podés realizar cualquier lógica adicional para cargar datos del usuario si es necesario
  }, [currentUser]);

  return (
    <div>
      <h2>Account</h2>
      {currentUser ? (
        <div>
          <p>Name: {currentUser.name}</p>
          <p>Email: {currentUser.email}</p>
          <p>phoneNumber: {currentUser.phoneNumber}</p>
          {currentUser.photoURL && (
            <img
              src={currentUser.photoURL}
              alt={`Photo of ${currentUser.name}`}
              style={{ maxWidth: "100px" }}
            />
          )}
        </div>
      ) : (
        <p>No se encontró información del usuario logueado.</p>
      )}
    </div>
  );
};

export default Account;
