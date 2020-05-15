import { createAction } from "@reduxjs/toolkit";
import { Recipe } from "../../modules/Recipes/models";
import { Filters } from "./recipesReducer";

export const setRecipesLoading = createAction<boolean>("SET_RECIPES_LOADING");
export const setRecipesUpdating = createAction<boolean>("SET_RECIPES_UPDATING");
export const updateRecipes = createAction<Recipe[]>("UPDATE_RECIPES");
export const addRecipe = createAction<Recipe>("ADD_RECIPE");
export const deleteRecipe = createAction<string>("DELETE_RECIPE");
export const updateFilters = createAction<Filters>("UPDATE_FILTERS");
export const updateNewRecipe = createAction<Recipe>("UPDATE_NEW_RECIPE");
