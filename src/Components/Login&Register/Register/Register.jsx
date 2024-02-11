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

      // Maneja la respuesta del backend según tus necesidades
      console.log("Registro exitoso:", response.data);

      // Después del registro exitoso, puedes redirigir a otra página
      navigate("/ruta-de-exito");
    } catch (error) {
      console.error("Error al registrar:", error.response.data);
      // Maneja el error según tus necesidades
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
          <div>
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
