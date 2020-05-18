import { createAction } from "@reduxjs/toolkit";
import { CartDbHelper } from "../../repositories/CartDbHelper";
import { toast } from "react-toastify";
import { db } from "../../config";

export const setCartLoading = createAction<boolean>("SET_CART_LOADING");
export const setCartUpdating = createAction<boolean>("SET_CART_UPDATING");
export const updateCartItems = createAction<string[]>("UPDATE_CART_ITEMS");
export const addCartItem = createAction<string>("ADD_CART_ITEM");
export const deleteCartItem = createAction<string, string>("DELETE_CART_ITEM");
export const deleteAllCartItems = createAction<string>("DELETE_CART_ITEMS");

export const fetchCartAsync = (uid: string) => {
  return async (dispatch) => {
    dispatch(setCartLoading(true));
    try {
      const items = await CartDbHelper.getCartItems(uid);
      dispatch(updateCartItems(items));
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setCartLoading(false));
    }
  };
};

export const deleteAllCartItemsAsync = (uid: string) => {
  return async (dispatch) => {
    dispatch(setCartUpdating(true));
    try {
      await CartDbHelper.deleteAllItems(uid);
      dispatch(deleteAllCartItems());
      toast.success("Deleted all!");
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setCartUpdating(false));
    }
  };
};

export const deleteCartItemAsync = (uid: string, item: string) => {
  return async (dispatch) => {
    dispatch(setCartUpdating(true));
    try {
      await CartDbHelper.deleteItem(uid, item);
      dispatch(deleteCartItem(item));
      toast.success("Deleted!");
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setCartUpdating(false));
    }
  };
};

export const addCartItemAsync = (uid: string, item: string) => {
  return async (dispatch) => {
    dispatch(setCartUpdating(true));
    try {
      const success = await CartDbHelper.addItem(uid, item);
      if (success) {
        dispatch(addCartItem(item));
        toast.success("Added!");
      } else {
        toast.warn("Item already exists!");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setCartUpdating(false));
    }
  };
};

//Unused, but working way to do realtime fetches
export const fetchCartRealTimeAsync = (uid: string) => {
  return async (dispatch) => {
    dispatch(setCartLoading(true));
    try {
      return await db
        .collection("carts")
        .doc(uid)
        .onSnapshot((snapshot) => {
          const items = snapshot.data().items.map((ingredient) => ingredient);
          dispatch(updateCartItems(items));
        });
    } catch (error) {
      toast.error(error);
    } finally {
      dispatch(setCartLoading(false));
    }
  };
};
