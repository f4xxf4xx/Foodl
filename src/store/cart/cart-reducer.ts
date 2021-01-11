import { createReducer } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: string[];
  loading: boolean;
  updating: boolean;
}

const initialState: CartState = {
  cartItems: [],
  loading: true,
  updating: false,
};

export const cartReducer = createReducer(initialState, {
  SET_CART_LOADING: (state, action) => {
    state.loading = action.payload;
  },
  SET_CART_UPDATING: (state, action) => {
    state.updating = action.payload;
  },
  UPDATE_CART_ITEMS: (state, action) => {
    state.cartItems = action.payload;
  },
  ADD_CART_ITEM: (state, action) => {
    state.cartItems.push(action.payload);
  },
  DELETE_CART_ITEM: (state, action) => {
    state.cartItems = state.cartItems.filter((i) => i !== action.payload);
  },
  DELETE_CART_ITEMS: (state) => {
    state.cartItems = [];
  },
});
