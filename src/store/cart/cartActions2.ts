export const setCartLoading = loading => ({
    type: "SET_CART_LOADING",
    payload: loading
});

export const setCartUpdating = updating => ({
    type: "SET_CART_UPDATING",
    payload: updating
});

export const updateCartItems = cartItems => ({
    type: "UPDATE_CARTITEMS",
    payload: cartItems
});

export const addCartItem = cartItem => ({
    type: "ADD_CARTITEM",
    payload: cartItem
});

export const deleteCartItem = itemName => ({
    type: "DELETE_CARTITEM",
    payload: itemName
});

export const deleteAllCartItems = () => ({
    type: "DELETE_ALL_CARTITEMS"
});

export const updateCurrentSelectedIngredient = currentSelectedIngredient => ({
    type: "UPDATE_CURRENT_SELECTED_INGREDIENT",
    payload: currentSelectedIngredient
});