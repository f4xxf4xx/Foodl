import { createAction } from "@reduxjs/toolkit";
import { Cookbook } from "modules/cookbooks/models";
import { firestore } from "firebase-config";
import { setRecipesLoading } from "modules/recipes/store/recipes-actions";
import slugify from "react-slugify";
import { toast } from "react-toastify";
import { History } from "history";

export const setCookbooksLoading = createAction<boolean>("SET_COOKBOOKS_LOADING");
export const setCookbooksUpdating = createAction<boolean>("SET_COOKBOOKS_UPDATING");

export const getCookbooksSnapshot = async (ref: firebase.firestore.Query<firebase.firestore.DocumentData>, setCookbooks: React.Dispatch<React.SetStateAction<Cookbook[]>>) => {
  return await ref.onSnapshot(snap => {
    const mappedCookbooks: Cookbook[] = snap.docs.map((doc) => {
      const cookbookData = doc.data() as Cookbook;
      const cookbook: Cookbook = {
        id: doc.id,
        ...cookbookData,
      };
      return cookbook;
    });
    setCookbooks(mappedCookbooks)
  })
}

export const fetchCookbooksAsync = (
  uid: string,
  privacy: string,
  setCookbooks: React.Dispatch<React.SetStateAction<Cookbook[]>>
) => (dispatch) => {
    dispatch(setCookbooksLoading(true));
    let cookbooksRef = firestore.collection("cookbooks").where("uid", "==", uid);
    if (privacy) {
      cookbooksRef = cookbooksRef.where('privacy', "==", privacy);
    }

    const unsubscribe = getCookbooksSnapshot(cookbooksRef, setCookbooks)
    dispatch(setCookbooksLoading(false));
    return unsubscribe
  
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


export const addCookbookAsync = (
  name: string,
  uid: string,
  history: History
) => async (dispatch) => {
  dispatch(setCookbooksUpdating(true));
  try {
    const slug = slugify(name);
    const newCookbook: Cookbook = {
      uid,
      name,
      slug,
      privacy: "private",
      default: false
    };

    const response = await firestore.collection("cookbooks").add(newCookbook);
    toast.success("Added!");
    history.push(`/app/cookbooks/${response.id}`);
  } catch (error) {
    toast.error(error);
  } finally {
    dispatch(setCookbooksUpdating(false));
  }
};
