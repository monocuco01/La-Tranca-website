import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../sideBar/SideBar";
import Swal from "sweetalert2";
import "./users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        const fetchedData = response.data.data;

        if (Array.isArray(fetchedData)) {
          setUsers(fetchedData);
        } else {
          console.error("La propiedad 'data' no es un array:", fetchedData);
        }
      } catch (error) {
        console.error("Error al obtener los usuarios:", error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleEditar = (userId) => {
    // Lógica para editar el usuario con el ID userId
    console.log(`Editar usuario con ID ${userId}`);
  };

  const handleEliminar = async (userId) => {
    // Lógica para eliminar el usuario con el ID userId
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      customClass: {
        title: "my-swal-title-class", // Clase de estilo para el título
        text: "my-swal-text-class", // Clase de estilo para el texto
        confirmButton: "my-swal-confirm-button-class", // Clase de estilo para el botón de confirmar
        cancelButton: "my-swal-cancel-button-class", // Clase de estilo para el botón de cancelar
      },
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/users/${userId}`);
        // Actualiza la lista de usuarios después de eliminar
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        Swal.fire("Eliminado", "El usuario ha sido eliminado", "success");
      } catch (error) {
        console.error("Error al eliminar el usuario:", error.message);
        Swal.fire("Error", "No se pudo eliminar el usuario", "error");
      }
    }
  };

  return (
    <div className="containerAllUsers">
      <SideBar />
      <div className="usersContainer">
        <div className="containerUsersTitle">
          <h2>Usuarios</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Número de Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || "No especificado"}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber || "No especificado"}</td>
                <td>
                  <button onClick={() => handleEliminar(user.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
