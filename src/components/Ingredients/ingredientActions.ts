import { createAction } from "redux-starter-kit";

export const beginFetch = createAction("BEGIN_FETCH");
export const stopFetch = createAction("STOP_FETCH");
export const fetchIngredientsSuccess = createAction("FETCH_INGREDIENTS_SUCCESS");
export const fetchIngredientsFailure = createAction("FETCH_INGREDIENTS_FAILURE");
export const deleteIngredientSuccess = createAction("DELETE_INGREDIENT_SUCCESS");