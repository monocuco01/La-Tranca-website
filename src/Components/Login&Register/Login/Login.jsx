import React, { useState, useEffect } from "react";
import nericafe from "../../../img/nericitacortada.jpg";
import "./login.css";
import LoginNavBar from "../../Login&Register/NavBar/LoginNavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, loginUser } from "../../redux/userSlice";
import bcrypt from "bcryptjs";
import { login } from "../../redux/loginSlice"; // Importa la acción de login

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const users = useSelector((state) => state.user.users); // Utilizá useSelector para obtener el estado de Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Lógica para obtener la lista de usuarios
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://la-tranca-backend.onrender.com/users"
        );
        dispatch(setUsers(response.data.data)); // Despachá la acción para almacenar la lista de usuarios
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error.message);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userFound = users.find((user) => {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      const userEmailLowerCase = user.email.toLowerCase();
      const inputEmailLowerCase = email.toLowerCase();
      return userEmailLowerCase === inputEmailLowerCase && isPasswordCorrect;
    });

    if (userFound) {
      dispatch(login()); // Despacha la acción de login para actualizar el estado de autenticación
      dispatch(loginUser(userFound));
      Swal.fire({
        title: "¡Bienvenido de nuevo!",
        text: "Disfruta del mejor café.",
        icon: "success",
        customClass: {
          popup: "custom-swal",
          title: "custom-swal",
          htmlContainer: "custom-swal",
          confirmButton: "custom-swal",
        },
      }).then((result) => {
        // Verifica si el usuario hizo clic en el botón de confirmación
        if (result.isConfirmed) {
          window.location.href = "/menu";
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo no está correcto. Por favor, verifica tus datos e intenta nuevamente.",
        customClass: {
          popup: "custom-swal",
          title: "custom-swal",
        },
      });
    }
  };

  return (
    <>
      <LoginNavBar />
      <div className="containerLoginALL">
        <div className="containerimgLogin">
          <img src={nericafe} alt="aja" />
        </div>
        <div className="loginpart">
          <div className="registraoingresa">
            <h2>Regístrate o ingresa para continuar</h2>
            <div className="containerformlogin">
              <form onSubmit={handleLogin}>
                <label className="correo" htmlFor="username">
                  Correo{" "}
                </label>
                <input
                  type="text"
                  id="username"
                  className="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label className="contra" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="botoneslogin">
                  <button className="ingresa" type="submit">
                    Ingresar
                  </button>
                  <br />
                </div>
              </form>
            </div>
          </div>
          <div className="containerLINKRegister">
            <p>No tienes cuenta? </p>
            <Link to="/register">
              <p className="ojito">Regístrate ya</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
