import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../redux/productSlice";

const Detail = () => {
  const { selectedProduct } = useSelector((state) => state.products);
  const { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(productId))
      .then((action) => {
        console.log("Action from getProductById:", action);
      })
      .catch((error) => {
        console.error("Error from getProductById:", error);
      });
  }, [dispatch, productId]);

  return (
    <div className="container">
      {selectedProduct ? (
        <div className="modalElements">
          <div className="text">
            <h2 className="name">{selectedProduct?.name}</h2>
            <p className="description">{selectedProduct?.description}</p>
            <p className="price">Price: $ {selectedProduct?.price}</p>
          </div>
          <div>
            <img
              src={selectedProduct?.photoUrl}
              alt={selectedProduct?.name}
              className="imgDetail"
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;

