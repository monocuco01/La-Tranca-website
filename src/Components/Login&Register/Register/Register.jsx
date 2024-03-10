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
    phoneNumber: "", // Nuevo campo para el número de teléfono
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
      const { password, email, phoneNumber } = formData; // Asegúrate de incluir phoneNumber aquí
      const response = await axios.post(
        "https://la-tranca-backend.onrender.com/users",
        {
          password,
          email,
          phoneNumber, // Incluye phoneNumber en la solicitud POST
        }
      );
      console.log(response);
      Swal.fire({
        title: "¡Usuario registrado correctamente!",
        text: "Inicia sesion para seguir.",
        icon: "success",
        customClass: {
          popup: "custom-swal",
          title: "custom-swal",
          htmlContainer: "custom-swal",
          confirmButton: "custom-swal",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Utiliza la función de navegación para redirigir
          navigate("/login");
        }
      });
    } catch (error) {
      console.error("Error de registro:", error.response.data);
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
                <label className="correos" htmlFor="email">
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
                <label className="contras" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={handleInputChange}
                  required
                />
                <br />
                <label className="contraconfirms" htmlFor="confirmPassword">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  onChange={handleInputChange}
                  required
                />
                <br />
                {/* Nuevo campo para el número de teléfono */}
                <label className="telefono" htmlFor="phoneNumber">
                  Número de Teléfono
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  onChange={handleInputChange}
                  required
                />
                <div className="botoneslogin">
                  <button className="ingresa" type="submit">
                    Registrar
                  </button>
                  <br />
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
