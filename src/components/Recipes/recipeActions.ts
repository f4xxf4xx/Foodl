import { createAction } from "redux-starter-kit";

export const fetchRecipesBegin = createAction("FETCH_RECIPES_BEGIN");
export const fetchRecipesSuccess = createAction("FETCH_RECIPES_SUCCESS");
export const fetchRecipesFailure = createAction("FETCH_RECIPES_FAILURE");

export const addRecipeBegin = createAction("ADD_RECIPE_BEGIN");
export const addRecipeSuccess = createAction("ADD_RECIPE_SUCCESS");
export const addRecipeFailure = createAction("ADD_RECIPE_FAILURE");

export const deleteRecipeBegin = createAction("DELETE_RECIPE_BEGIN");
export const deleteRecipeSuccess = createAction("DELETE_RECIPE_SUCCESS");
export const deleteRecipeFailure = createAction("DELETE_RECIPE_FAILURE");

export const updateRecipeBegin = createAction("UPDATE_RECIPE_BEGIN");
export const updateRecipeSuccess = createAction("UPDATE_RECIPE_SUCCESS");
export const updateRecipeFailure = createAction("UPDATE_RECIPE_FAILURE");

export const fetchRecipeBegin = createAction("FETCH_RECIPE_BEGIN");
export const fetchRecipeSuccess = createAction("FETCH_RECIPE_SUCCESS");
export const fetchRecipeFailure = createAction("FETCH_RECIPE_FAILURE");

export const fetchIngredientItemsBegin = createAction("FETCH_INGREDIENTITEMS_BEGIN");
export const fetchIngredientItemsSuccess = createAction("FETCH_INGREDIENTITEMS_SUCCESS");
export const fetchIngredientItemsFailure = createAction("FETCH_INGREDIENTITEMS_FAILURE");

export const addIngredientItemBegin = createAction("ADD_INGREDIENTITEM_BEGIN");
export const addIngredientItemSuccess = createAction("ADD_INGREDIENTITEM_SUCCESS");
export const addIngredientItemFailure = createAction("ADD_INGREDIENTITEM_FAILURE");

export const deleteIngredientItemBegin = createAction("DELETE_INGREDIENTITEM_BEGIN");
export const deleteIngredientItemSuccess = createAction("DELETE_INGREDIENTITEM_SUCCESS");
export const deleteIngredientItemFailure = createAction("DELETE_INGREDIENTITEM_FAILURE");