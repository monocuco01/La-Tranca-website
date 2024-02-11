import React, { useState, useEffect } from "react";
import nericafe from "../../../img/nericitacortada.jpg";
import "./login.css";
import LoginNavBar from "../../Login&Register/NavBar/LoginNavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, loginUser } from "../../redux/userSlice";
import bcrypt from "bcrypt";

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
        const response = await axios.get("http://localhost:3001/users");
        dispatch(setUsers(response.data.data)); // Despachá la acción para almacenar la lista de usuarios
      } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error.message);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Lógica para verificar si los datos coinciden con algún usuario en la base de datos
    const userFound = users.find((user) => {
      console.log("Comparando contraseñas para el usuario:", user.email);
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      console.log("Contraseñas coinciden:", isPasswordCorrect);

      return user.email === email && isPasswordCorrect;
    });

    if (userFound) {
      // Despacha la acción para almacenar el usuario logueado
      dispatch(loginUser(userFound));
      navigate("/adminpart"); // Reemplaza con la ruta deseada
    } else {
      console.error("Credenciales incorrectas");
      // Maneja el error según tus necesidades
    }
    console.log("Datos que se enviarán en el login:", {
      email,
      password,
      userFound,
    });
  };

  return (
    <>
      <LoginNavBar />
      <div className="containerLoginALL">
        <div className="containerimgLogin">
          <img src={nericafe} alt="aja" />
        </div>
        <div className="loginpart">
          <div>
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
                  <button className="google">Ingresar con Google</button>
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
