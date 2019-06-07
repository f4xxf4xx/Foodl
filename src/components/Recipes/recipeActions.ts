import { createAction } from "redux-starter-kit";

export const fetchRecipeStart = createAction("FETCH_RECIPE_START");
export const fetchRecipeStop = createAction("FETCH_RECIPE_STOP");
export const updateRecipeStart = createAction("UPDATE_RECIPE_START");
export const updateRecipeStop = createAction("UPDATE_RECIPE_STOP");
export const fetchIngredientItemsStart = createAction("FETCH_INGREDIENTITEMS_START");
export const fetchIngredientItemsStop = createAction("FETCH_INGREDIENTITEMS_STOP");
export const updateIngredientItemsStart = createAction("UPDATE_INGREDIENTITEMS_START");
export const updateIngredientItemsStop = createAction("UPDATE_INGREDIENTITEMS_STOP");
export const updateRecipe = createAction("UPDATE_RECIPE");
export const updateIngredientItems = createAction("UPDATE_INGREDIENTITEMS");
export const addIngredientItem = createAction("ADD_INGREDIENTITEM");
export const deleteIngredientItem = createAction("DELETE_INGREDIENTITEM");