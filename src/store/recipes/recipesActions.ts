import { createAction } from "@reduxjs/toolkit";
import { Recipe } from "modules/Recipes/models";
import { Filters } from "store/recipes/recipesReducer";
import { toast } from "react-toastify";
import { RecipeDbHelper } from "repositories/RecipeDbHelper";
import { History } from "history";

export const setRecipesLoading = createAction<boolean>("SET_RECIPES_LOADING");
export const setRecipesUpdating = createAction<boolean>("SET_RECIPES_UPDATING");
export const updateRecipes = createAction<Recipe[]>("UPDATE_RECIPES");
export const addRecipe = createAction<Recipe>("ADD_RECIPE");
export const deleteRecipe = createAction<string>("DELETE_RECIPE");
export const updateFilters = createAction<Filters>("UPDATE_FILTERS");
export const updateNewRecipe = createAction<Recipe>("UPDATE_NEW_RECIPE");

export const fetchRecipesAsync = (uid: string, filters: Filters) => async (
  dispatch
) => {
  dispatch(setRecipesLoading(true));
  try {
    const recipes = await RecipeDbHelper.getRecipes(uid, filters);
    dispatch(updateRecipes(recipes));
  } catch (error) {
    toast.error(error);
  } finally {
    dispatch(setRecipesLoading(false));
  }
};

export const deleteRecipeAsync = (recipeId: string) => async (dispatch) => {
  dispatch(setRecipesUpdating(true));
  try {
    await RecipeDbHelper.deleteRecipe(recipeId);
    dispatch(deleteRecipe(recipeId));
    toast.success("Deleted recipe!");
  } catch (error) {
    toast.error(error);
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
    const recipe = await RecipeDbHelper.addRecipe(name, uid);
    dispatch(addRecipe(recipe));
    toast.success("Added!");
    history.push(`/recipe/${recipe.slug}`);
  } catch (error) {
    toast.error(error);
  } finally {
    dispatch(setRecipesUpdating(false));
  }
};
