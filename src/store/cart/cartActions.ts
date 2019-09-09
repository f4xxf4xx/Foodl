import { createAction } from "redux-starter-kit";

// Long hard-way method of creating the action, without the helper from redux starter kit
// export const updateCartItems = cartItems => ({
//     type: "UPDATE_CARTITEMS",
//     payload: cartItems
// });

export const setCartLoading = createAction("SET_CART_LOADING");
export const setCartUpdating = createAction("SET_CART_UPDATING");
export const updateCartItems = createAction("UPDATE_CARTITEMS");
export const addCartItem = createAction("cartItem");
export const deleteCartItem = createAction("DELETE_CARTITEM");
export const deleteAllCartItems = createAction("DELETE_ALL_CARTITEMS");
export const updateNewCartItem = createAction("UPDATE_NEW_CART_ITEM");