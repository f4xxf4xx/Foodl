import { createAction } from "redux-starter-kit";

export const fetchRecipesStart = createAction("FETCH_RECIPES_START");
export const fetchRecipesStop = createAction("FETCH_RECIPES_STOP");
export const updateRecipesStart = createAction("UPDATE_RECIPES_START");
export const updateRecipesStop = createAction("UPDATE_RECIPES_STOP");
export const updateRecipes = createAction("UPDATE_RECIPES");
export const addRecipe = createAction("ADD_RECIPE");
export const deleteRecipe = createAction("DELETE_RECIPE");