import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../redux/userSlice";
import UserNavBar from "./NavbarUSER/UserNavBar";
import axios from "axios";
import "./account.css";

const Account = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cloudinaryWidget = useRef(null);

  const [editedUser, setEditedUser] = useState(currentUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://la-tranca-backend.onrender.com/users/order/${currentUser.id}`
        );
        setEditedUser(response.data.data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };

    fetchUserData();
  }, [currentUser.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `https://la-tranca-backend.onrender.com/users/${currentUser.id}`,
        editedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(updateUser(response.data.data));
        console.log("Cambios guardados exitosamente");
        Swal.fire({
          title: "perfil Editado",
          text: "¡Has editado el perfil!",
          icon: "success",
        });
      } else {
        console.error(
          "Error al intentar guardar cambios:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error de red. Por favor, verifica tu conexión e inténtalo de nuevo.",
        icon: "error",
      });
    }
  };

  const openWidget = () => {
    const cloudinaryConfig = {
      cloudName: "dziwyqnqk",
      uploadPreset: "kifrxmwu",
    };

    cloudinaryWidget.current = window.cloudinary.createUploadWidget(
      cloudinaryConfig,
      (error, result) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.secure_url;
          setEditedUser((prevUser) => ({ ...prevUser, photoURL: imageUrl }));
        }
      }
    );

    cloudinaryWidget.current.open();
  };

  return (
    <div className="">
      <UserNavBar />
      <div className="containercartadeaccount">
        {currentUser ? (
          <div className="user-profile">
            <div className="profile-image">
              <img
                src={
                  editedUser.photoURL ||
                  "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt={`Photo of ${editedUser.name}`}
                className="round-image"
              />
              <button onClick={openWidget}>Cambiar Foto</button>
            </div>
            <div className="profile-details">
              <p>
                Name:{" "}
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                Email:{" "}
                <input
                  type="text"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                Phone Number:{" "}
                <input
                  type="text"
                  name="phoneNumber"
                  value={editedUser.phoneNumber}
                  onChange={handleInputChange}
                />
              </p>
              <button onClick={handleSaveChanges}>Guardar cambios</button>
            </div>
          </div>
        ) : (
          <p>No se encontró información del usuario logueado.</p>
        )}
      </div>
    </div>
  );
};

export default Account;
