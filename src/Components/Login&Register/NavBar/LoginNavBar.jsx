import React from "react";
import imagencita from "../../../img/la tranca amarillo2.png";
import "./navbarL.css";
import { Link } from "react-router-dom";
const LoginNavBar = () => {
  return (
    <div className="containerNavBarlogin">
      <div className="containerVolver">
        <Link to="/">
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-bar-left"
              viewBox="0 0 16 16"
            >
              <path d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5" />
            </svg>
            volver{" "}
          </p>
        </Link>
      </div>
      <div className="containerLogoLogin">
        <img src={imagencita} alt="0i0" />
      </div>
    </div>
  );
};

export default LoginNavBar;