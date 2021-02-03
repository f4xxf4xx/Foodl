import { createAction } from "@reduxjs/toolkit";
import { Recipe } from "modules/recipes/models";
import { Filters } from "modules/recipes/store/recipes-reducer";
import { toast } from "react-toastify";
import { History } from "history";
import { firestore } from "firebase-config";
import slugify from "react-slugify";

export const setRecipesLoading = createAction<boolean>("SET_RECIPES_LOADING");
export const setRecipesUpdating = createAction<boolean>("SET_RECIPES_UPDATING");
export const updateFilters = createAction<Filters>("UPDATE_FILTERS");
export const updateNewRecipeId = createAction<Recipe>("UPDATE_NEW_RECIPE_ID");

export const fetchRecipesAsync = (
  uid: string,
  filters: Filters,
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
) => async (dispatch) => {
  dispatch(setRecipesLoading(true));

  let recipesRef = firestore.collection("recipes").where("uid", "==", uid);

  if (filters) {
    if (filters.cuisine) {
      recipesRef = recipesRef.where("cuisine", "==", filters.cuisine);
    }
    if (filters.type) {
      recipesRef = recipesRef.where("type", "==", filters.type);
    }
  }
  const unsubscribe = await recipesRef.onSnapshot(async (snap) => {
    if (snap.docs.length === 0) {
      return null;
    }
    const mappedRecipes: Recipe[] = snap.docs.map((doc) => {
      const recipeData = doc.data() as Recipe;
      const recipe: Recipe = {
        id: doc.id,
        ...recipeData,
      };
      return recipe;
    });
    setRecipes(mappedRecipes);
  });

  dispatch(setRecipesLoading(false));

  return () => unsubscribe();
};

export const deleteRecipeAsync = (recipeId: string) => async (dispatch) => {
  dispatch(setRecipesUpdating(true));
  try {
    await firestore.collection("recipes").doc(recipeId).delete();
    toast.success("Deleted recipe!");
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setRecipesUpdating(false));
  }
};

export const addRecipeAsync = (
  name: string,
  uid: string,
  history: History
) => async (dispatch) => {
  dispatch(setRecipesUpdating(true));
  try {
    const slug = slugify(name);
    const newRecipe: Recipe = {
      uid,
      name,
      slug,
    };

    await firestore.collection("recipes").add(newRecipe);
    toast.success("Added!");
    history.push(`/recipe/${slug}`);
  } catch (error) {
    toast.error(error);
  } finally {
    dispatch(setRecipesUpdating(false));
  }
};
