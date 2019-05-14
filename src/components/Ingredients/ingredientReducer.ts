import { createReducer } from "redux-starter-kit";
import { Ingredient } from "./models";

export type IngredientState = {
    ingredients: Ingredient[];
    loading: boolean;
    error: string;
}

const initialState: IngredientState = {
    ingredients: [],
    loading: false,
    error: null
}

export const ingredientReducer = createReducer(initialState, {
    FETCH_INGREDIENTS_BEGIN: (state, action) => {
        state.loading = true;
        state.error = null;
        state.ingredients = []
    },
    FETCH_INGREDIENTS_SUCCESS: (state, action) => {
        state.loading = false;
        state.ingredients = action.payload
    },
    FETCH_INGREDIENTS_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload.error,
        state.ingredients = []
    },
    DELETE_INGREDIENT_SUCCESS: (state, action) => {
        state.loading = false;
        state.ingredients = state.ingredients.filter(i => i.id !== action.payload);
    }
});