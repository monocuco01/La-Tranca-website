// Card.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card = ({ product }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      onClick={handleClick}
      className="PrincipalContainerCard"
    >
      <div className="containerTextPricemore">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <h5>$ {product.price}</h5>
      </div>
      <div className="containerimg">
        <img src={product.photoUrl} alt={product.name} />
      </div>
    </Link>
  );
};

export default Card;
