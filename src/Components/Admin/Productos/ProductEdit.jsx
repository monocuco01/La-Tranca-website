import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./productEdit.css"
const ProductEdit = () => {
  const productIds = useSelector((state) => state.products.productIds);
  const cloudinaryWidget = useRef(null);

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    photoUrl: "",
  });
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const obtenerProductIdDesdeURL = () => {
      const rutaActual = window.location.pathname;
      const partesDeLaRuta = rutaActual
        .split("/")
        .filter((parte) => parte !== "");
      const productId = partesDeLaRuta[partesDeLaRuta.length - 1];
      return productId;
    };

    const cargarDatosDelProducto = async () => {
      try {
        const productIdFromURL = obtenerProductIdDesdeURL();
        setProductId(productIdFromURL);

        const response = await axios.get(
          `https://la-tranca-backend.onrender.com/products/${productIdFromURL}`
        );

        if (response.status === 200) {
          const producto = response.data.data;
          setProductData({
            name: producto.name,
            description: producto.description,
            price: producto.price,
            photoUrl: producto.photoUrl,
          });
        } else {
          console.error("Error al obtener los detalles del producto");
        }
      } catch (error) {
        console.error("Error de red:", error.message);
      }
    };

    cargarDatosDelProducto();
  }, [productIds]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://la-tranca-backend.onrender.com/products/${productId}`,
        productData
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Producto Editado",
          text: "¡Has editado el producto en la base de datos!",
          icon: "success",
        });
      } else {
        console.error("Error al actualizar el producto");
        // Muestra un mensaje de error al usuario
        Swal.fire({
          title: "Error",
          text: "Hubo un error al actualizar el producto. Por favor, inténtalo de nuevo.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error de red:", error.message);
      // Muestra un mensaje de error al usuario
      Swal.fire({
        title: "Error",
        text: "Hubo un error de red. Por favor, verifica tu conexión e inténtalo de nuevo.",
        icon: "error",
      });
    }
  };

  const openWidget = () => {
    // Define Cloudinary widget configuration
    const cloudinaryConfig = {
      cloudName: "dziwyqnqk",
      uploadPreset: "kifrxmwu",
    };

    // Open Cloudinary widget
    cloudinaryWidget.current = window.cloudinary.createUploadWidget(
      cloudinaryConfig,
      (error, result) => {
        if (!error && result && result.event === "success") {
          // Handle the uploaded image URL
          const imageUrl = result.info.secure_url;
          setProductData((prevData) => ({ ...prevData, photoUrl: imageUrl }));
        }
      }
    );

    cloudinaryWidget.current.open();
  };

  const handleExit = () => {
    window.close();
    // O puedes redirigir a otra URL utilizando window.location.href
    // window.location.href = 'http://tu-url-de-destino';
    window.location.href = "http://localhost:5173/adminpart/productos";
  };
  return (
    <div className="averrrr">
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          precio:
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Descripcion:
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <button
          type="button"
          onClick={openWidget}
          className="update-button bg-sky-900"
        >
          seleccionar imagen
        </button>
        <br />
        <button type="submit">enviar</button>
        <button className="salirs" type="button" onClick={handleExit}>
          Salir
        </button>
      </form>
    </div>
  );
};
export default ProductEdit;
