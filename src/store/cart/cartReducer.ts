import { createReducer } from "@reduxjs/toolkit";

export interface CartState {
  isLoading: boolean;
  isUpdating: boolean;
}

const initialState: CartState = {
  isLoading: true,
  isUpdating: false,
};

export const cartReducer = createReducer(initialState, {
  SET_CART_LOADING: (state, action) => {
    state.isLoading = action.payload;
  },
  SET_CART_UPDATING: (state, action) => {
    state.isUpdating = action.payload;
  },
});
