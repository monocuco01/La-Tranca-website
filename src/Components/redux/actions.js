import GET_ALL_PRODUCTS from "./action-Types";

export const GetallProducts = () => {
  return async function (dispatch) {
    try {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();

      dispatch({ type: GET_ALL_PRODUCTS, payload: data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
};

export default GetallProducts;
