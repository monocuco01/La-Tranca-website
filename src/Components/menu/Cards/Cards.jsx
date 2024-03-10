import React, { useEffect } from "react";
import Card from "../Card/Card";
import "./cards.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/productSlice";
import Lottie from "lottie-react";
import Animacion from "./Animacion.json"; // Ajusta la ruta a tu archivo JSON

const Cards = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(getAllProducts());
    console.log("Dispatching getAllProducts...");
  }, [dispatch]);

  // Verificar si products.data está definido y es un array
  if (!products || !products.data || !Array.isArray(products.data)) {
    // Mostrar animación de carga
    return (
      <div className="cargando">
        <Lottie
          animationData={Animacion}
          style={{ width: "300px", height: "300px" }}
        />
        <p>Cargando Carta</p>
        <p>Un momento... </p>
      </div>
    );
  }
  // Organizar productos por categoría
  const organizedCategories = products.data.reduce((result, product) => {
    const categoryName = product.Category?.nameCategory || "Uncategorized";

    if (!result[categoryName]) {
      result[categoryName] = {
        name: categoryName,
        products: [],
      };
    }

    result[categoryName].products.push(product);

    return result;
  }, {});

  // Convertir el objeto en un array de categorías
  const categoriesArray = Object.values(organizedCategories);

  return (
    <div>
      {categoriesArray.map((category) => (
        <div key={category.name} className="containerCards">
          <div className="containerCategory">
            <h2>{category.name}</h2>
          </div>

          {category.products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Cards;
