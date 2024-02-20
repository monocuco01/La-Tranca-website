import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginNavBar from "../NavBar/LoginNavBar";
import nericafe from "../../../img/nericitacortada.jpg";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Lógica para registrar al usuario
      const { password, email } = formData;
      const response = await axios.post("http://localhost:3001/users", {
        password,
        email,
      });

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
          window.location.href = "/login";
        }
      });
    } catch (error) {
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
    <div>
      <LoginNavBar />
      <div className="containerLoginALL">
        <div className="containerimgLogin">
          <img src={nericafe} alt="aja" />
        </div>
        <div className="loginpart">
          <div className="registraoingresa">
            <h2>Regístrate o ingresa para continuar</h2>
            <div className="containerformlogin arrocitosssss">
              <form onSubmit={handleRegister}>
                <label className="correo" htmlFor="email">
                  Correo
                </label>
                <input
                  type="text"
                  id="email"
                  className="email"
                  onChange={handleInputChange}
                  required
                />
                <br />
                <label className="contra" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={handleInputChange}
                  required
                />
                <br />
                <label className="contraconfirm" htmlFor="confirmPassword">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  onChange={handleInputChange}
                  required
                />
                <div className="botoneslogin">
                  <button className="ingresa" type="submit">
                    Registrar
                  </button>
                  <br />
                  <button className="google">Registrar con Google</button>
                </div>
              </form>
            </div>
          </div>
          <div className="containerLINKRegister-tusabe">
            <Link to="/login">
              <p className="ojitopillin-ajasss">Ingresa ya</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
