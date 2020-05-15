import { createAction } from "@reduxjs/toolkit";

export const setCartLoading = createAction<boolean>("SET_CART_LOADING");
export const setCartUpdating = createAction<boolean>("SET_CART_UPDATING");
export const updateCartItems = createAction<string[]>("UPDATE_CART_ITEMS");
export const addCartItem = createAction<string>("ADD_CART_ITEM");
export const deleteCartItem = createAction<string, string>("DELETE_CART_ITEM");
export const deleteAllCartItems = createAction<string>("DELETE_CART_ITEMS");
