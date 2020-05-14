import { createAction } from "redux-starter-kit";

export const setIngredientsLoading = createAction("SET_INGREDIENTS_LOADING");
export const setIngredientsUpdating = createAction("SET_INGREDIENTS_UPDATING");
export const updateIngredients = createAction("UPDATE_INGREDIENTS");
export const addIngredient = createAction("ADD_INGREDIENT");
export const deleteIngredient = createAction("DELETE_INGREDIENT");
export const updateNewIngredient = createAction("UPDATE_NEW_INGREDIENT");