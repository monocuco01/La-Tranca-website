import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  const cartFromStorage = localStorage.getItem("cart");
  return cartFromStorage ? JSON.parse(cartFromStorage) : [];
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromStorage(),

  reducers: {
    clearCart: (state, action) => {
      return [];
    },
   
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingProductIndex = state.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingProductIndex !== -1) {
        state[existingProductIndex].quantity += quantity;
      } else {
        state.push(action.payload);
      }

      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      const updatedCart = state.filter(
        (item) => item.product.id !== productIdToRemove
      );

      // Actualiza el estado con el nuevo array filtrado
      return updatedCart;
    },
    updateQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const productToUpdateIndex = state.findIndex(
        (item) => item.product.id === productId
      );

      if (productToUpdateIndex !== -1) {
        // Asegúrate de que la nueva cantidad sea siempre mayor o igual a 1
        state[productToUpdateIndex].quantity = Math.max(
          1,
          state[productToUpdateIndex].quantity + newQuantity
        );
        saveCartToStorage(state);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,

} = cartSlice.actions;
export default cartSlice.reducer;
