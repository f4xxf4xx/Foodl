import { createAction } from "redux-starter-kit";

export const fetchCartItemsStart = createAction("FETCH_CARTITEMS_START");
export const fetchCartItemsStop = createAction("FETCH_CARTITEMS_STOP");
export const updateCartItemsStart = createAction("UPDATE_CARTITEMS_START");
export const updateCartItemsStop = createAction("UPDATE_CARTITEMS_STOP");

export const updateCartItems = createAction("UPDATE_CARTITEMS");
export const addCartItem = createAction("ADD_CARTITEM");
export const deleteCartItem = createAction("DELETE_CARTITEM");
export const deleteAllCartItems = createAction("DELETE_ALL_CARTITEMS");