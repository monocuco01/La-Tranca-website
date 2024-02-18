import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cardSlice";
import userReducer from "./userSlice"; 
import paymentReducer from "./orderSlice"
import authReducer from "./loginSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
    auth: authReducer,
    payment: paymentReducer, 
  },
});

export default store;
