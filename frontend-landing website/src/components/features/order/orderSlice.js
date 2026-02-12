import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveOrderDetails: (state, action) => {
      state.order = action.payload;
    },
    addPlanToOrder: (state, action) => {
      if (state.order) {
        state.order.planId = action.payload.planId;
        state.order.amount = action.payload.amount;
      }
    },
    setOrder: (state, action) => {
      state.order = {
        ...(state.order || {}),
        username: action.payload.username,
      };
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
});

export const {
  saveOrderDetails,
  addPlanToOrder,
  clearOrder,
  setOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
