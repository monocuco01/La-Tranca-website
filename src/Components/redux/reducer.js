import GET_ALL_PRODUCTS from "./action-Types";

const initialState = {
  products: [],
  users: [],
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

  
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
