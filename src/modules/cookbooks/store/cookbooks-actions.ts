import { createAction } from "@reduxjs/toolkit";
import { Cookbook } from "modules/cookbooks/models";
import { firestore } from "firebase-config";
import { setRecipesLoading } from "modules/recipes/store/recipes-actions";

export const setCookbooksLoading = createAction<boolean>("SET_COOKBOOKS_LOADING");
export const setCookbooksUpdating = createAction<boolean>("SET_COOKBOOKS_UPDATING");

export const fetchCookbooksAsync = (
  uid: string,
  setCookbooks: React.Dispatch<React.SetStateAction<Cookbook[]>>
) => async (dispatch) => {
  dispatch(setCookbooksLoading(true));

  let cookbooksRef = firestore.collection("cookbooks").where("uid", "==", uid);

  const unsubscribe = await cookbooksRef.onSnapshot(async (snap) => {
    if (snap.docs.length === 0) {
      return null;
    }
    const mappedCookbooks: Cookbook[] = snap.docs.map((doc) => {
      const cookbookData = doc.data() as Cookbook;
      const cookbook: Cookbook = {
        id: doc.id,
        ...cookbookData,
      };
      return cookbook;
    });
    setCookbooks(mappedCookbooks);
  });

  dispatch(setCookbooksLoading(false));

  return () => unsubscribe();
};

export const fetchCookbookAsync = (
  uid: string,
  cookbookId: string,
  setCookbook: React.Dispatch<React.SetStateAction<Cookbook>>
) => async (dispatch) => {
  dispatch(setRecipesLoading(true));

  let cookbookRef = firestore.collection("cookbooks").doc(cookbookId)

  const unsubscribe = await cookbookRef.onSnapshot(async (snap) => {
    const doc = snap.data() as Cookbook
    const cookbook: Cookbook = {
        id: snap.id,
        ...doc,
      };
    setCookbook(cookbook);
  });

  dispatch(setRecipesLoading(false));

  return () => unsubscribe();
};