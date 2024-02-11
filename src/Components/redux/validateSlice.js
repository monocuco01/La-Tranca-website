// validateSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Obtén el estado de autenticación de localStorage si existe
const initialAuthState = localStorage.getItem("isAuthenticated") === "true";

const validateSlice = createSlice({
  name: "validate",
  initialState: {
    isAuthenticated: initialAuthState || false,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;

      // Guarda el estado de autenticación en localStorage
      localStorage.setItem("isAuthenticated", action.payload);
    },
  },
});

export const { setAuthenticated } = validateSlice.actions;
export const selectIsAuthenticated = (state) => state.validate.isAuthenticated;

export default validateSlice.reducer;
