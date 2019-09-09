import { toast } from "react-toastify";
import { db } from "../config";
import { Ingredient } from "../modules/Ingredients/models";
import { CartDbHelper } from "../repositories/CartDbHelper";
import { setCartLoading, updateCartItems, setCartUpdating, deleteAllCartItems, deleteCartItem, addCartItem, updateNewCartItem } from "../store/cart/cartActions";

export const fetchAsync = (uid: string) => {
    return async dispatch => {
        dispatch(setCartLoading(true));
        try {
            const ingredients = await CartDbHelper.getCartItems(uid);
            dispatch(updateCartItems(ingredients));
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
            await CartDbHelper.deleteAllItems(uid);
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
            await CartDbHelper.deleteItem(uid, cartItemName);
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

export const addItemAsync = (uid: string, cartItemName: string) => {
    return async dispatch => {
        dispatch(setCartUpdating(true));
        try {
            const ingredient = await CartDbHelper.addItem(uid, cartItemName);
            if (ingredient) {
                dispatch(addCartItem(ingredient));
                dispatch(updateNewCartItem(null));
                toast.success("Added!");
            }
            else {
                toast.warn("Item already exists!");
            }            
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(setCartUpdating(false));
        }
    }
}

//Unused, but working way to do realtime fetches
export const fetchRealTimeAsync = (uid: string) => {
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