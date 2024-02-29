import { createSlice } from "@reduxjs/toolkit";

const loadUserFromStorage = () => {
  const userFromStorage = localStorage.getItem("user");
  return userFromStorage
    ? JSON.parse(userFromStorage)
    : { users: [], currentUser: null };
};

const saveUserToStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const clearUserData = (state, action) => {
  state.users = [];
  state.currentUser = null;
  saveUserToStorage(state);
};

const userSlice = createSlice({
  name: "user",
  initialState: loadUserFromStorage(),
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      saveUserToStorage(state);
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
      saveUserToStorage(state);
    },
    loginUser: (state, action) => {
      state.currentUser = action.payload;
      saveUserToStorage(state);
    },
    updateUser: (state, action) => {
      // Actualizar el currentUser con los datos proporcionados en payload
      state.currentUser = { ...state.currentUser, ...action.payload };
      saveUserToStorage(state);
    },
    clearUser: clearUserData,
  },
});

export const { setUsers, addUser, loginUser, updateUser, clearUser } =
  userSlice.actions;
export default userSlice.reducer;
