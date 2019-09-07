import { toast } from "react-toastify";
import { db } from "../config";
import { Ingredient } from "../modules/Ingredients/models";
import * as cartActions2 from "../store/cart/cartActions2";
import { CartDbHelper } from "../repositories/CartDbHelper";

export const fetchAsync = (uid: string) => {
    return async dispatch => {
        dispatch(cartActions2.setCartLoading(true));
        try {
            const ingredients = await CartDbHelper.getCartItems(uid);
            dispatch(cartActions2.updateCartItems(ingredients));
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(cartActions2.setCartLoading(false));
        }
    }
}

export const deleteAllItemsAsync = (uid: string) => {
    return async dispatch => {
        dispatch(cartActions2.setCartUpdating(true));
        try {
            await CartDbHelper.deleteAllItems(uid);
            dispatch(cartActions2.deleteAllCartItems());
            toast.success("Deleted all!");
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(cartActions2.setCartUpdating(false));
        };
    }
}

export const deleteItemAsync = (uid: string, cartItemName: string) => {
    return async dispatch => {
        dispatch(cartActions2.setCartUpdating(true));
        try {
            await CartDbHelper.deleteItem(uid, cartItemName);
            dispatch(cartActions2.deleteCartItem(cartItemName));
            toast.success("Deleted!");
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(cartActions2.setCartUpdating(false));
        }
    }
}

export const addItemAsync = (uid: string, cartItemName: string) => {
    return async dispatch => {
        dispatch(cartActions2.setCartUpdating(true));
        try {
            const ingredient = await CartDbHelper.addItem(uid, cartItemName);
            if (ingredient) {
                dispatch(cartActions2.addCartItem(ingredient));
                dispatch(cartActions2.updateCurrentSelectedIngredient(null));
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
            dispatch(cartActions2.setCartUpdating(false));
        }
    }
}

//Unused, but working way to do realtime fetches
export const fetchRealTimeAsync = (uid: string) => {
    return async dispatch => {
        dispatch(cartActions2.setCartLoading(true));
        try {
            return await db.collection("carts").doc(uid).onSnapshot((snapshot) => {
                const items = snapshot.data().items;
                const ingredients: Ingredient[] = items.map((ingredient) => {
                    return {
                        name: ingredient,
                    };
                });
                dispatch(cartActions2.updateCartItems(ingredients));
            });
        }
        catch (error) {
            toast.error(error);
        }
        finally {
            dispatch(cartActions2.setCartLoading(false));
        }
    }
}