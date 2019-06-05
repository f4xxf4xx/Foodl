import { createReducer } from "redux-starter-kit";
import { Ingredient } from "./models";

export type IngredientState = {
    ingredients: Ingredient[];
    loading: boolean;
    updating: boolean;
    error: string;
}

const initialState: IngredientState = {
    ingredients: [],
    loading: false,
    updating: false,
    error: null
}

export const ingredientReducer = createReducer(initialState, {
    FETCH_INGREDIENTS_BEGIN: (state) => {
        state.loading = true;
        state.error = null;
        state.ingredients = [];
    },
    FETCH_INGREDIENTS_SUCCESS: (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
    },
    FETCH_INGREDIENTS_FAILURE: (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
        state.ingredients = [];
    },
    ADD_INGREDIENT_BEGIN: (state) => {
        state.updating = true;
    },
    ADD_INGREDIENT_SUCCESS: (state, action) => {
        state.updating = false;
        state.ingredients.push(action.payload);
    },
    ADD_INGREDIENT_FAILURE: (state, action) => {
        state.updating = false;
        state.error = action.payload.error;
    },
    DELETE_INGREDIENT_BEGIN: (state) => {
        state.updating = true;
    },
    DELETE_INGREDIENT_SUCCESS: (state, action) => {
        state.updating = false;
        state.ingredients = state.ingredients.filter(i => i.id !== action.payload);
    },
    DELETE_INGREDIENT_FAILURE: (state, action) => {
        state.updating = false;
        state.error = action.payload.error;
    },
});