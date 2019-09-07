import { toast } from "react-toastify";
import { CartService } from "../../services/CartService";
import { db } from "../../config";
import { Ingredient } from "../../modules/Ingredients/models";

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

export const fetchAsync = (uid: string, ) => {
    return async dispatch => {
        dispatch(setCartLoading(true));
        try {
            return await db.collection("carts").doc(uid).onSnapshot((snapshot) => {
                const items = snapshot.data().items;
                const ingredients: Ingredient[] = items.map((ingredient) => {
                    return {
                        name: ingredient,
                    };
                });
                dispatch(updateCartItems(ingredients));
            });
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(setCartLoading(false));
        }
    }
}

export const deleteAllItemsAsync = (uid: string) => {
    return async dispatch => {
        dispatch(setCartUpdating(true));
        try {
            await CartService.deleteAllItems(uid);
            dispatch(deleteAllCartItems());
            toast.success("Deleted all!");
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(setCartUpdating(false));
        };
    }
}

export const deleteItemAsync = (uid: string, cartItemName: string) => {
    return async dispatch => {
        dispatch(setCartUpdating(true));
        try {
            await CartService.deleteItem(uid, cartItemName);
            dispatch(deleteCartItem(cartItemName));
            toast.success("Deleted!");
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(setCartUpdating(false));
        }
    }
}