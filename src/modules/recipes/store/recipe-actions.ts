import { createAction } from "@reduxjs/toolkit";
import { firestore } from "firebase-config";
import { Recipe } from "modules/recipes/models";
import { toast } from "react-toastify";
import { StorageHelper } from "repositories/StorageHelper";
import * as firebase from "firebase/app";

export const setRecipeLoading = createAction<boolean>("SET_RECIPE_LOADING");
export const setRecipeUpdating = createAction<boolean>("SET_RECIPE_UPDATING");

const updateRecipe = async (
  recipeId: string,
  key: string,
  value: string
): Promise<void> => {
  return await firestore
    .collection("recipes")
    .doc(recipeId)
    .update({
      [key]: value,
    });
};

export const fetchRecipeBySlugAsync = (
  uid: string,
  slug: string,
  setRecipe: React.Dispatch<React.SetStateAction<any>>
) => async (dispatch) => {
  dispatch(setRecipeLoading(true));

  const unsubscribe = await firestore
    .collection("recipes")
    .where("uid", "==", uid)
    .where("slug", "==", slug)
    .onSnapshot(async (snap) => {
      if (snap.docs.length === 0) {
        return null;
      }
      const currentRecipe = snap.docs[0];
      setRecipe({ ...currentRecipe.data(), id: currentRecipe.id });
    });

  dispatch(setRecipeLoading(false));

  return () => unsubscribe();
};

export const updateRecipeAsync = (
  recipe: Recipe,
  key: string,
  value: string
) => async (dispatch) => {
  dispatch(setRecipeUpdating(true));
  try {
    await updateRecipe(recipe.id, key, value);
  } catch (error) {
    console.log(error);
    toast.error(error);
  } finally {
    dispatch(setRecipeUpdating(false));
  }
};

export const addIngredientAsync = (
  recipe: Recipe,
  ingredient: string
) => async (dispatch) => {
  dispatch(setRecipeUpdating(true));
  try {
    const recipeRef = firestore.collection("recipes").doc(recipe.id);
    const currentRecipe = await recipeRef.get();

    if (currentRecipe.exists) {
      await recipeRef.update({
        ingredients: firebase.firestore.FieldValue.arrayUnion(ingredient),
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error);
  } finally {
    dispatch(setRecipeUpdating(false));
  }
};

export const deleteIngredientAsync = (
  recipe: Recipe,
  ingredient: string
) => async (dispatch) => {
  dispatch(setRecipeUpdating(true));
  try {
    const recipeRef = firestore.collection("recipes").doc(recipe.id);
    const currentRecipe = await recipeRef.get();

    if (currentRecipe.exists) {
      await recipeRef.update({
        ingredients: firebase.firestore.FieldValue.arrayRemove(ingredient),
      });
    }
  } catch (error) {
    console.log(error);
    toast.error(error);
  } finally {
    dispatch(setRecipeUpdating(false));
  }
};

export const updateImageAsync = (recipe: Recipe, image: any) => async (
  dispatch
) => {
  dispatch(setRecipeUpdating(true));
  try {
    const filePath = await StorageHelper.addFileAsync(
      `recipes/${image.name}`,
      image
    );
    await updateRecipe(recipe.id, "imageFullPath", filePath);
    toast.success("Updated!");
  } catch (error) {
    console.log(error);
    toast.error(error);
  } finally {
    dispatch(setRecipeUpdating(false));
  }
};
