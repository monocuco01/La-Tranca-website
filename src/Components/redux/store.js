import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cardSlice";
import userReducer from "./userSlice"; // Importa el nuevo slice de usuarios
import validateReducer from "./validateSlice";
import authReducer from "./loginSlice"
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    validate: validateReducer,
    auth: authReducer,
  },
});

export default store;
