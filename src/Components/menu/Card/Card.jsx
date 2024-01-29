// Card.jsx
import React from "react";
import "./card.css";

const Card = ({ product }) => {
  return (
    <div key={product.id}>
      <div className="PrincipalContainerCard">
        <div className="containerTextPricemore">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <h5>$ {product.price}</h5>
        </div>
        <div className="containerimg">
          <img src={product.photoUrl} alt={product.name} />
        </div>
      </div>
    </div>
  );
};

export default Card;
