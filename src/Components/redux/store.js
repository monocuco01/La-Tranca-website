// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice'; // Ajusta la ruta según tu estructura

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
