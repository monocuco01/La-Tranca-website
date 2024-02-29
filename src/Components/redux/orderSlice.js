import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    tokens: null,
    orders: [],
    isPaid: false,
    currentOrderId: null,
    ordercita: [],
    notifications: [],
  },
  reducers: {
    tokenSet: (state, action) => {
      state.token = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications = action.payload;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setPaid: (state, action) => {
      state.isPaid = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    setCurrentOrderId: (state, action) => {
      state.currentOrderId = action.payload;
    },
    setOrdercita: (state, action) => {
      state.ordercita = action.payload;
    },
    addOrderToOrdercita: (state, action) => {
      state.ordercita.push(action.payload);
    },
  },
});

export const {
  setPaid,
  setOrders,
  addOrder,
  setCurrentOrderId,
  setOrdercita,
  addOrderToOrdercita,
  addNotification,
  tokenSet,
} = orderSlice.actions;

export default orderSlice.reducer;
