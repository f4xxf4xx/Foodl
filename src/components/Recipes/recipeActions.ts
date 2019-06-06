import { createAction } from "redux-starter-kit";

export const fetchRecipesStart = createAction("FETCH_RECIPES_START");
export const fetchRecipesStop = createAction("FETCH_RECIPES_STOP");
export const updateRecipesStart = createAction("UPDATE_RECIPES_START");
export const updateRecipesStop = createAction("UPDATE_RECIPES_STOP");

export const fetchRecipeStart = createAction("FETCH_RECIPE_START");
export const fetchRecipeStop = createAction("FETCH_RECIPE_STOP");
export const updateRecipeStart = createAction("UPDATE_RECIPE_START");
export const updateRecipeStop = createAction("UPDATE_RECIPE_STOP");

export const fetchIngredientItemsStart = createAction("FETCH_INGREDIENTITEMS_START");
export const fetchIngredientItemsStop = createAction("FETCH_INGREDIENTITEMS_STOP");
export const updateIngredientItemsStart = createAction("UPDATE_INGREDIENTITEMS_START");
export const updateIngredientItemsStop = createAction("UPDATE_INGREDIENTITEMS_STOP");

export const addRecipe = createAction("ADD_RECIPE");
export const updateRecipes = createAction("UPDATE_RECIPES");
export const deleteRecipe = createAction("DELETE_RECIPE");
export const addIngredientItem = createAction("ADD_INGREDIENTITEM");
export const deleteIngredientItem = createAction("DELETE_INGREDIENTITEM");