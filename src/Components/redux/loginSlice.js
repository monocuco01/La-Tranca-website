import { createSlice } from "@reduxjs/toolkit";

const loadAuthFromStorage = () => {
  const authFromStorage = localStorage.getItem("auth");
  return authFromStorage ? JSON.parse(authFromStorage) : { isAuthenticated: false };
};

const saveAuthToStorage = (auth) => {
  localStorage.setItem("auth", JSON.stringify(auth));
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthFromStorage(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      saveAuthToStorage(state);
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      saveAuthToStorage(state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
