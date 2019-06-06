import { createReducer } from "redux-starter-kit";
import { Ingredient } from "./models";

export type IngredientState = {
    ingredients: Ingredient[];
    loading: boolean;
    updating: boolean;
}

const initialState: IngredientState = {
    ingredients: [],
    loading: false,
    updating: false
}

export const ingredientReducer = createReducer(initialState, {
    FETCH_INGREDIENTS_START: (state) => {
        state.loading = true;
    },
    FETCH_INGREDIENTS_STOP: (state) => {
        state.loading = false;
    },
    UPDATE_INGREDIENTS_START: (state) => {
        state.updating = true;
    },
    UPDATE_INGREDIENTS_STOP: (state) => {
        state.updating = false;
    },
    UPDATE_INGREDIENTS: (state, action) => {
        state.ingredients = action.payload;
    },
    ADD_INGREDIENT: (state, action) => {
        state.ingredients.push(action.payload);
    },
    DELETE_INGREDIENT: (state, action) => {
        state.ingredients = state.ingredients.filter(i => i.id !== action.payload);
    }
});