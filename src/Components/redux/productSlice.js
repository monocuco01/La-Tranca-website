// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Definir la función createAsyncThunk
export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  try {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Debes propagar el error para que se maneje en el estado asyncThunk
  }
});

const productSlice = createSlice({
    name: "products",
    initialState: { products: [] },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
    },
  });
  

export default productSlice.reducer;
