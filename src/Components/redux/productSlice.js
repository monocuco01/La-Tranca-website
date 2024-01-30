// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk("products/getAll", async () => {
  try {
    const response = await fetch("http://localhost:3001/products");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
});

export const getProductById = createAsyncThunk(
  "products/getById",
  async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/products/${productId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], selectedProduct: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });

    builder.addCase(getProductById.fulfilled, (state, action) => {
      // Actualiza el estado con el producto seleccionado o reinicia a null si no hay producto
      state.selectedProduct = action.payload.data || null;

      // Agrega un console.log para ver el contenido de selectedProduct
      console.log("Updated selectedProduct:", state.selectedProduct);
    });
  },
});

export default productSlice.reducer;
