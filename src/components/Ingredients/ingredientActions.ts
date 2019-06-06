import { createAction } from "redux-starter-kit";

export const fetchIngredientsStart = createAction("FETCH_INGREDIENTS_START");
export const fetchIngredientsStop = createAction("FETCH_INGREDIENTS_STOP");
export const updateIngredientsStart = createAction("UPDATE_INGREDIENTS_START");
export const updateIngredientsStop = createAction("UPDATE_INGREDIENTS_STOP");

export const updateIngredients = createAction("UPDATE_INGREDIENTS");
export const addIngredient = createAction("ADD_INGREDIENT");
export const deleteIngredient = createAction("DELETE_INGREDIENT");