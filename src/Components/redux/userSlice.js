import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: null, // Nuevo campo para almacenar el usuario logueado
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },
    // Agrega más reducers según tus necesidades
  },
});

export const { setUsers, addUser, loginUser } = userSlice.actions;
export default userSlice.reducer;
