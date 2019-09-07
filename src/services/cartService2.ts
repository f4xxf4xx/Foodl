import { db } from "../config";
import { Ingredient } from "../modules/Ingredients/models";
import * as cartActions2 from "../store/cart/cartActions2";
import { toast } from "react-toastify";
import { DbHelper } from "./DbHelper";

export const fetchAsync = (uid: string) => {
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
                console.log(ingredients);
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

export const addCartItemAsync = (uid: string, label: string) => {
    return async dispatch => {
        dispatch(cartActions2.setCartUpdating(true));
        try {
            const cartRef = db.collection("carts").doc(uid);
            const cart = await cartRef.get();

            if (cart.exists) {
                const items = cart.data().items;

                const response = await DbHelper.arrayPushUnique(cartRef, items, "items", label);
                if (response) {
                    toast.success("Added!");
                    //dispatch(cartActions2.setCurrentSelectedIngredient(null));
                }
                else {
                    toast.warn("Item already in cart!");
                }
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