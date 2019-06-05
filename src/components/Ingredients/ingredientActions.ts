import { createAction } from "redux-starter-kit";

export const fetchIngredientsBegin = createAction("FETCH_INGREDIENTS_BEGIN");
export const fetchIngredientsSuccess = createAction("FETCH_INGREDIENTS_SUCCESS");
export const fetchIngredientsFailure = createAction("FETCH_INGREDIENTS_FAILURE");
export const addIngredientBegin = createAction("ADD_INGREDIENT_BEGINS");
export const addIngredientSuccess = createAction("ADD_INGREDIENT_SUCCESS");
export const addIngredientFailure = createAction("ADD_INGREDIENT_FAILURE");
export const deleteIngredientBegin = createAction("DELETE_INGREDIENT_BEGIN");
export const deleteIngredientSuccess = createAction("DELETE_INGREDIENT_SUCCESS");
export const deleteIngredientFailure = createAction("DELETE_INGREDIENT_FAILURE");