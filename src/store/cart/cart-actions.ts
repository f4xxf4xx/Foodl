import { createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { db } from "config";
import * as firebase from "firebase/app";

export const setCartLoading = createAction<boolean>("SET_CART_LOADING");
export const setCartUpdating = createAction<boolean>("SET_CART_UPDATING");

export const fetchCartItemsAsync = (
  uid: string,
  setItems: React.Dispatch<React.SetStateAction<any[]>>
) => async (dispatch) => {
  dispatch(setCartLoading(true));

  const unsubscribe = await db
    .collection("carts")
    .doc(uid)
    .onSnapshot((snap) => {
      const cart = snap.data();
      if(cart && cart["items"]) {
        setItems(cart["items"]);

      }
    });

  dispatch(setCartLoading(false));

  return () => unsubscribe();
};

export const deleteAllCartItemsAsync = (uid: string) => async (dispatch) => {
  dispatch(setCartUpdating(true));
  try {
    const cartRef = db.collection("carts").doc(uid);
    await cartRef.set({ items: [] });
    toast.success("Deleted all!");
  } catch (error) {
    toast.error(error);
  } finally {
    dispatch(setCartUpdating(false));
  }
};

export const deleteCartItemAsync = (uid: string, name: string) => async (
  dispatch
) => {
  dispatch(setCartUpdating(true));
  try {
    const cartRef = db.collection("carts").doc(uid);
    const cart = await cartRef.get();

    if (cart.exists) {
      cartRef.update({
        items: firebase.firestore.FieldValue.arrayRemove(name),
      });
    } else {
      toast.warn("No cart!");
    }
    toast.success("Deleted!");
  } catch (error) {
    toast.error(error);
  } finally {
    dispatch(setCartUpdating(false));
  }
};

export const addCartItemAsync = (uid: string, name: string) => async (
  dispatch
) => {
  dispatch(setCartUpdating(true));
  try {
    const cartRef = db.collection("carts").doc(uid);
    const cart = await cartRef.get();

    if (cart.exists) {
      cartRef.update({ items: firebase.firestore.FieldValue.arrayUnion(name) });
    } else {
      cartRef.set({ items: firebase.firestore.FieldValue.arrayUnion(name) });
    }
  } catch (error) {
    console.log(error);
    toast.error("Cannot add the cart item!");
  } finally {
    dispatch(setCartUpdating(false));
  }
};
