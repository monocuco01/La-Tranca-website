  import GET_ALL_PRODUCTS from "./action-Types";

  const inicialState = {
    products: [],
    users: [],
  };

  const reducer = (state = inicialState, action) => {
    switch (action.type) {
      case GET_ALL_PRODUCTS:
        return {
          ...state,
          products: action.payload,
        };

      default:
        return { ...state };
    }
  };

  export default reducer;
