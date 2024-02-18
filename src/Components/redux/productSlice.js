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
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
  },
});

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], selectedProduct: null, productIds: 0 }, // Modificado el valor inicial de productId
  reducers: {
    setProductIds: (state, action) => {
      state.productIds = action.payload;
    },
    // Otros reducers si los necesitas...
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });

    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.selectedProduct = action.payload.data || null;
    });
  },
});
export const { setProductIds } = productSlice.actions;
export default productSlice.reducer;
