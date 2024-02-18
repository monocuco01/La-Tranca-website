import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../sideBar/SideBar";
import "./productos.css";
import { Link } from "react-router-dom";
import { setProductIds } from "../../redux/productSlice";
import { useDispatch } from "react-redux";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const dispatch = useDispatch();

  const [productId, setProductId] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProductos(response.data.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error.message);
      }
    };

    fetchProductos();
  }, [productId]);

  const handleEditar = (id) => {
    console.log(`Editar producto con ID: ${id}`);
    dispatch(setProductIds(id));
    setProductId(id);
  };

  const handleEliminar = async (id) => {
    try {
      // Utiliza SweetAlert2 para mostrar una alerta de confirmación
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
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

      if (result.isConfirmed) {
        // Lógica para eliminar el producto con el ID proporcionado
        await axios.delete(`http://localhost:3001/products/${id}`);
        // Actualiza la lista de productos después de eliminar
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto.id !== id)
        );
        // Muestra una alerta de éxito con SweetAlert2
        await Swal.fire({
          title: "¡Eliminado!",
          text: "Tu archivo ha sido eliminado.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error.message);
    }
  };
  return (
    <div className="containerAllProductos">
      <SideBar />
      <div className="productosContainer">
        <div className="containerProductosTitle">
          <h2>Productos</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.name}</td>
                <td>{producto.price}</td>
                <td>{producto.description}</td>
                <td>{producto.Category?.nameCategory || "N/A"}</td>
                <td>
                  <Link to={`/productos/editar/${producto.id}`}>
                    <button onClick={() => handleEditar(producto.id)}>
                      Editar
                    </button>
                  </Link>
                  <button onClick={() => handleEliminar(producto.id)}>
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

export default Productos;
