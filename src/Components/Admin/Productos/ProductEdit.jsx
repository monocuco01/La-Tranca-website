import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./ProductEdit.css";
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
          `http://localhost:3001/products/${productIdFromURL}`
        );

        if (response.status === 200) {
          const producto = response.data.data;
          console.log(producto);

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
  }, [productIds]); // Agrega productId como dependencia

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3001/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Producto Editado",
          text: "¡haz editado el producto de la base de datos!",
          icon: "success",
        });
      } else {
        // Manejo de errores si es necesario
        console.error("Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error de red:", error.message);
    }
  };
  return (
    <div className="containersaquello">
      <div className="averrrr">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={productData.description}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Photo URL:
            <input
              type="text"
              name="photoUrl"
              value={productData.photoUrl}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default ProductEdit;
