import { toast } from "react-toastify";
import { db } from "../config";
import { CartDbHelper } from "../repositories/CartDbHelper";
import {
  setCartLoading,
  updateCartItems,
  setCartUpdating,
  deleteAllCartItems,
  deleteCartItem,
  addCartItem,
} from "../store/cart/cartActions";

export const fetchAsync = (uid: string) => {
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

export const deleteAllItemsAsync = (uid: string) => {
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

export const deleteItemAsync = (uid: string, item: string) => {
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

export const addItemAsync = (uid: string, item: string) => {
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
export const fetchRealTimeAsync = (uid: string) => {
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
